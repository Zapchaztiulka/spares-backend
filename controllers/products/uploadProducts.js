const xlsx = require('xlsx');
const fs = require('fs');

const {
  product: { Product, validationAddOneProduct },
} = require('../../models');
const { HttpError, patterns } = require('../../helpers');
const {
  fetchCategoriesAndSubcategories,
  ExcelToJSON,
} = require('../../helpers/productHelpers');

module.exports = async (req, res) => {
  const { _id } = req.user;
  const { path } = req.file;

  if (!path) {
    throw HttpError(400, 'Missing file to upload');
  }

  const workbook = xlsx.readFile(path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const products = xlsx.utils.sheet_to_json(sheet);

  const validProducts = [];
  const invalidProducts = [];

  for (const product of products) {
    const {
      name,
      vendorCode,
      price,
      availability,
      quantity,
      photo,
      country,
      factory,
      trademark,
      categories,
      subcategories,
    } = product;

    product.photo = ExcelToJSON.photoConversion(photo, name);
    product.manufacturer = ExcelToJSON.manufacturerConversion(
      country,
      factory,
      trademark,
    );
    delete product.country;
    delete product.factory;
    delete product.trademark;

    product.categories = ExcelToJSON.stringToArray(categories);
    product.subcategories = ExcelToJSON.stringToArray(subcategories);

    if (vendorCode) {
      const existingProduct = await Product.findOne({
        vendorCode,
      });
      if (existingProduct) {
        invalidProducts.push({
          ...product,
          error: {
            message: `Товар з vendorCode "${vendorCode}" вже присутній`,
            key: 'vendorCode',
          },
        });
        continue;
      }
    }

    if (availability !== patterns.availability[0] && quantity > 0) {
      invalidProducts.push({
        ...product,
        error: {
          message: `Якщо availability відмінне від '${patterns.availability[0]}', quantity має бути 0`,
          key: 'availability',
        },
      });
      continue;
    }

    if (
      availability === patterns.availability[0] &&
      (quantity === 0 || quantity === 'undefined')
    ) {
      invalidProducts.push({
        ...product,
        error: {
          message: `Якщо availability встановлене '${patterns.availability[0]}', quantity має бути більше 0`,
          key: 'availability',
        },
      });
      continue;
    }

    const { error } = validationAddOneProduct.validate(product);

    product.creator = _id;
    product.price = { value: price?.toFixed(2) };

    if (error) {
      invalidProducts.push({
        ...product,
        error: {
          message: error.details[0].message,
          key: error.details[0].context.key,
        },
      });
    } else {
      validProducts.push(product);
    }
  }

  await fetchCategoriesAndSubcategories(validProducts, _id);

  const insertedProducts = await Product.insertMany(validProducts);

  fs.unlink(path, err => {
    if (err) {
      console.error('Error deleting file:', err);
    }
  });

  res.json({
    message: `${insertedProducts.length} products inserted into the database`,
    validProductCount: validProducts.length,
    invalidProductCount: invalidProducts.length,
    invalidProducts,
  });
};

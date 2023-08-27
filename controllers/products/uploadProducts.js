const xlsx = require('xlsx');
const fs = require('fs');

const {
  product: { Product },
} = require('../../models');
const { HttpError } = require('../../helpers');
const {
  fetchCategoriesAndSubcategories,
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

  for (const product of products) {
    const { vendorCode } = product;
    if (vendorCode) {
      const existingProduct = await Product.findOne({
        vendorCode,
      });
      if (existingProduct) {
        throw HttpError(
          400,
          `Product with vendorCode "${vendorCode}" already exists`,
        );
      }
    }
  }

  await fetchCategoriesAndSubcategories(products, _id);

  await Product.insertMany(products);

  fs.unlink(path, err => {
    if (err) {
      console.error('Error deleting file:', err);
    }
  });

  res.json({
    message: `${products.length} products inserted into the database`,
  });
};

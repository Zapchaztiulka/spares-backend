const {
  product: { Product },
  category: { Category },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id } = req.user;
  const productsData = req.body;

  // Validate productsData format
  if (!Array.isArray(productsData) || productsData.length === 0) {
    throw HttpError(400, 'Invalid request format');
  }

  const productsToCreate = [];

  for (const productData of productsData) {
    const {
      vendorCode,
      categories,
      subcategories = [],
      ...restFields
    } = productData;

    if (vendorCode) {
      const pureVendorCode = vendorCode.trim();
      const existedProduct = await Product.findOne({
        vendorCode: pureVendorCode,
      });

      if (existedProduct) {
        throw HttpError(
          409,
          `Product with vendor code: ${vendorCode} has already existed`,
        );
      }
    }

    const categoryPromises = categories.map(categoryId =>
      Category.findById(categoryId),
    );
    const subcategoryPromises = subcategories.map(subcategoryId =>
      Category.findOne(
        { 'subcategories._id': subcategoryId },
        { 'subcategories.$': 1 },
      ),
    );

    const [categoryData, subcategoryData] = await Promise.all([
      Promise.all(categoryPromises),
      Promise.all(subcategoryPromises),
    ]);

    const areAllCategoriesExist = categoryData.every(
      category => category !== null,
    );
    const areAllSubcategoriesExist = subcategoryData.every(
      subcategory => subcategory !== null,
    );

    if (!areAllCategoriesExist || !areAllSubcategoriesExist) {
      throw HttpError(
        404,
        'One or more categories or subcategories do not exist',
      );
    }

    productsToCreate.push({
      ...restFields,
      vendorCode,
      categories: categoryData.map(category => ({
        _id: category._id,
        categoryName: category.categoryName,
      })),
      subcategories: subcategoryData.map(category => ({
        _id: category.subcategories[0]._id,
        subcategoryName: category.subcategories[0].subcategoryName,
      })),
      creator: _id,
    });
  }

  const createdProducts = await Product.create(productsToCreate);

  return res.status(201).json(createdProducts);
};

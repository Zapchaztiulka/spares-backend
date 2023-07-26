const {
  product: { Product },
  category: { Category },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id, role } = req.user;
  const { manufactureId, categories, subcategories } = req.body;
  const pureManufactureId = manufactureId.trim();

  if (role !== 'admin') {
    throw HttpError(403, 'Forbidden');
  }

  const existedProduct = await Product.findOne({
    manufactureId: pureManufactureId,
  });
  if (existedProduct) {
    throw HttpError(
      409,
      `Product with manufacture Id: ${manufactureId} has already existed`,
    );
  }

  // Fetch category and subcategory names from their respective models
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

  const newProductData = {
    ...req.body,
    categories: categoryData.map(category => ({
      _id: category._id,
      categoryName: category.categoryName,
    })),
    subcategories: subcategoryData.map(category => ({
      _id: category.subcategories[0]._id,
      subcategoryName: category.subcategories[0].subcategoryName,
    })),
    creator: _id,
  };

  const createdProduct = await Product.create(newProductData);

  return res.status(201).json(createdProduct);
};

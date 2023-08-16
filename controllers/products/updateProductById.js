const {
  product: { Product },
  category: { Category },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Missing body of request or no changes provided');
  }

  const { id } = req.params;
  const { categories = [], subcategories = [] } = req.body;
  const newProductData = req.body;

  if (categories.length > 0) {
    const categoryPromises = categories.map(categoryId =>
      Category.findById(categoryId),
    );

    const categoryData = await Promise.all(categoryPromises);

    const areAllCategoriesExist = categoryData.every(
      category => category !== null,
    );
    if (!areAllCategoriesExist) {
      throw HttpError(
        404,
        'One or more categories do not exist in collection "Category"',
      );
    }

    newProductData.categories = categoryData.map(category => ({
      _id: category._id,
      categoryName: category.categoryName,
    }));
  }

  if (subcategories.length > 0) {
    const subcategoryPromises = subcategories.map(subcategoryId =>
      Category.findOne(
        { 'subcategories._id': subcategoryId },
        { 'subcategories.$': 1 },
      ),
    );

    const subcategoryData = await Promise.all(subcategoryPromises);

    const areAllSubcategoriesExist = subcategoryData.every(
      subcategory => subcategory !== null,
    );
    if (!areAllSubcategoriesExist) {
      throw HttpError(
        404,
        'One or more subcategories do not exist in collection "Category"',
      );
    }

    newProductData.subcategories = subcategoryData.map(category => ({
      _id: category.subcategories[0]._id,
      subcategoryName: category.subcategories[0].subcategoryName,
    }));
  }

  const product = await Product.findByIdAndUpdate(id, newProductData, {
    new: true,
  });

  if (!product) {
    throw HttpError(404, 'Not found');
  }

  return res.status(200).json(product);
};

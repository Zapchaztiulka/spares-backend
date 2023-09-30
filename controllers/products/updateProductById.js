const {
  product: { Product },
  category: { Category },
} = require('../../models');
const { HttpError, checkNotFound } = require('../../helpers');
const {
  checkAccessToAddPhoto,
  checkQuantityInRequest,
} = require('../../helpers/productHelpers');

module.exports = async (req, res) => {
  const { access } = req.user;
  const { id } = req.params;
  const { categories = [], subcategories = [], photo } = req.body;
  const newProductData = req.body;

  // check - if there is not access and there is photo API throw error
  checkAccessToAddPhoto(access.photoAddAccess, photo);

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

  const { price, availability, quantity } = newProductData;

  await checkQuantityInRequest(availability, quantity);

  if (price?.value) {
    newProductData.price.value = price.value.toFixed(2);
  }

  const product = await Product.findByIdAndUpdate(id, newProductData, {
    new: true,
  });

  await checkNotFound(product, id, 'Product');

  return res.status(200).json(product);
};

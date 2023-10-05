const mongoose = require('mongoose');
const {
  category: { Category },
} = require('../../models');

module.exports = async (products, userId) => {
  for (const product of products) {
    const categoryIds = product.categories.map(
      id => new mongoose.Types.ObjectId(id),
    );
    const subcategoryIds = product.subcategories.map(
      id => new mongoose.Types.ObjectId(id),
    );

    const fetchedCategories = await Category.find({
      _id: { $in: categoryIds },
    });
    const fetchedSubcategories = await Category.aggregate([
      { $match: { 'subcategories._id': { $in: subcategoryIds } } },
      { $unwind: '$subcategories' },
      { $match: { 'subcategories._id': { $in: subcategoryIds } } },
    ]);

    product.categories = fetchedCategories.map(category => ({
      _id: category._id,
      categoryName: category.categoryName,
    }));
    product.subcategories = fetchedSubcategories.map(category => ({
      _id: category.subcategories._id,
      subcategoryName: category.subcategories.subcategoryName,
    }));
  }
};

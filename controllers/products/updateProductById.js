const {
  product: { Product },
  category: { Category },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Missing body of request or no changes provided');
  }

  const { role } = req.user;

  if (role !== 'admin') {
    throw HttpError(403, 'Forbidden');
  }

  const { categories, subcategories } = req.body;
  let newProductData;

  if (categories || subcategories) {
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

    newProductData = {
      ...req.body,
      categories: categoryData.map(category => ({
        _id: category._id,
        categoryName: category.categoryName,
      })),
      subcategories: subcategoryData.map(category => ({
        _id: category.subcategories[0]._id,
        subcategoryName: category.subcategories[0].subcategoryName,
      })),
    };
  }

  newProductData = req.body;

  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, newProductData, {
    new: true,
  });

  if (!product) {
    throw HttpError(404, 'Not found');
  }

  return res.status(200).json(product);
};

const {
  category: { Category },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id } = req.user;
  const { categoryName } = req.body;
  const pureCategoryName = categoryName.trim();

  const existedCategory = await Category.findOne({
    categoryName: pureCategoryName,
  });
  if (existedCategory) {
    throw HttpError(409, `Category: ${categoryName} has already existed`);
  }

  const newCategory = await Category.create({
    ...req.body,
    creator: _id,
  });

  return res.status(201).json(newCategory);
};

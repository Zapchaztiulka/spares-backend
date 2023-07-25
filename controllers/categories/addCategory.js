const {
  category: { Category },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id, role } = req.user;
  const { categoryName } = req.body;
  const pureCategoryName = categoryName.trim();

  if (role !== 'admin') {
    throw HttpError(403, 'Forbidden');
  }

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

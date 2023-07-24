const {
  category: { Category },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id, role } = req.user;

  if (role !== 'admin') {
    throw HttpError(403, 'Forbidden');
  }

  const newCategory = await Category.create({
    ...req.body,
    creator: _id,
  });

  const { creator, createdAt } = newCategory;
  return res.status(201).json({
    ...newCategory,
    creator,
    createdAt,
  });
};

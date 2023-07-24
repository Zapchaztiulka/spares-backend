const {
  category: { Category },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;

  if (role !== 'admin') {
    throw HttpError(403, 'Forbidden');
  }

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw HttpError(404, 'category not found');
  }

  return res.status(200).json({ message: `category by ID:${id} was deleted` });
};

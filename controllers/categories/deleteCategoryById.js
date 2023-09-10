const {
  category: { Category },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw HttpError(404, 'Category not found');
  }

  return res.status(204).json({ message: `Category by ID:${id} was deleted` });
};

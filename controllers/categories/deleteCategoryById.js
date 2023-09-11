const {
  category: { Category },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);
  await checkNotFound(category, id, 'Category');

  return res.status(204).json({ message: `Category by ID:${id} was deleted` });
};

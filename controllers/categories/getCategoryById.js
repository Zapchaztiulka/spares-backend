const {
  category: { Category },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  await checkNotFound(category, id, 'Category');

  res.status(200).json(category);
};

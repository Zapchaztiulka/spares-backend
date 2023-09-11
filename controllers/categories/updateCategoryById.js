const {
  category: { Category },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  await checkNotFound(category, id, 'Category');

  return res.status(200).json(category);
};

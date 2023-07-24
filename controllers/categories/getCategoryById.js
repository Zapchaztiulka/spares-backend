const {
  category: { Category },
} = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.query;

  const category = await Category.findById(id);

  res.status(200).json({ category });
};

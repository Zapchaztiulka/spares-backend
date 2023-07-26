const {
  product: { Product },
} = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  res.status(200).json(product);
};

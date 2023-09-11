const {
  product: { Product },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  await checkNotFound(product, id, 'Product');

  res.status(200).json(product);
};

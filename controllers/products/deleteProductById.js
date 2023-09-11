const {
  product: { Product },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  await checkNotFound(product, id, 'Product');

  return res.status(200).json({ message: `Product by ID:${id} was deleted` });
};

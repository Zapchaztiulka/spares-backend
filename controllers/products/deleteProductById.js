const {
  product: { Product },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw HttpError(404, 'Product not found');
  }

  return res.status(200).json({ message: `Product by ID:${id} was deleted` });
};

const {
  product: { Product },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw HttpError(404, `Product with ${id} not found`);
  }

  res.status(200).json(product);
};

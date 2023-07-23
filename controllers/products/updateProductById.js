const {
  product: { Product },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  if (!req.body) {
    throw HttpError(400, 'Missing body of request');
  }

  const { _id, role } = req.user;

  if (role !== 'admin') {
    throw HttpError(403, 'Forbidden');
  }

  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!product) {
    throw HttpError(404, 'Not found');
  }

  const { createdAt, updatedAt } = product;

  return res.status(200).json({
    ...product,
    creator: _id,
    createdAt,
    updatedAt,
  });
};

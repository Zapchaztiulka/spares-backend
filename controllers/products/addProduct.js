const {
  product: { Product },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id, role } = req.user;

  if (role !== 'admin') {
    throw HttpError(403, 'Forbidden');
  }

  const newProduct = await Product.create({
    ...req.body,
    creator: _id,
  });

  const { creator, createdAt } = newProduct;
  return res.status(201).json({
    ...newProduct,
    creator,
    createdAt,
  });
};

const {
  product: { Product },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id, role } = req.user;
  const { manufactureId } = req.body;
  const pureManufactureId = manufactureId.trim();

  if (role !== 'admin') {
    throw HttpError(403, 'Forbidden');
  }

  const existedProduct = await Product.findOne({
    manufactureId: pureManufactureId,
  });
  if (existedProduct) {
    throw HttpError(
      409,
      `Product with manufacture Id: ${manufactureId} has already existed`,
    );
  }

  const newProduct = await Product.create({
    ...req.body,
    creator: _id,
  });

  return res.status(201).json(newProduct);
};

const {
  product: { Product },
} = require('../../models');

module.exports = async (req, res) => {
  const { _id: creator } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const products = await Product.find({ creator }, '-updatedAt', {
    skip,
    limit,
  });

  res.status(200).json({ products });
};

const {
  product: { Product },
} = require('../../models');

module.exports = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const products = await Product.find({}, '-updatedAt', {
    skip,
    limit,
  });

  res.status(200).json({ products });
};

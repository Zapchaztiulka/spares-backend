const {
  product: { Product },
} = require('../../models');

module.exports = async (req, res) => {
  const { page = 1, limit = 10, query = '' } = req.query;
  const skip = (page - 1) * limit;

  const formattedQuery = query.trim().toLowerCase();

  const sort = {
    name: 1,
    'manufacturer.trademark': 1,
    category: 1,
    description: 1,
    'manufacturer.factory': -1,
    'manufacturer.country': -1,
    manufactureId: 1,
  };

  const products = await Product.find({
    $or: [
      { name: formattedQuery },
      { description: formattedQuery },
      { 'manufacturer.trademark': formattedQuery },
      { 'manufacturer.factory': formattedQuery },
      { 'manufacturer.country': formattedQuery },
    ],
  })
    .populate('category')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  res.status(200).json({ products });
};

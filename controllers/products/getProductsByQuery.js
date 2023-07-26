const {
  product: { Product },
} = require('../../models');

module.exports = async (req, res) => {
  const { page = 1, limit = 10, query = '' } = req.query;
  const skip = (page - 1) * limit;

  const formattedQuery = query.trim();

  const aggregationResult = await Product.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: formattedQuery, $options: 'i' } },
          {
            'manufacturer.trademark': {
              $regex: formattedQuery,
              $options: 'i',
            },
          },
          {
            'categories.categoryName': {
              $regex: formattedQuery,
              $options: 'i',
            },
          },
          {
            'subcategories.subcategoryName': {
              $regex: formattedQuery,
              $options: 'i',
            },
          },
          { description: { $regex: formattedQuery, $options: 'i' } },
          {
            'manufacturer.country': { $regex: formattedQuery, $options: 'i' },
          },
          {
            'manufacturer.factory': { $regex: formattedQuery, $options: 'i' },
          },
          { manufactureId: { $regex: formattedQuery, $options: 'i' } },
        ],
      },
    },
    {
      $facet: {
        filteredProducts: [
          { $sort: { name: 1 } },
          { $skip: skip },
          { $limit: parseInt(limit, 10) },
        ],
        totalCount: [{ $count: 'count' }],
      },
    },
    {
      $project: {
        totalCount: { $arrayElemAt: ['$totalCount.count', 0] },
        products: '$filteredProducts',
      },
    },
  ]);

  const { products, totalCount } = aggregationResult[0];

  res.status(200).json({ products, totalCount });
};

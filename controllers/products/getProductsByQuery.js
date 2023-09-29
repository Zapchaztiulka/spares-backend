const {
  product: { Product },
} = require('../../models');
const { patterns } = require('../../helpers');

module.exports = async (req, res) => {
  const { page = 1, limit = 10, query = '' } = req.query;
  const skip = (page - 1) * limit;

  const formattedQuery = query.trim();
  let products = [];

  if (formattedQuery) {
    for (const field of patterns.productSortRules) {
      const filter = {
        [field]: { $regex: formattedQuery, $options: 'i' },
      };

      const existingProducts = await Product.find(filter);
      products.push(...existingProducts);
    }
  } else {
    products = await Product.find({});
  }

  const paginatedProducts = products.slice(skip, skip + limit);

  res
    .status(200)
    .json({ products: paginatedProducts, totalCount: products.length });
};

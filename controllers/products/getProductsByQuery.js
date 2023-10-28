const {
  product: { Product },
} = require('../../models');
const { patterns } = require('../../helpers');

module.exports = async (req, res) => {
  const { page, limit, query = '' } = req.query;
  const skip = (page - 1) * limit;

  const formattedQuery = query.trim();
  const productMap = new Map();

  if (formattedQuery) {
    for (const field of patterns.productSortRules) {
      const filter = {
        [field]: { $regex: formattedQuery, $options: 'i' },
      };

      const existingProducts = await Product.find(filter);
      existingProducts.forEach(product => {
        productMap.set(product._id.toString(), product);
      });
    }
  } else {
    const allProducts = await Product.find({});
    allProducts.forEach(product => {
      productMap.set(product._id.toString(), product);
    });
  }

  let paginatedProducts = [];

  if (skip >= 0) {
    paginatedProducts = Array.from(productMap.values()).slice(
      skip,
      skip + limit,
    );
  } else {
    paginatedProducts = Array.from(productMap.values());
  }

  res
    .status(200)
    .json({ products: paginatedProducts, totalCount: productMap.size });
};

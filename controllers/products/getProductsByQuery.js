const {
  product: { Product },
} = require('../../models');
const { patterns } = require('../../helpers');
const { applyFilters } = require('../../helpers/productHelpers');

module.exports = async (req, res) => {
  const { page, limit, query = '' } = req.query;
  const skip = Math.max((parseInt(page, 10) - 1) * parseInt(limit, 10), 0);

  // find all products according to query params
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

  // find all products according to body request
  const filteredProducts = applyFilters(
    Array.from(productMap.values()),
    req.body,
  );

  // delete duplicates
  const uniqueFilteredProducts = [];
  const seenIds = new Set();

  filteredProducts.forEach(product => {
    if (!seenIds.has(product._id)) {
      uniqueFilteredProducts.push(product);
      seenIds.add(product._id);
    }
  });

  // create response with pagination
  let paginatedProducts = [];

  if (skip >= 0) {
    paginatedProducts = uniqueFilteredProducts.slice(
      skip,
      skip + parseInt(limit, 10),
    );
  } else {
    paginatedProducts = uniqueFilteredProducts;
  }

  res.status(200).json({
    products: paginatedProducts,
    totalCount: uniqueFilteredProducts.length || 0,
  });
};

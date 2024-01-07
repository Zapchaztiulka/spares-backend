const {
  product: { Product },
} = require('../../models');
const { HttpError, patterns } = require('../../helpers');
const { applyFilters } = require('../../helpers/productHelpers');
const { calculateTotalPurchased } = require('../../helpers/orderHelpers');

module.exports = async (req, res) => {
  const {
    page,
    limit,
    query = '',
    mode = '',
    sortType = '',
    sortBy = '',
  } = req.query;
  const skip = Math.max((parseInt(page, 10) - 1) * parseInt(limit, 10), 0);

  // find all products according to query params
  const formattedQuery = query.trim();
  const formattedMode = mode.trim();
  const formattedSortType = sortType.trim();
  const formattedSortBy = sortBy.trim();

  if (formattedMode && !patterns.productSortRules.includes(formattedMode)) {
    throw HttpError(
      400,
      `Invalid mode parameter. Must be one of following: ${patterns.productSortRules}`,
    );
  }

  if (
    (formattedSortType && !formattedSortBy) ||
    (formattedSortBy && !formattedSortType)
  ) {
    throw HttpError(
      400,
      'Bad query: sort parameters. Both parameters must be specified',
    );
  }

  if (formattedSortType && !patterns.sortTypes.includes(formattedSortType)) {
    throw HttpError(
      400,
      `Invalid "sortType" parameter. Must be one of following: ${patterns.sortTypes}`,
    );
  }

  if (formattedSortBy && !patterns.sortBy.includes(formattedSortBy)) {
    throw HttpError(
      400,
      `Invalid "sortBy" parameter. Must be one of following: ${patterns.sortBy}`,
    );
  }

  const productMap = new Map();

  if (formattedQuery) {
    if (!formattedMode) {
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
      const filter = {
        [formattedMode]: { $regex: formattedQuery, $options: 'i' },
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

  // Calculate count of total purchased each product
  for (const product of uniqueFilteredProducts) {
    product.totalPurchased = await calculateTotalPurchased(product._id);
  }

  // Sorting logic based on sortType and sortBy
  if (formattedSortType && formattedSortBy) {
    const sortOrder = formattedSortType === 'smallLarge' ? 1 : -1;

    uniqueFilteredProducts.sort((a, b) => {
      let valueA, valueB;

      switch (formattedSortBy) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'price':
          valueA = a.price.value;
          valueB = b.price.value;
          break;
        case 'purchased':
          valueA = a.totalPurchased;
          valueB = b.totalPurchased;
          break;
        default:
          valueA = 0;
          valueB = 0;
      }

      if (valueA < valueB) {
        return -1 * sortOrder;
      }
      if (valueA > valueB) {
        return 1 * sortOrder;
      }
      return 0;
    });
  }

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

  const responseProducts = paginatedProducts.map(product => ({
    totalPurchased: product.totalPurchased,
    ...product.toObject(),
  }));

  res.status(200).json({
    products: responseProducts,
    totalCount: uniqueFilteredProducts.length || 0,
  });
};

const {
  product: { Product },
} = require('../../models');

module.exports = async (req, res) => {
  const { query = '' } = req.query;
  const formattedQuery = query.trim();

  let products;

  // get all products by query
  if (formattedQuery) {
    products = await Product.find({
      name: { $regex: formattedQuery, $options: 'i' },
    }).exec();
  } else {
    products = await Product.find({}).exec();
  }

  const data = {
    query: formattedQuery,
    countries: [],
    trademarks: [],
  };

  // Fill the arrays of countries and trademarks without duplicates
  const uniqueCountries = new Set();
  const uniqueTrademarks = new Set();

  products.forEach(product => {
    uniqueCountries.add(product.manufacturer.country);
    product.manufacturer.trademark
      .split(',')
      .forEach(tm => uniqueTrademarks.add(tm.trim()));
  });

  data.countries = Array.from(uniqueCountries).sort();
  data.trademarks = Array.from(uniqueTrademarks).sort();

  // Calculate the minimum and maximum price for each country  and product count of each trademark
  data.countries = data.countries.map(country => {
    const countryProducts = products.filter(
      product => product.manufacturer.country === country,
    );
    const prices = countryProducts.map(product => product.price.value);

    const trademarkCounts = Array.from(uniqueTrademarks)
      .map(tm => {
        const trademarkCount = countryProducts.reduce(
          (count, product) =>
            product.manufacturer.trademark.includes(tm) ? count + 1 : count,
          0,
        );
        return { name: tm, count: trademarkCount };
      })
      .filter(trademark => trademark.count > 0);

    return {
      name: country,
      trademarks: trademarkCounts,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      countProducts: countryProducts.length,
    };
  });

  // Calculate the minimum and maximum price for each trademark and count of products in each country
  data.trademarks = data.trademarks.map(trademark => {
    const trademarkProducts = products.filter(product =>
      product.manufacturer.trademark.includes(trademark),
    );
    const prices = trademarkProducts.map(product => product.price.value);

    const countriesCount = Array.from(uniqueCountries)
      .map(country => {
        const countryCount = trademarkProducts.reduce(
          (count, product) =>
            product.manufacturer.country === country ? count + 1 : count,
          0,
        );
        return { name: country, count: countryCount };
      })
      .filter(country => country.count > 0);

    return {
      name: trademark,
      countries: countriesCount,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      countProducts: trademarkProducts.length,
    };
  });

  // Sorting of countries and trademarks
  data.countries.sort((a, b) => {
    const nameA = a.name || '';
    const nameB = b.name || '';

    if (nameA === '' && nameB === '') {
      return 0;
    } else if (nameA === '') {
      return 1;
    } else if (nameB === '') {
      return -1;
    } else {
      return nameA.localeCompare(nameB, 'en');
    }
  });
  data.trademarks.sort((a, b) => a.name.localeCompare(b.name, 'en'));

  res.status(200).json(data);
};

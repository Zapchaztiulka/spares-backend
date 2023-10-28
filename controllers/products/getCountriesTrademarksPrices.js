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

  // Calculate the minimum and maximum price for each country
  data.countries = data.countries.map(country => {
    const countryProducts = products.filter(
      product => product.manufacturer.country === country,
    );
    const prices = countryProducts.map(product => product.price.value);

    return {
      name: country,
      trademarks: Array.from(uniqueTrademarks).filter(tm =>
        countryProducts.some(product =>
          product.manufacturer.trademark.includes(tm),
        ),
      ),
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  });

  // Calculate the minimum and maximum price for each trademarks
  data.trademarks = data.trademarks.map(trademark => {
    const trademarkProducts = products.filter(product =>
      product.manufacturer.trademark.includes(trademark),
    );
    const prices = trademarkProducts.map(product => product.price.value);

    return {
      name: trademark,
      countries: Array.from(uniqueCountries).filter(country =>
        trademarkProducts.some(
          product => product.manufacturer.country === country,
        ),
      ),
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  });

  // Sorting of countries and trademarks
  data.countries.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  data.trademarks.sort((a, b) => a.name.localeCompare(b.name, 'en'));

  res.status(200).json(data);
};

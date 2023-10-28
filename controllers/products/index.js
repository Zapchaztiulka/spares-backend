const { ctrlWrapper } = require('../../helpers');

module.exports = {
  addProducts: ctrlWrapper(require('./addProducts')),
  updateProductById: ctrlWrapper(require('./updateProductById')),
  updatePriceDates: ctrlWrapper(require('./updatePriceDates')),
  deleteProductById: ctrlWrapper(require('./deleteProductById')),
  deleteProducts: ctrlWrapper(require('./deleteProducts')),

  getProductsByQuery: ctrlWrapper(require('./getProductsByQuery')),
  getProductById: ctrlWrapper(require('./getProductById')),
  getUniqueVendorCode: ctrlWrapper(require('./getUniqueVendorCode')),
  getCountriesTrademarksPrices: ctrlWrapper(
    require('./getCountriesTrademarksPrices'),
  ),

  uploadProducts: ctrlWrapper(require('./uploadProducts')),
};

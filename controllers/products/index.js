const { ctrlWrapper } = require('../../helpers');

module.exports = {
  addProduct: ctrlWrapper(require('./addProduct')),
  updateProductById: ctrlWrapper(require('./updateProductById')),
  deleteProductById: ctrlWrapper(require('./deleteProductById')),

  getProductsByQuery: ctrlWrapper(require('./getProductsByQuery')),
  getProductById: ctrlWrapper(require('./getProductById')),

  uploadProducts: ctrlWrapper(require('./uploadProducts')),
};

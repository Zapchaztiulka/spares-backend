const { ctrlWrapper } = require('../../helpers');

module.exports = {
  addProduct: ctrlWrapper(require('./addProduct')),
  updateProductById: ctrlWrapper(require('./updateProductById')),
  deleteProductById: ctrlWrapper(require('./deleteProductById')),

  getProductsByCreator: ctrlWrapper(require('./getProductsByCreator')),
  getProductsByQuery: ctrlWrapper(require('./getProductsByQuery')),
};

const { ctrlWrapper } = require('../../helpers');

module.exports = {
  getAllProducts: ctrlWrapper(require('./getAllProducts')),
  getProductByCreator: ctrlWrapper(require('./getProductByCreator')),
  addProduct: ctrlWrapper(require('./addProduct')),
  updateProductById: ctrlWrapper(require('./updateProductById')),
  deleteProductById: ctrlWrapper(require('./deleteProductById')),
};

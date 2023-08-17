const { ctrlWrapper } = require('../../helpers');

module.exports = {
  createOrderbyUser: ctrlWrapper(require('./createOrderbyUser')),
  deleteOrderbyUser: ctrlWrapper(require('./deleteOrderbyUser')),
  createOrderbyAny: ctrlWrapper(require('./createOrderbyAny')),
  deleteOrderbyAny: ctrlWrapper(require('./deleteOrderbyAny')),
  getAllOrders: ctrlWrapper(require('./getAllOrders')),
  getUserOrders: ctrlWrapper(require('./getUserOrders')),
  getOrderDetails: ctrlWrapper(require('./getOrderDetails')),
  updateOrderProducts: ctrlWrapper(require('./updateOrderProducts')),
};

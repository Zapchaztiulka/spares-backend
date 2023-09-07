const { ctrlWrapper } = require('../../helpers');

module.exports = {
  createOrderbyUser: ctrlWrapper(require('./createOrderbyUser')),
  deleteOrderbyUser: ctrlWrapper(require('./deleteOrderbyUser')),
  createOrderbyAny: ctrlWrapper(require('./createOrderbyAny')),
  deleteOrderbyAny: ctrlWrapper(require('./deleteOrderbyAny')),
  getAllOrders: ctrlWrapper(require('./getAllOrders')),
  getUserOrders: ctrlWrapper(require('./getUserOrders')),
  getOrderDetails: ctrlWrapper(require('./getOrderDetails')),
  updateOrder: ctrlWrapper(require('./updateOrder')),

  assignAdminTagByPhone: ctrlWrapper(require('./assignAdminTagByPhone')),
  assignAdminTagById: ctrlWrapper(require('./assignAdminTagById')),
  getOrdersByAdminTag: ctrlWrapper(require('./getOrdersByAdminTag')),
};

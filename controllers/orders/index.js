const { ctrlWrapper } = require('../../helpers');

module.exports = {
  createOrderbyUser: ctrlWrapper(require('./createOrderbyUser')),
  createOrderbyAny: ctrlWrapper(require('./createOrderbyAny')),
  deleteOrders: ctrlWrapper(require('./deleteOrders')),
  getAllOrders: ctrlWrapper(require('./getAllOrders')),
  getUserOrders: ctrlWrapper(require('./getUserOrders')),
  getOrderDetails: ctrlWrapper(require('./getOrderDetails')),
  updateOrder: ctrlWrapper(require('./updateOrder')),

  assignAdminTagByPhone: ctrlWrapper(require('./assignAdminTagByPhone')),
  assignAdminTagById: ctrlWrapper(require('./assignAdminTagById')),
  getOrdersByAdminTag: ctrlWrapper(require('./getOrdersByAdminTag')),
};

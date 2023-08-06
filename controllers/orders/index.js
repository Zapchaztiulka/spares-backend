const { ctrlWrapper } = require('../../helpers');

module.exports = {
  createOrderbyUser: ctrlWrapper(require('./createOrderbyUser')),
  deleteOrderbyUser: ctrlWrapper(require('./deleteOrderbyUser')),
  createOrderbyAny: ctrlWrapper(require('./createOrderbyAny')),
  deleteOrderbyAny: ctrlWrapper(require('./deleteOrderbyAny')),
};

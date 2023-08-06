const { ctrlWrapper } = require('../../helpers');

module.exports = {
  createOrder: ctrlWrapper(require('./createOrder')),
  deleteOrder: ctrlWrapper(require('./deleteOrder')),
};

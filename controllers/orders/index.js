const { ctrlWrapper } = require('../../helpers');

module.exports = {
  addOrder: ctrlWrapper(require('./addOrder')),
  deleteOrder: ctrlWrapper(require('./deleteOrder')),
};

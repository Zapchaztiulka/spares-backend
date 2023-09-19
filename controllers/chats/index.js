const { ctrlWrapper } = require('../../helpers');

module.exports = {
  createChatRoom: ctrlWrapper(require('./createChatRoom')),
};

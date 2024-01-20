const { ctrlWrapper } = require('../../helpers');

module.exports = {
  getUserMessages: ctrlWrapper(require('./getUserMessages')),
  addUserMessage: ctrlWrapper(require('./addUserMessage')),
  updateUserMessages: ctrlWrapper(require('./updateUserMessages')),
};

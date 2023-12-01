const { ctrlWrapper } = require('../../helpers');

module.exports = {
  authUser: ctrlWrapper(require('./authUser')),
  createChatRoom: ctrlWrapper(require('./createChatRoom')),
  closeChatByUser: ctrlWrapper(require('./closeChatByUser')),
  closeChatByManager: ctrlWrapper(require('./closeChatByManager')),

  getChatRoomsByStatus: ctrlWrapper(require('./getChatRoomsByStatus')),

  uploadChatImage: ctrlWrapper(require('./uploadChatImage')),
};

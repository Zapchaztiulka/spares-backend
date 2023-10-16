const { ctrlWrapper } = require('../../helpers');

module.exports = {
  authUser: ctrlWrapper(require('./authUser')),
  createChatRoom: ctrlWrapper(require('./createChatRoom')),
  addMessageInChatRoom: ctrlWrapper(require('./addMessageInChatRoom')),
  closeChatRoom: ctrlWrapper(require('./closeChatRoom')),

  getChatRoomById: ctrlWrapper(require('./getChatRoomById')),
  getChatRoomsByStatus: ctrlWrapper(require('./getChatRoomsByStatus')),

  uploadChatImage: ctrlWrapper(require('./uploadChatImage')),
};

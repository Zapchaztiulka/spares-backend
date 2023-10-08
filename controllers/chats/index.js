const { ctrlWrapper } = require('../../helpers');

module.exports = {
  createChatRoom: ctrlWrapper(require('./createChatRoom')),
  closeChatRoom: ctrlWrapper(require('./closeChatRoom')),
  authUser: ctrlWrapper(require('./authUser')),

  getChatRoomById: ctrlWrapper(require('./getChatRoomById')),
  getChatRoomsByStatus: ctrlWrapper(require('./getChatRoomsByStatus')),
};

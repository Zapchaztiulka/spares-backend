const {
  chat: { Chat },
} = require('../../models');

module.exports = async (socketIO, userId, roomId, manager) => {
  const { id, username, userSurname } = manager;
  const chat = await Chat.findOne({ userId });

  if (chat) {
    const roomToConnectManager = chat.chatRooms.find(
      room => room._id.toString() === roomId,
    );

    if (roomToConnectManager) {
      roomToConnectManager.managerId = id;
      roomToConnectManager.managerName = username;
      roomToConnectManager.managerSurname = userSurname;
      roomToConnectManager.isChatRoomProcessed = true;
      await chat.save();

      await socketIO.emit('managerJoinToChat', roomToConnectManager);
    }
  }
};

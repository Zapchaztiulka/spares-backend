const {
  chat: { Chat },
} = require('../../models');

module.exports = async (socketIO, managerId) => {
  const chats = await Chat.find();

  const chatRoomsInProgress = [];

  for (const chat of chats) {
    for (const room of chat.chatRooms) {
      if (
        room.managerId === managerId &&
        room.chatRoomStatus === 'in progress'
      ) {
        room.isChatRoomProcessed = false;
        chatRoomsInProgress.push(room);
      }
    }

    await chat.save();
  }

  socketIO.emit('disconnectManager', chatRoomsInProgress);
};

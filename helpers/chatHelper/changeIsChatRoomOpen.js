const {
  chat: { Chat },
} = require('../../models');

module.exports = async (socketIO, userId, roomId, isChatRoomOpen) => {
  const chat = await Chat.findOne({ userId });

  if (chat) {
    const roomInProgress = chat.chatRooms.find(room => {
      return room._id.toString() === roomId;
    });

    if (roomInProgress) {
      roomInProgress.isChatRoomOpen = isChatRoomOpen;
      await chat.save();
      socketIO.emit('chatRoomOpenChanged', {
        userId,
        isChatRoomOpen,
        serverMessage: isChatRoomOpen ? 'Чат відкритий' : 'Клієнт згорнув чат',
      });
    }
  }
};

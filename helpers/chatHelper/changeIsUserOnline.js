const {
  chat: { Chat },
} = require('../../models');
const { patterns } = require('../../helpers');

module.exports = async (socketIO, userId, isOnline, isChatRoomOpen) => {
  const chat = await Chat.findOne({ userId });

  if (chat) {
    chat.isOnline = isOnline;

    const roomInProgress = chat.chatRooms.find(room => {
      return room.chatRoomStatus === patterns.chatRoomStatus[0];
    });

    if (roomInProgress) {
      roomInProgress.isChatRoomOpen = isChatRoomOpen;
      socketIO.emit('chatRoomOpenChanged', {
        userId,
        roomId: roomInProgress,
        isChatRoomOpen,
      });
    }

    await chat.save();

    socketIO.emit('userStatusChanged', {
      userId,
      isOnline,
    });
  }
};

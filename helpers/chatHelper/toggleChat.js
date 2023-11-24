const {
  chat: { Chat },
} = require('../../models');
const { patterns } = require('../../helpers');

module.exports = async (socketIO, userId, isChatRoomOpen) => {
  const chat = await Chat.findOne({ userId });

  if (chat) {
    const roomInProgress = chat.chatRooms.find(room => {
      return room.chatRoomStatus === patterns.chatRoomStatus[0];
    });

    if (roomInProgress) {
      roomInProgress.isChatRoomOpen = isChatRoomOpen;
      await chat.save();
    }

    socketIO.emit('toggleChat', {
      userId,
      isChatRoomOpen,
    });
  }
};

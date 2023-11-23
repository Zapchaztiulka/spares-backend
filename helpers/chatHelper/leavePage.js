const {
  chat: { Chat },
} = require('../../models');
const { patterns } = require('..');

module.exports = async (socketIO, userId, isLeavePage) => {
  const chat = await Chat.findOne({ userId });

  if (chat) {
    const roomInProgress = chat.chatRooms.find(room => {
      return room.chatRoomStatus === patterns.chatRoomStatus[0];
    });

    if (roomInProgress) {
      roomInProgress.isLeavePage = isLeavePage;
      await chat.save();
      socketIO.emit('leavePage', {
        userId,
        isLeavePage,
      });
    }
  }
};

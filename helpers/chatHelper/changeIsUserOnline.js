const {
  chat: { Chat },
} = require('../../models');

module.exports = async (socketIO, userId, isOnline) => {
  const chat = await Chat.findOne({ userId });

  if (chat) {
    chat.isOnline = isOnline;
    await chat.save();

    socketIO.emit('userStatusChanged', {
      userId,
      isOnline,
    });
  }
};

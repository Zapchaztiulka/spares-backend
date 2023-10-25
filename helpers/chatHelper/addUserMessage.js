const {
  chat: { Chat },
} = require('../../models');

module.exports = async (socketIO, userId, roomId, message) => {
  const chat = await Chat.findOne({ userId });

  if (chat) {
    const roomToAddMessage = chat.chatRooms.find(
      room => room._id.toString() === roomId,
    );

    if (roomToAddMessage) {
      roomToAddMessage.messages.push(message);
      await chat.save();

      const updatedMessage =
        roomToAddMessage.messages[roomToAddMessage.messages.length - 1];

      socketIO.emit('userMessage', {
        userId,
        roomId,
        message: updatedMessage,
      });
    }
  }
};

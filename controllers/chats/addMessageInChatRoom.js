const {
  chat: { Chat },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id: roomId } = req.params;
  const { userId, message } = req.body;

  // const socketIO = req.app.get('socketIO');

  const chat = await Chat.findOne({ userId });

  if (!chat) {
    await checkNotFound(chat, userId, 'User');
  }

  const roomToUpdate = chat.chatRooms.find(
    room => room._id.toString() === roomId,
  );

  if (!roomToUpdate) {
    await checkNotFound(roomToUpdate, roomId, 'Chat room');
  }

  roomToUpdate.messages.push(message);
  await chat.save();

  const updatedMessage =
    roomToUpdate.messages[roomToUpdate.messages.length - 1];

  return res.status(200).json({ roomId, message: updatedMessage });
};

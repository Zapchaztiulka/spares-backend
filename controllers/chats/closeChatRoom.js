const {
  chat: { Chat },
} = require('../../models');
const { checkNotFound, patterns } = require('../../helpers');

module.exports = async (req, res) => {
  const { id: roomId } = req.params;
  const { userId } = req.body;

  const chat = await Chat.findOne({ userId });

  if (!chat) {
    await checkNotFound(chat, userId, 'User');
  }

  const roomToComplete = chat.chatRooms.find(
    room => room._id.toString() === roomId,
  );

  if (!roomToComplete) {
    await checkNotFound(roomToComplete, roomId, 'Chat room');
  }

  roomToComplete.chatRoomStatus = patterns.chatRoomStatus[1];

  await chat.save();
  return res
    .status(200)
    .json({ message: `Chat room with ID:${roomId} was completed` });
};

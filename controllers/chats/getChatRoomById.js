const {
  chat: { Chat },
} = require('../../models');
const { HttpError, checkNotFound, patterns } = require('../../helpers');

module.exports = async (req, res) => {
  const { id: roomId } = req.params;
  const { userId } = req.body;

  const chat = await Chat.findOne({ userId });

  if (!chat) {
    await checkNotFound(chat, userId, 'User');
  }

  const foundChatRoom = chat.chatRooms.find(
    room => room._id.toString() === roomId,
  );

  if (!foundChatRoom) {
    await checkNotFound(foundChatRoom, roomId, 'Chat room');
  }

  if (foundChatRoom.chatRoomStatus === patterns.chatRoomStatus[1]) {
    throw HttpError(400, `Chat room with ID:  ${roomId} is already completed`);
  }

  res.status(200).json(foundChatRoom);
};

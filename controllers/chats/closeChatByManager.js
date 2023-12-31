const {
  chat: { Chat },
} = require('../../models');
const { checkNotFound, patterns } = require('../../helpers');

module.exports = async (req, res) => {
  const { id: roomId } = req.params;
  const { userId } = req.body;

  const socketIO = req.app.get('socketIO');

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
  roomToComplete.isChatRoomProcessed = false;
  roomToComplete.isChatRoomOpen = false;
  chat.isOnline = false;

  socketIO.emit('closeChatByManager', { room: roomToComplete });

  socketIO.emit('countUnreadManagerMessages', {
    userId,
    countUnreadManagerMessages: null,
  });

  await chat.save();

  return res.status(200).json({
    roomId,
    message: `Chat room with ID:${roomId} was completed`,
  });
};

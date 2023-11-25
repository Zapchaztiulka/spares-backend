const { changeIsUserOnline } = require('../../helpers/chatHelper');

const {
  chat: { Chat },
} = require('../../models');
const { checkNotFound, patterns } = require('../../helpers');

module.exports = async (req, res) => {
  const { id: roomId } = req.params;
  const { userId, username, userSurname } = req.body;

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
  roomToComplete.isChatRoomOpen = false;
  roomToComplete.isChatRoomProcessed = false;
  chat.isOnline = false;

  await changeIsUserOnline(socketIO, userId, false);

  socketIO.emit('closeChatByUser', {
    room: roomToComplete,
    username,
    userSurname,
  });

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

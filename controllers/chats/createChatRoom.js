const {
  chat: { Chat },
} = require('../../models');
const { patterns, checkNotFound } = require('../../helpers');
const { checkExistingRoom } = require('../../helpers/chatHelper');

module.exports = async (req, res) => {
  const { userId } = req.body;

  const socketIO = req.app.get('socketIO');

  const chat = await Chat.findOne({ userId });

  if (!chat) {
    await checkNotFound(chat, userId, 'User');
  }

  const existingRoom = await checkExistingRoom(
    chat.chatRooms,
    patterns.chatRoomStatus[0],
  );

  if (!existingRoom) {
    chat.chatRooms.push({ userId, isChatRoomOpen: true });
  }

  chat.isOnline = true;
  await chat.save();

  const updatedChat = await Chat.findOne({ userId });

  const newRoom = await checkExistingRoom(
    updatedChat.chatRooms,
    patterns.chatRoomStatus[0],
  );

  socketIO.emit('createChatByUser', {
    room: newRoom,
    isOnline: true,
    isChatRoomOpen: true,
    username: chat.username,
    userSurname: chat.userSurname,
  });

  return res.status(existingRoom ? 200 : 201).json(newRoom);
};

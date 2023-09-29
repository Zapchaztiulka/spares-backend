const {
  chat: { Chat },
} = require('../../models');
const { patterns, checkNotFound } = require('../../helpers');
const { checkExistingRoom } = require('../../helpers/chatHelper');

module.exports = async (req, res) => {
  const { userId } = req.body;

  const chat = await Chat.findOne({ userId });

  if (!chat) {
    await checkNotFound(chat, userId, 'User');
  }

  const existingRoom = await checkExistingRoom(
    chat.chatRooms,
    patterns.chatRoomStatus[0],
  );

  if (!existingRoom) {
    chat.chatRooms.push({ userId });
    await chat.save();
  }

  const updatedChat = await Chat.findOne({ userId });

  const newRoom = await checkExistingRoom(
    updatedChat.chatRooms,
    patterns.chatRoomStatus[0],
  );

  return res.status(existingRoom ? 200 : 201).json(newRoom);
};

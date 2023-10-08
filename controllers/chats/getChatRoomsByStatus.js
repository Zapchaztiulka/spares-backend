const {
  chat: { Chat },
} = require('../../models');

module.exports = async (req, res) => {
  const { chatRoomStatus } = req.query;

  const chats = await Chat.find({});

  const filteredChatRooms = [];

  for (const chat of chats) {
    const { chatRooms } = chat;

    if (!chatRoomStatus) {
      filteredChatRooms.push(...chatRooms);
    } else {
      const filteredRooms = chatRooms.filter(
        chatRoom => chatRoom.chatRoomStatus === chatRoomStatus,
      );
      filteredChatRooms.push(...filteredRooms);
    }
  }

  const totalCount = filteredChatRooms.length;

  res.status(200).json({ totalCount, chatRooms: filteredChatRooms });
};

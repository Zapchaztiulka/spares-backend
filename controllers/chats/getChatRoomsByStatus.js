const {
  chat: { Chat },
} = require('../../models');

module.exports = async (req, res) => {
  const { chatRoomStatus } = req.query;

  const chats = await Chat.find({});

  const filteredChatRooms = [];

  for (const chat of chats) {
    const { chatRooms, isOnline, username, userSurname } = chat;

    for (const chatRoom of chatRooms) {
      const updatedChatRoom = JSON.parse(JSON.stringify(chatRoom));
      updatedChatRoom.isOnline = isOnline;
      updatedChatRoom.username = username;
      updatedChatRoom.userSurname = userSurname;

      if (!chatRoomStatus) {
        filteredChatRooms.push(updatedChatRoom);
      } else if (chatRoom.chatRoomStatus === chatRoomStatus) {
        filteredChatRooms.push(updatedChatRoom);
      }
    }
  }

  const totalCount = filteredChatRooms.length;
  const activeChatsCount = filteredChatRooms.filter(
    room => room.isOnline === true,
  ).length;

  res
    .status(200)
    .json({ totalCount, activeChatsCount, chatRooms: filteredChatRooms });
};

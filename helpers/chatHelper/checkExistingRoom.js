module.exports = async (chatRooms, chatRoomStatus) => {
  return chatRooms.find(room => room.chatRoomStatus === chatRoomStatus);
};

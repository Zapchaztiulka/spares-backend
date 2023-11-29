const jwt = require('jsonwebtoken');

const {
  changeIsUserOnline,
  addUserMessage,
  addManagerMessage,
  connectManager,
  disconnectManager,
  toggleChat,
  leavePage,
} = require('./helpers/chatHelper');

module.exports = function configureSockets(socketIO, SECRET_KEY) {
  const socketUserMap = new Map();

  socketIO.on('connection', socket => {
    // Processing of user or manager auth
    socket.on('authentication', async ({ token }) => {
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const { userId, id } = decoded;

        // Connecting a socket with userId
        userId
          ? socketUserMap.set(socket.id, userId)
          : socketUserMap.set(socket.id, id);
        await changeIsUserOnline(socketIO, userId, true);

        console.log(
          `Socket ${socket.id} is authenticated for ${
            userId ? 'user' : 'manager'
          } ${userId || id}`,
        );
      } catch (err) {
        socket.emit('authenticationError', {
          message: 'Авторизація неуспішна. Повторно зайдіть в чат',
        });
        socket.disconnect();
      }
    });

    // Processing when chat is minimized or extended
    socket.on('toggleChat', async ({ userId, isChatRoomOpen }) => {
      await toggleChat(socketIO, userId, isChatRoomOpen);
    });

    // Processing when chat is minimized or extended
    socket.on('leavePage', async ({ userId, isLeavePage }) => {
      await leavePage(socketIO, userId, isLeavePage);
    });

    // Processing of user message
    socket.on('userMessage', async ({ userId, roomId, message }) => {
      await addUserMessage(socketIO, userId, roomId, message);
    });

    // Processing of user typing
    socket.on('userTyping', async ({ isTyping, roomId }) => {
      await socketIO.emit('userTyping', { isTyping, roomId });
    });

    // Processing of manager connection
    socket.on('managerJoinToChat', async ({ userId, roomId, manager }) => {
      await connectManager(socketIO, userId, roomId, manager);
    });

    // Processing of manager message
    socket.on('managerMessage', async ({ userId, roomId, message }) => {
      await addManagerMessage(socketIO, userId, roomId, message);
    });

    // Processing of unread manager messages by User
    socket.on(
      'countUnreadManagerMessages',
      async ({ userId, countUnreadManagerMessages }) => {
        await socketIO.emit('countUnreadManagerMessages', {
          userId,
          countUnreadManagerMessages,
        });
      },
    );

    // Processing of manager typing
    socket.on('managerTyping', async ({ isTyping, roomId }) => {
      await socketIO.emit('managerTyping', { isTyping, roomId });
    });

    // Processing when user or manager disconnected
    socket.on('disconnect', async () => {
      const userId = socketUserMap.get(socket.id);
      if (userId) {
        await changeIsUserOnline(socketIO, userId, false);
        await disconnectManager(socketIO, userId);
        socketUserMap.delete(socket.id);
        console.log(
          `${socket.id} socket (user or manager Id: ${userId}) was disconnected`,
        );
      } else {
        console.log('User or manager was disconnected');
      }
    });
  });
};

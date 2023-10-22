const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const app = require('./app');
const http = require('http').Server(app);
const cors = require('cors');

const { DB_HOST, PORT = 5000, SECRET_KEY } = process.env;

const {
  changeIsUserOnline,
  changeIsChatRoomOpen,
  addMessageInChatRoom,
  connectManager,
  disconnectManager,
} = require('./helpers/chatHelper');

const socketIO = require('socket.io')(http, {
  cors: {
    origin: '*', // замінити на бойове посилання веб-сайту чату
  },
});

app.set('socketIO', socketIO);
const socketUserMap = new Map();

socketIO.on('connection', socket => {
  // Processing of user auth
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

  // Processing of user status when chat room is rolling up or unfolding
  socket.on(
    'chatRoomOpenChanged',
    async ({ userId, roomId, isChatRoomOpen }) => {
      await changeIsChatRoomOpen(socketIO, userId, roomId, isChatRoomOpen);
    },
  );

  // Processing of manager connection
  socket.on('managerJoinToChat', async ({ userId, roomId, manager }) => {
    await connectManager(socketIO, userId, roomId, manager);
  });

  // Processing of new user message
  socket.on('userMessage', async ({ userId, roomId, message }) => {
    await addMessageInChatRoom(socketIO, userId, roomId, message);
  });

  // Processing when user disconnected chat room
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

mongoose
  .connect(DB_HOST)
  .then(() => {
    http.listen(PORT, () => {
      console.log(
        'Database connection successful and socket-server is running on port',
        PORT,
      );
    });
  })
  .catch(error => {
    console.log(`Database could not connect. Error: ${error.message}`);
    process.exit(1);
  });

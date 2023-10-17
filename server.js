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
} = require('./helpers/chatHelper');

const socketIO = require('socket.io')(http, {
  cors: {
    origin: '*', // замінити на бойове посилання веб-сайту чату
  },
});

app.set('socketIO', socketIO);
const socketUserMap = new Map();

socketIO.on('connection', socket => {
  socket.on('authentication', async ({ token }) => {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const userId = decoded.userId;
      console.log('🚀 ~ file: server.js:30 ~ socket.on ~ userId:', userId);

      // Зв'язуємо соксет с userId
      socketUserMap.set(socket.id, userId);
      await changeIsUserOnline(socketIO, userId, true);

      console.log(`Socket ${socket.id} is authenticated for user ${userId}`);
    } catch (err) {
      socket.emit('authenticationError', {
        message: 'Authentication failed. Unauthorized.',
      });
      socket.disconnect(); // Відключаємо соксет при помилці
    }
  });

  // Обробка чат-кімнати
  socket.on('newChat', ({ chatRoom }) => {
    socketIO.emit('newChat', { chatRoom });
  });

  // Обробка статусу клієнта при згортанні чату
  socket.on(
    'chatRoomOpenChanged',
    async ({ userId, roomId, isChatRoomOpen }) => {
      await changeIsChatRoomOpen(socketIO, userId, roomId, isChatRoomOpen);
    },
  );

  socket.on('disconnect', async () => {
    // Видаляємо зв'язок соксета з користовачем при відключенні
    const userId = socketUserMap.get(socket.id);
    if (userId) {
      await changeIsUserOnline(socketIO, userId, false);
      socketUserMap.delete(socket.id);
      console.log(`${socket.id} socket (userId: ${userId}) was disconnected`);
    } else {
      console.log(`${userId} user was disconnected`);
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

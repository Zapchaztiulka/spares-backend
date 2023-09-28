const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const app = require('./app');
const http = require('http').Server(app);
const cors = require('cors');

const { DB_HOST, PORT = 5000, SECRET_KEY } = process.env;

const socketIO = require('socket.io')(http, {
  cors: {
    origin: '*', // замінити на бойове посилання веб-сайту чату
  },
});

const socketUserMap = new Map();

socketIO.on('connection', socket => {
  socket.on('authentication', ({ token }) => {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const userId = decoded.userId;

      // Зв'язуємо соксет с userId
      socketUserMap.set(socket.id, userId);

      console.log(`Socket ${socket.id} is authenticated for user ${userId}`);
    } catch (err) {
      console.error('Authentication error:', err.message);
      socket.disconnect(); // Відключаємо соксет при помилці
    }
  });

  socket.on('disconnect', () => {
    // Видаляємо зв'язок соксета з користовачем при відключенні
    const userId = socketUserMap.get(socket.id);
    if (userId) {
      socketUserMap.delete(socket.id);
      console.log(`${socket.id} socket (userId: ${userId}) was disconnected`);
    } else {
      console.log(`${socket.id} user was disconnected`);
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

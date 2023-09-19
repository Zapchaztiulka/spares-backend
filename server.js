const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');

const { DB_HOST, PORT = 5000 } = process.env;

mongoose.set('strictQuery', true);

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
  console.log('A user connected');

  // Обробник події для надсилання повідомлення клієнту
  socket.on('clientMessage', async (message, chatId) => {
    // Тут має бути логіка для збереження повідомлення в чаті у базі даних
    // Проставлення messageOwner в "user"

    io.to(chatId).emit('message', message);
  });

  // Обробник події для надсилання повідомлення менеджера
  socket.on('managerMessage', async (message, chatId) => {
    // Тут має бути логіка для збереження повідомлення в чаті у базі даних
    // Проставлення messageOwner в "admin"

    io.to(chatId).emit('message', message);
  });

  // Інші обробники подій WebSocket
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    server.listen(PORT, () => {
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

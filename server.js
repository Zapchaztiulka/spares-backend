const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const app = require('./app');
const http = require('http').Server(app);
// eslint-disable-next-line no-unused-vars
const cors = require('cors');

const { DB_HOST, PORT = 5000, SECRET_KEY } = process.env;

const socketIO = require('socket.io')(http, {
  cors: {
    origin: '*', // замінити на бойове посилання веб-сайту чату
  },
});

app.set('socketIO', socketIO);

const configureSockets = require('./configureSockets');
configureSockets(socketIO, SECRET_KEY);

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

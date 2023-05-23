const express = require('express');
const path = require('path');
const handleCookieSessions = require('./middleware/handle-cookie-sessions');
const routes = require('./routes');
const http = require("http");
const cors = require("cors");
const app = express();
const { Server } =  require('socket.io');

app.use(cors());
app.use(handleCookieSessions);
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const server = http.createServer(app);

const Socket_Server = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"],
  }
})

Socket_Server.on("connection", (socket) => {
  console.log("USER CONNECTED " + socket.id);

  socket.on('disconnect', () => {
    console.log("User Disconnected", socket.id);
  })
})

app.use('/api', routes);

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) next();
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

server.listen(3001, () => {
  console.log('socket running');
})

module.exports = app;

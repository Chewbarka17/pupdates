const express = require('express');
const parser = require('body-parser');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

// Initialize sockets
const io = require('socket.io')('3000');

// File imports
const routes = require('./routes/index.js');
// const db = require('../db/index.js');

// Express Initialization
const app = express();

// MiddleWares
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Routes
app.use(express.static(path.resolve(__dirname, '../src')));
app.use('/api', routes);

// Sockets for messaging
io.on('connection', (socket) => {
  console.log('socket connection');
  socket.on('message', (message) => {
    console.log('socket message');
    socket.broadcast.emit(message.roomId, message);
  });
  socket.on('disconnect', () => {
    console.log('we have disconnected')
  });
});

module.exports = app;

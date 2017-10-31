const express = require('express');
const parser = require('body-parser');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
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

// Messages
// console.log('io.on', io);
io.on('connection', (socket) => {
  console.log('socket connection');
  socket.on('message', (message) => {
    // put message in database?
    console.log('socket message', message.roomid);
    socket.broadcast.emit(message.roomid, message);
  });
});

module.exports = app;

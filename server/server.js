const express = require('express');
const parser = require('body-parser');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const io = require('socket.io')();

// File imports
const routes = require('./routes/index.js');
const db = require('../db/index.js');

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
io.on('connection', (socket) => {
  socket.on('message', (message) => {
    // put message in database?
    // console.log('io.on + socket.on', message);

    socket.in(message.roomid).emit('message', {
      user: message.user,
      text: message.text,
      //room id
    });
  });
});

module.exports = app;

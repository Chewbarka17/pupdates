// const db = require('../../db/index');
const Owners = require('../../db/Owners/ownerSchema');
const Rooms = require('../../db/Messages/messageSchema');
const mongoose = require('mongoose');

module.exports = {

  // You need a room id to get the messages associated with that room.
  getMessages: (req, res) => {
    Rooms.find({ _id: req.params.roomid }, (err) => {
      if (err) {
        console.log('Error getting messages', err);
        res.status(500).send(err);
      }
    })
      .then((data) => {
        res.status(200).send(data);
      });
  },

  // a message is an object with a user and a text. No altering or deleting messages yet.
  addMessage: (req, res) => {
    Rooms.findOneAndUpdate({ _id: req.params.roomid }, {
      $push: {
        messages: {
          $each: [{
            user: req.body.user,
            createdAt: req.body.createdAt,
            text: req.body.text,
          }],
          $position: 0,
        },
      },
    }, { new: true }, (err, data) => {
      if (err) {
        console.log('update error', err);
        res.status(500).send('error', err);
      }
      res.status(201).send(data);
    });
  },

  // I'm putting the names and user ids of the two people involved in the conversation in an array. Will update logic when front end is up.
  createRoom: (req, res) => {
    console.log('creating room', req.body)
    const room = new Rooms({
      _id: new mongoose.Types.ObjectId(),
      // users: req.body.users,
      uids: req.body.uids,
      messages: [],
    });
    room.save((err) => {
      console.log('room saved')
      if (err) {
        console.error('Could not save owner', err);
      }
    })
      .then((data) => {
        console.log('.then', data);
        data.uids.forEach((uid) => {
          console.log(uid)
          Owners.findOneAndUpdate({ _id: uid }, { $push: { chatRooms: data._id } }, (err) => {
            if (err) {
              console.log('add dog update error', err);
              res.status(500).send('error', err);
            }
          });
        });
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  getRooms: (req, res) => {
    Owners.find({ _id: req.params.userid }, (err) => {
      if (err) {
        console.log('Error getting messages', err);
        res.status(500).send(err);
      }
    })
      .then((data) => {
        Rooms.find({ _id: { $in: data[0].chatRooms } }, (err) => {
          if (err) {
            console.log('error getting message rooms ', err);
          }
        })
          .then((results) => {
            res.status(200).send(results);
          })
          .catch((err) => {
            console.log('Error getting message rooms', err);
          });
      })
      .catch((err) => {
        console.log('Error getting user', err);
      });
  },

};

const db = require('../../db/index');
const mongoose = require('mongoose');

// const mongodbURI = process.env.DB_URL;
// mongoose.connect(mongodbURI, {
//   useMongoClient: true,
// });

module.exports = {

  // You need a room id to get the messages associated with that room.
  getMessages: (req, res) => {
    db.Messages.find({roomid: req.params.roomid}, (err) => {
      if (err) {
        console.log('Error getting messages', err);
        res.status(500).send(err);
      }
    })
      .then((data) => {
        res.status(200).send(data);
      });
  },

  // I'm putting the names and user ids of the two people involved in the conversation in an array. Will update logic when front end is up. 
  createRoom: (req, res) => {
    const room = new db.Rooms({
      _id: new mongoose.Types.ObjectId(),
      users: [req.body.nameOne, req.body.nameTwo],
      uids: [req.body.uidOne, req.body.uidTwo],
      messages: [],
    });
    room.save((err) => {
      if (err) {
        console.error('Could not save owner', err);
      }
    })
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  // a message is an object with a user and a text. No altering or deleting messages yet.
  addMessage: (req, res) => {
    db.Rooms.findOneAndUpdate({ _id: req.params.roomid }, {
      $push: {
        messages: {
          user: req.body.user,
          text: req.body.text,
        },
      },
    }, { new: true }, (err, data) => {
      console.log('callback', data);
      if (err) {
        console.log('update error', err);
        res.status(500).send('error', err);
      }
      res.status(201).send(data);
    });
  },

};

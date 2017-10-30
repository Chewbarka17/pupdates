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

  updateChatRooms: (req, res) => {
    req.body.uids.forEach((uid) => {
      Owners.findOneAndUpdate({ _id: uid },
        { $pull: { chatRooms: req.params.roomid } },
        (err, data) => {
          if (err) {
            console.log('error1', err)
          }
          Owners.findOneAndUpdate({ _id: uid },
            {
              $push: {
                chatRooms: {
                  $each: [req.params.roomid],
                  $position: 0,
                },
              },
            },
            (error) => {
              if (error) {
                console.log('error2', error);
              }
            });
        });
    });
    res.status(201).send('yay');
  },

  // I'm putting the names and user ids of the two people involved in the conversation in an array. Will update logic when front end is up.
  createRoom: (req, res) => {

    Owners.find({ _id: req.body.uids }, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    })
      .then((data) => {
        const roomid = data[0].chatRooms.filter((id) => {
          return data[1].chatRooms.indexOf(id) !== -1;
        });
        if (roomid.length > 0) {
          Rooms.findOne({ _id: roomid }, (err) => {
            if (err) {
              console.log(err);
            }
          })
            .then((room) => {
              res.send(room);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        } else {
          const room = new Rooms({
            _id: new mongoose.Types.ObjectId(),
            uids: req.body.uids,
            messages: [],
          });
          room.save((err) => {
            console.log('room saved')
            if (err) {
              console.error('Could not save owner', err);
            }
          })
            .then((result) => {
              console.log('.then', result);
              result.uids.forEach((uid) => {
                console.log(uid)
                Owners.findOneAndUpdate({ _id: uid }, { $push: { chatRooms: result._id } }, (err) => {
                  if (err) {
                    console.log('add dog update error', err);
                    res.status(500).send('error', err);
                  }
                });
              });
              res.status(201).send(result);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
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
            const rooms = results;
            const uids = [];

            results.forEach((owner) => {
              const id = owner.uids.filter(uid => uid !== req.params.userid);
              uids.push(id[0]);
            });
            Owners.find({ _id: { $in: uids } })
              .then((partners) => {
                for (let i = 0; i < results.length; i++) {
                  rooms[i]._doc.partner = partners[i].name;
                }
                // console.log('rooms', rooms[1])
                // console.log('_doc', rooms[1]._doc);
                res.status(200).send(rooms);
              });
          })
          .catch((err) => {
            console.log('Error getting message rooms', err);
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        console.log('Error getting user', err);
        res.status(500).send(err);
      });
  },

};

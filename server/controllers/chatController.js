const Owners = require('../../db/Owners/ownerSchema');
const Rooms = require('../../db/ChatRooms/ChatRoomSchema');
const mongoose = require('mongoose');

module.exports = {

  // You need a room id to get the messages associated with that room.
  getChatRoomByRoomId: (req, res) => {
    Rooms.find({ _id: req.params.roomId }, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    })
      .then((data) => {
        res.status(200).send(data);
      });
  },

  // a message is an object with a user and a text. No altering or deleting messages yet.
  addMessageToRoomByRoomId: (req, res) => {
    Rooms.findOneAndUpdate({ _id: req.params.roomId }, {
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
        res.status(500).send('error', err);
      }
      res.status(201).send(data);
    });
  },

  orderChatRoomsByMostRecent: (req, res) => {
    req.body.uids.forEach((uid) => {
      Owners.findOneAndUpdate({ _id: uid },
        { $pull: { chatRooms: req.params.roomid } },
        (err) => {
          if (err) {
            res.status(500).send(err);
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
                res.status(500).send(error);
              }
            });
        });
    });
    res.status(201).send('yay');
  },

  findOrCreateChatRoom: (req, res) => {
    Owners.find({ _id: req.body.uids }, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    })
      .then((data) => {
        const roomId = data[0].chatRooms.filter((id) => {
          return data[1].chatRooms.indexOf(id) !== -1;
        });
        if (roomId.length > 0) {
          Rooms.findOne({ _id: roomId }, (err) => {
            if (err) {
              res.status(500).send(err);              
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
            if (err) {
              res.status(500).send(err);
            }
          })
            .then((result) => {
              result.uids.forEach((uid) => {
                Owners.findOneAndUpdate({ _id: uid }, { $push: { chatRooms: result._id } }, (err) => {
                  if (err) {
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

  getChatRoomsByOwnerId: (req, res) => {
    Owners.find({ _id: req.params.ownerId }, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    })
      .then((data) => {
        Rooms.find({ _id: { $in: data[0].chatRooms } }, (err) => {
          if (err) {
            res.status(500).send(err);
          }
        })
          .then((results) => {
            const rooms = JSON.parse(JSON.stringify(results));
            const uids = [];

            results.forEach((owner) => {
              const id = owner.uids.filter(uid => uid !== req.params.userid);
              uids.push(id[0]);
            });
            Owners.find({ _id: uids })
              .then((partners) => {
                const refObj = {};
                for (let j = 0; j < partners.length; j++) {
                  refObj[partners[j]._id] = partners[j];
                }

                for (let k = 0; k < uids.length; k++) {
                  uids[k] = refObj[uids[k]];
                }

                for (let i = 0; i < rooms.length; i++) {
                  rooms[i].partner = uids[i].name;
                }

                rooms.sort((a, b) => {
                  return new Date(b.messages[0].createdAt) - new Date(a.messages[0].createdAt);
                });

                res.status(200).send(rooms);
              });
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

};

const Owners = require('../../db/Owners/ownerSchema');
const Rooms = require('../../db/ChatRooms/ChatRoomSchema');
const mongoose = require('mongoose');

module.exports = {

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

  // Puts each message at the front of the messages array in the room
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

  // Updates each owner's chat rooms array by most recent messages
  orderChatRoomsByMostRecent: (req, res) => {
    req.body.ownerIds.forEach((ownerId) => {
      Owners.findOneAndUpdate({ _id: ownerId },
        { $pull: { chatRooms: req.params.roomId } },
        (err) => {
          if (err) {
            res.status(500).send(err);
          }
          Owners.findOneAndUpdate({ _id: ownerId },
            {
              $push: {
                chatRooms: {
                  $each: [req.params.roomId],
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

  // Creates a chat room if it can't find a common chat room between owners
  findOrCreateChatRoom: (req, res) => {
    Owners.find({ _id: req.body.ownerIds }, (err) => {
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
              res.status(200).send(room);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        } else {
          const room = new Rooms({
            _id: new mongoose.Types.ObjectId(),
            ownerIds: req.body.ownerIds,
            messages: [],
          });
          room.save((err) => {
            if (err) {
              res.status(500).send(err);
            }
          })
            .then((result) => {
              result.ownerIds.forEach((ownerId) => {
                Owners.findOneAndUpdate({ _id: ownerId }, { $push: { chatRooms: result._id } }, (err) => {
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

  // Finds all chat rooms and orders them by most recently used
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
          // Gets the name of the other owner in each conversation and put its with the correct room
          .then((results) => {
            const rooms = JSON.parse(JSON.stringify(results));
            const partnerOwnerIds = [];

            results.forEach((owner) => {
              const id = owner.ownerIds.filter(partnerOwnerId => partnerOwnerId !== req.params.ownerId);
              partnerOwnerIds.push(id[0]);
            });
            Owners.find({ _id: partnerOwnerIds })
              .then((partners) => {
                const refObj = {};
                for (let j = 0; j < partners.length; j++) {
                  refObj[partners[j]._id] = partners[j];
                }

                for (let k = 0; k < partnerOwnerIds.length; k++) {
                  partnerOwnerIds[k] = refObj[partnerOwnerIds[k]];
                }

                for (let i = 0; i < rooms.length; i++) {
                  rooms[i].partner = partnerOwnerIds[i].name;
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

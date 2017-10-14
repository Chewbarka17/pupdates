const db = require('../../db/index');
const mongoose = require('mongoose');

const mongodbURI = process.env.DB_URL;
mongoose.connect(mongodbURI, {
  useMongoClient: true,
});

module.exports = {
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

  addMessage: (req, res) => {
    const message = new db.Owners({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      age: req.body.age,
      location: req.body.location,
      picture: req.body.picture,
      bio: req.body.bio,
      rating: req.body.rating,
    });
    owner.save((err) => {
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

};

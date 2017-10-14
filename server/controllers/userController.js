// require user database
const db = require('../../db');
const mongoose = require('mongoose');

const mongodbURI = process.env.DB_URL;
mongoose.connect(mongodbURI, {
  useMongoClient: true,
});

module.exports = {

  getAllUsers: (req, res) => {
    db.Owners.find({}, (err, owners) => {
      if (err) {
        console.log('error getting all users ', err);
        res.status(500).send(err);
      }
      const ownerMap = {};

      owners.forEach((owner) => {
        ownerMap[owner._id] = owner;
      });
      res.status(200).send(ownerMap);
    });
  },

  getUser: (req, res) => {
    db.Owners.find({ _id: req.params.userid }, (err, owner) => {
      if (err) {
        console.log('error getting this user ', err);
        res.status(500).send(err);
      }
      res.status(200).send(owner);
    });
  },

  addUser: (req, res) => {
    console.log(req.body);
    const owner = new db.Owners({
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

  updateUser: (req, res) => {
    db.Owners.findOneAndUpdate({ _id: req.body.id }, {
      // console.log("trying to update user");
      $set: {
        name: req.body.name,
        age: req.body.age,
        location: req.body.location,
        picture: req.body.picture,
        bio: req.body.bio,
        rating: req.body.rating,
      },
    }, { new: true }, (err, data) => {
      if (err) {
        console.log('update error', err);
        res.status(500).send('error', err);
      }
      res.status(201).send(data);
    });
  },

  removeUser: (req, res) => {
    db.Owners.remove({ _id: req.params.userid }, (err, data) => {
      if (err) {
        res.status(500).send('error removing user', err);
      }
      res.status(202).send('User successfully deleted');
    });
  },

};

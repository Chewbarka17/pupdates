// require user database
const db = require('../../db');
const mongoose = require('mongoose');

const mongodbURI = process.env.DB_URL;
mongoose.connect(mongodbURI, {
  useMongoClient: true,
});

module.exports = {

  // getAllUsers: (req, res) => {
  //   // users.findAll
  // },

  // getUser: (req, res) => {
  //   // get user by id
  // },

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

  // updateUser: (req, res) => {
  //   // patch user by user id
  // },

  // removeUser: (req, res) => {
  //   // delete user from db
  // }

};
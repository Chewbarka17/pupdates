// require dogs database
const db = require('../../db/index');
const mongoose = require('mongoose');
const owners = require('./userController');

const mongodbURI = process.env.DB_URL;
mongoose.connect(mongodbURI, {
  useMongoClient: true,
});

module.exports = {

  // getAllDogs: (req, res) => {
  //   // dogs.findAll
  // },

  // getDog: (req, res) => {
  //   // get dog by id
  // },

  addDog: (req, res) => {
    const dog = new db.Dogs({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      owner: req.body.oid,
      age: req.body.age,
      breed: req.body.breed,
      pictures: req.body.pictures,
    });
    dog.save((err) => {
      if (err) {
        console.log('Failed to save dog ', err);
      }
    })
      .then((data) => {
        // update owners dogs array by owner id
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  // updateDog: (req, res) => {
  //   // patch dog by dog id
  // },

  // removeDog: (req, res) => {
  //   // delete dog from db
  // }

};

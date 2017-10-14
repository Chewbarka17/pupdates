// require dogs database
const db = require('../../db/index');
const mongoose = require('mongoose');

const mongodbURI = process.env.DB_URL;
mongoose.connect(mongodbURI, {
  useMongoClient: true,
});

module.exports = {

  getAllDogs: (req, res) => {
    db.Dogs.find({}, (err, dogs) => {
      let dogMap = {};

      dogs.forEach((dog) => {
        dogMap[dog._id] = dog;
      });
      res.status(200).send(dogMap);
    });
  },

  getDog: (req, res) => {
    db.Dogs.find({ _id: req.params.dogid }, (err, dog) => {
      if (err) {
        console.log('error getting this dog ', err);
        res.status(500).send(err);
      }
      res.status(200).send(dog);
    });
  },

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
        db.Owners.findOneAndUpdate({ _id: req.body.owner }, { $push: { dogs: data._id } }, (err) => {
          if (err) {
            console.log('add dog update error', err);
            res.status(500).send('error', err);
          }
          res.status(201).send(data);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  updateDog: (req, res) => {
    console.log(req.params.dogid);
    db.Dogs.findOneAndUpdate({ _id: req.params.dogid }, {
      $set: {
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed,
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

  // removeDog: (req, res) => {
  //   // delete dog from db
  // }

};

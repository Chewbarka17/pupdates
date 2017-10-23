// const db = require('../../db/index');
const Dogs = require('../../db/Dogs/dogSchema');
const Owners = require('../../db/Owners/ownerSchema');
const mongoose = require('mongoose');

module.exports = {

  getAllDogs: (req, res) => {
    Dogs.find({}, (err, dogs) => {
      const dogMap = {};

      dogs.forEach((dog) => {
        dogMap[dog._id] = dog;
      });
      res.status(200).send(dogMap);
    });
  },

  getDog: (req, res) => {
    Dogs.find({ _id: req.params.dogid }, (err, dog) => {
      if (err) {
        console.log('error getting this dog ', err);
        res.status(500).send(err);
      }
      res.status(200).send(dog);
    });
  },

  getDogsByOwner: (req, res) => {
    Owners.find({ _id: req.params.userid }, (err) => {
      if (err) {
        console.log('error getting dogs ', err);
        res.status(500).send(err);
      }
    })
      .then((data) => {
        // console.log(data);
        Dogs.find({ _id: { $in: data[0].dogs } }, (err) => {
          if (err) {
            console.log('error getting this dog ', err);
          }
        })
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((err) => {
            console.log('err1', err);
          });
      })
      .catch((err) => {
        console.log('err2', err);
      });
  },

  addDog: (req, res) => {
    const dog = new Dogs({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      owner: req.body.owner,
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
        Owners.findOneAndUpdate({ _id: req.body.owner }, { $push: { dogs: data._id } }, (err) => {
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
    Dogs.findOneAndUpdate({ _id: req.params.dogid }, {
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

  removeDog: (req, res) => {
    Owners.findOneAndUpdate({ _id: req.body.owner }, { $pull: { dogs: req.params.dogid } }, (err) => {
      if (err) {
        console.log('add dog update error', err);
      }
    });

    Dogs.remove({ _id: req.params.dogid }, (err) => {
      if (err) {
        res.status(500).send('error removing dog', err);
      }
    })
      .then((data) => {
        // console.log(data._id);
        res.status(202).send(data);
      })
      .catch((err) => {
        res.status(500).send('error removing dog', err);
      });
  },

  // find user by ID
  // in that user's seenDogs array, 
  // find dog IDs that are not in that user's seenDogs array
  getUnseenDogsByOwner: (req, res) => {
    Owners.find({ _id: req.params.userid }, (err) => {
      if (err) {
        console.log('error getting user', err);
        res.status(500).send(err);
      }
    })
    .then((data) => {
      Dogs.find({ _id: { $nin: data[0].dogsSeen }}, (err) => {
        if (err) {
          console.log('error getting dogsSeen', err);
          res.status(500).send(err);
        }
      })
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          console.log('error getting dogsSeen', err);
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      console.log('error getting user', err);
      res.status(500).send(err);
    })
  },

  getLikedDogsByOwner: (req, res) => {
    Owners.find({ _id: req.params.userid }, (err) => {
      if (err) {
        console.log('error getting user', err);
        res.status(500).send(err);
      }
    })
    .then((data) => {
      Dogs.find({ _id: { $in: data[0].dogsLiked }}, (err) => {
        if (err) {
          console.log('error getting dogsLiked', err);
          res.status(500).send(err);
        }
      })
        .then((result) => {
          result = result.map(function(likedDog) { // the result will be an array of dog IDs instead of an array of dog objects
            return likedDog._id;
          });
          res.status(200).send(result);
        })
        .catch((err) => {
          console.log('error getting dogsLiked', err);
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      console.log('error getting user', err);
      res.status(500).send(err);
    })
  },
};
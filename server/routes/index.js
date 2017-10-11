const router = require('express').Router();

// require controllers
const dogs = require('../controllers/dogController');

// dogs
router.get('/dogs', dogs.getAllDogs);
router.get('/dogs/:dogid', dogs.getDog);
router.post('/dogs', dogs.addDog);
router.delete('/dogs', dogs.removeDog);
router.patch('/dogs/:dogid', dogs.updateDog);


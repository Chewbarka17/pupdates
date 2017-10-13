const router = require('express').Router();

// require controllers
const dogs = require('../controllers/dogController');
const users = require('../controllers/userController');

// dogs
router.get('/dogs', dogs.getAllDogs);
router.get('/dogs/:dogid', dogs.getDog);
router.post('/dogs', dogs.addDog);
router.delete('/dogs', dogs.removeDog);
router.patch('/dogs/:dogid', dogs.updateDog);

// users
router.get('/users', users.getAllUsers);
router.get('/users/:userid', users.getUsers);
router.post('/users', users.addUsers);
router.delete('/users', users.removeUsers);
router.patch('/users/:userid', users.updateUsers);

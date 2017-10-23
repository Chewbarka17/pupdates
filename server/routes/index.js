const router = require('express').Router();

// require controllers
const dogs = require('../controllers/dogController');
const users = require('../controllers/userController');
const messages = require('../controllers/messageController');

// dogs
router.get('/dogs', dogs.getAllDogs);
router.get('/dogs/:dogid', dogs.getDog);
router.post('/dogs', dogs.addDog);
router.delete('/dogs/:dogid', dogs.removeDog);
router.patch('/dogs/:dogid', dogs.updateDog);

router.get('/users/dogs/:userid', dogs.getDogsByOwner);
router.get('/newdogs/:userid', dogs.getUnseenDogsByOwner);

// users
router.get('/users', users.getAllUsers);
router.get('/users/:userid', users.getUser);
router.post('/users', users.addUser);
router.delete('/users/:userid', users.removeUser);
router.patch('/users', users.updateUser);

router.patch('/users/seendogs/:userid', users.updateSeenDogs);

// messages
router.get('/messages/:roomid', messages.getMessages);
router.patch('/messages/:roomid', messages.addMessage);
router.post('/rooms', messages.createRoom);
router.get('/rooms/:userid', messages.getRooms);


module.exports = router;

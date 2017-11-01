const router = require('express').Router();

// require controllers
const dogs = require('../controllers/dogController');
const users = require('../controllers/userController');
const chat = require('../controllers/chatController');

// dogs
router.get('/dogs', dogs.getAllDogs);
router.get('/dogs/:dogid', dogs.getDog);
router.post('/dogs', dogs.addDog);
router.delete('/dogs/:dogid', dogs.removeDog);
router.patch('/dogs/:dogid', dogs.updateDog);
router.get('/users/dogs/:userid', dogs.getDogsByOwner);

router.get('/likeddogs/:userid', dogs.getLikedDogsByOwner);
router.get('/newdogs/:userid', dogs.getUnseenDogsByOwner);

// users
router.get('/users', users.getAllUsers);
router.get('/users/:userid', users.getUser);
router.get('/fbuser/:fbid', users.getUserByFBid);
router.post('/users', users.addUser);
router.delete('/users/:userid', users.removeUser);
router.patch('/users', users.updateUser);

router.patch('/users/seendogs/:userid', users.updateSeenDogs);

router.patch('/users/likeddogs/:userid', users.updateLikedDogs);
router.patch('/likeddogs/:userid', users.removeLikedDog);

// Chat routes
router.get('/messages/:roomId', chat.getChatRoomByRoomId);
router.patch('/messages/:roomId', chat.addMessageToRoomByRoomId);
router.post('/rooms', chat.findOrCreateChatRoom);
router.get('/rooms/:ownerId', chat.getChatRoomsByOwnerId);
router.patch('/rooms/:roomId', chat.orderChatRoomsByMostRecent);

module.exports = router;

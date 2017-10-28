const db = require('../index.js');

const ownerSchema = new db.Schema({
  _id: db.Schema.Types.ObjectId,
  fb_id: String,
  name: String,
  location: String,
  coords: [Number],
  age: Number,
  picture: String,
  bio: String,
  rating: Number,
  dogs: [{ type: db.Schema.Types.ObjectId, ref: 'Dogs' }],
  dogsSeen: [{ type: db.Schema.Types.ObjectId, ref: 'Dogs' }],
  dogsLiked: [{ type: db.Schema.Types.ObjectId, ref: 'Dogs' }],
  chatRooms: [{ type: db.Schema.Types.ObjectId, ref: 'Rooms' }],
});

module.exports = db.mongoose.model('Owners', ownerSchema);

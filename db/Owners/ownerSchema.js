const db = require('../index.js');

const ownerSchema = new db.Schema({
  _id: db.Schema.Types.ObjectId,
  name: String,
  location: String,
  age: { type: Number, min: 18, max: 101 },
  picture: String,
  bio: String,
  rating: Number,
  dogs: [{ type: db.Schema.Types.ObjectId, ref: 'Dogs' }],
  dogsSeen: [{ type: db.Schema.Types.ObjectId, ref: 'Dogs' }],
  dogsLiked: [{ type: db.Schema.Types.ObjectId, ref: 'Dogs' }],
  chatRooms: [{ type: db.Schema.Types.ObjectId, ref: 'Rooms' }],
});

module.exports = db.mongoose.model('Owners', ownerSchema);

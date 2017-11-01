const db = require('../index.js');

const roomSchema = new db.Schema({
  _id: db.Schema.Types.ObjectId,
  ownerIds: [String],
  messages: [{
    user: { name: String, ownerId: String },
    text: String,
    createdAt: String,
  }],
});

module.exports = db.mongoose.model('Rooms', roomSchema);

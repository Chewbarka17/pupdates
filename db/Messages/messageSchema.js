const db = require('../index.js');

const roomSchema = new db.Schema({
  _id: db.Schema.Types.ObjectId,
  uids: [String],
  messages: [{
    user: { name: String, uid: String },
    text: String,
    createdAt: String,
  }],
});

module.exports = db.mongoose.model('Rooms', roomSchema);

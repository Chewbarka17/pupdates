const db = require('../index.js');

const dogSchema = new db.Schema({
  _id: db.Schema.Types.ObjectId,
  name: String,
  breed: String,
  age: { type: Number, min: 0, max: 30 },
  pictures: [String], // blobs //filestack api
  gender: String,
  bio: String,
  location: String,
  owner: { type: db.Schema.Types.ObjectId, ref: 'Owners' },
});

module.exports = db.mongoose.model('Dogs', dogSchema);

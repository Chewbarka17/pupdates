const mongoose = require('mongoose');
const faker = require('faker');

const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

// const mongodbURI = 'mongodb://YOUR MONGODB URI';
const mongodbURI = 'mongodb://127.0.0.1:27017/puptest';
mongoose.connect(mongodbURI, {
  useMongoClient: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', () => {
  // we're connected!
  console.log('mongodb connected');
});

const Schema = mongoose.Schema;

const dogSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  breed: String,
  age: { type: Number, min: 0, max: 30},
  pictures: [String],
  owner: { type: Schema.Types.ObjectId, ref: 'Owners' }
});

const ownerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  location: Number,
  age: { type: Number, min: 18, max: 101},
  bio: String,
  dogs: [{type: Schema.Types.ObjectId, ref: 'Dogs'}],
  dogsSeen: [{type: Schema.Types.ObjectId, ref: 'Dogs'}],
  dogsLiked: [{type: Schema.Types.ObjectId, ref: 'Dogs'}]
});

const Owners = mongoose.model('Owners', ownerSchema);
const Dogs = mongoose.model('Dogs', dogSchema);

db.dropCollection('owners', (err) => {
  if (err) {
    console.log('owners collection did not delete', err);
    return;
  }
  console.log('owners collection deleted');
});

db.dropCollection('dogs', (err) => {
  if (err) {
    seed();
    console.log('dogs collection did not delete', err);
    return;
  }
  seed();
  console.log('dogs collection deleted');
});

let seed = function() {
  for (let i = 0; i < 10; i++) {
    let dog_id = new mongoose.Types.ObjectId();
    let owner = new Owners({
      _id: new mongoose.Types.ObjectId(),
      name: faker.name.findName(),
      age: Math.floor(Math.random() * 50) + 20,
    });
    owner.dogs.push(dog_id);
    owner.save((err) => {
      if (err) {
        console.error('Could not save owner', err);
      }

      let dog = new Dogs({
        _id: dog_id,
        name: faker.name.findName(),
        owner: owner._id,
        age: Math.floor(Math.random() * 25) + 1,
      });

      dog.save((err) => {
        if (err) {
          console.error('Could not save dog', err);
        }
      });
    });
  }
};
module.exports = db;

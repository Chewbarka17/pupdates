const mongoose = require('mongoose');
// const faker = require('faker');

const mongodbURI = process.env.DB;
mongoose.connect(mongodbURI, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongodb connected');
});

const Schema = mongoose.Schema;

// ==== DROP DATA EXAMPLE ====
// db.dropCollection('owners', (err) => {
//   if (err) {
//     console.log('owners collection did not delete', err);
//     return;
//   }
//   console.log('owners collection deleted');
// });

// db.dropCollection('dogs', (err) => {
//   if (err) {
//     console.log('dogs collection did not delete', err);
//     return;
//   }
//   seed();
//   console.log('dogs collection deleted');
// });

// ==== SEED DATA ====
// function getRandomInt(minimum, maximum) {
//   let min = Math.ceil(minimum);
//   let max = Math.floor(maximum);
//   return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
// }

// for (let i = 0; i < 10; i++) {
//   const dog_id = new mongoose.Types.ObjectId();

//   const owner = new Owners({
//     _id: new mongoose.Types.ObjectId(),
//     name: faker.name.findName(),
//     age: getRandomInt(18, 101),
//     location: faker.address.zipCode(),
//     picture: faker.image.avatar(),
//     bio: faker.lorem.paragraph(),
//     rating: getRandomInt(1, 6),
//   });

//   owner.dogs.push(dog_id);

//   owner.save((err) => {
//     if (err) {
//       console.error('Could not save owner', err);
//       return;
//     }

// const dog = new Dogs({
//   _id: dog_id,
//   name: faker.name.findName(),
//   owner: owner._id,
//   age: getRandomInt(0, 30),
// });

//     dog.pictures.push(faker.image.cats());

//     dog.save((err) => {
//       if (err) {
//         console.error('Could not save dog', err);
//       }
//     });
//   });
// }

module.exports = {
  db,
  Schema,
  mongoose,
};

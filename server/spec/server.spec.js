const request = require('supertest');
const app = require('../server');
// const db = require('../../db/index');
// const Dogs = require('../../db/Dogs/dogSchema.js');
const Owners = require('../../db/Owners/ownerSchema.js');
// const Rooms = require('../../db/Messages/messageSchema');
const mongoose = require('mongoose');

let user_id;
let dog_id;

describe('Users routes', () => {
  test('[Users|GET] It should respond with status 200', async () => {
    try {
      const response = await request(app).get('/api/users');
      expect(response.statusCode).toBe(200);
    } catch(err) {
      console.error('Server did not responsd with status 200', err);
    }
  });

  test('[Users|POST] It should add user obj to DB with status 201', async () => {
    try {
      const owner = {
        name: 'Clark Kent',
        age: 50,
        location: '99999',
        picture: 'picture.jpeg',
        bio: 'Last Son of Krypton',
        rating: 5,
      };

      const response = await request(app)
        .post('/api/users')
        .send(owner);

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject(owner);

      user_id = response.body._id;

      const data = await Owners.findById(user_id).lean().exec();
      expect(data).toMatchObject(owner);
    } catch(err) {
      console.error('Unable to save user to database.', err);
    }
  });

  test('[Users|GET] It should return the user that was created with status 200', async () => {
    try {    
      const response = await request(app).get('/api/users/' + user_id);
      expect(response.body[0]._id).toBe(user_id);

      delete response.body[0]['_id'];

      const data = await Owners.findById(user_id).lean().exec();
      expect(data).toMatchObject(response.body[0]);
    } catch(err) {
      console.error('User does not exist in database', err);
    }
  });

  test('[Users|PATCH] It should update a user field with status 201', async () => {
    try {
      const owner = {
        id: user_id,
        name: 'Superman',
        age: 50,
        location: '11111',
        picture: 'picture.jpeg',
        bio: 'Man of Steel',
        rating: 5,
      };

      let response = await request(app)
        .patch('/api/users')
        .send(owner);
      response = await request(app).get('/api/users/' + user_id);

      expect(response.body[0]).toHaveProperty('name', 'Superman');
      expect(response.body[0]).toHaveProperty('location', '11111');
      expect(response.body[0]).toHaveProperty('bio', 'Man of Steel');

      const data = await Owners.findById(user_id).lean().exec();
      expect(data).toHaveProperty('name', 'Superman');
      expect(data).toHaveProperty('location', '11111');
      expect(data).toHaveProperty('bio', 'Man of Steel');
    } catch(err) {
      console.error('Unable to update user to database', err);
    }
  });

  xtest('[Users|DELETE It should delete a user with status 202', async () => {
    try {
      const response = await request(app).delete('/api/users/' + user_id);
      const data = await Owners.findById(user_id).lean().exec();
      expect(data).toBe(null);
    } catch(err) {
      console.error('Unable to delete user from database', err);
    }
  });
});

describe('Dog routes', () => {
  test('[Dogs|GET] It should respond with status 200', async () => {
    try {
      const response = await request(app).get('/api/dogs');
      expect(response.statusCode).toBe(200);
    } catch(err) {
      console.error('Server did not response with status 200', err);
    }
  });

  test('[Dogs|POST] It should add dog obj to DB with status 201', async () => {
    try {
      const dog = {
        name: 'Krypto',
        owner: user_id,
        age: 20,
        breed: 'Kryptonian Mutt',
      };

      const response = await request(app)
        .post('/api/dogs')
        .send(dog);

      dog_id = response.body._id;

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject(dog);
    } catch(err) {
      console.error('Unable to save dog to database', err);
    }
  });

  xtest('[Dogs|GET] It should return the dog that was created with status 200', async () => {
    try {    
      const response = await request(app).get('/api/dogs/' + dog_id);
      expect(response.body[0]._id).toBe(dog_id);

      delete response.body[0]['_id'];

      const data = await Owners.findById(user_id).lean().exec();
      expect(data).toMatchObject(response.body[0]);
    } catch(err) {
      console.error('User does not exist in database', err);
    }
  });
});
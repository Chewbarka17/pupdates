const request = require('supertest');
const app = require('../server');
const db = require('../../db/index');
const mongoose = require('mongoose');

let id;

describe('Users routes', () => {
  test('[Users|GET] It should respond with status 200', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
  });

  test('[Users|POST] It should add user obj to DB with status 201', async () => {
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

    id = response.body._id;

    db.Owners.findById(id).lean().exec()
      .then(data => {
        expect(data).toMatchObject(owner);
      })
      .catch(err => {
        console.log('Did not find Owner.', err);
      });
  });

  test('[Users|GET] It should return the user that was created with status 200', async () => {
    const response = await request(app).get('/api/users/' + id);
    expect(response.body[0]._id).toBe(id);

    delete response.body[0]['_id'];
    db.Owners.findById(id).lean().exec()
      .then(data => {
        expect(data).toMatchObject(response.body[0]);
      })
      .catch(err => {
        console.log('Did not find Owner.', err);
      });
  });

  test('[Users|PATCH] It should update a user field with status 201', async () => {
    const owner = {
      id: id,
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
    response = await request(app).get('/api/users/' + id);

    expect(response.body[0]).toHaveProperty('name', 'Superman');
    expect(response.body[0]).toHaveProperty('location', '11111');
    expect(response.body[0]).toHaveProperty('bio', 'Man of Steel');

    db.Owners.findById(id).lean().exec()
      .then(data => {
        expect(data).toHaveProperty('name', 'Superman');
        expect(data).toHaveProperty('location', '11111');
        expect(data).toHaveProperty('bio', 'Man of Steel');
      })
      .catch(err => {
        console.log('Did not find Owner.', err);
      });

  });

  test('[Users|DELETE It should delete a user with status 202', async () => {
    const response = await request(app).delete('/api/users/' + id);

    db.Owners.findById(id).lean().exec()
      .then(data => {
        expect(data).toBe(null);
      })
      .catch(err => {
        console.log('Unable to delete user. Does user exist?', err);
      });
  });

});

describe('Dog routes', () => {
  test('[Dogs|GET] It should respond with status 200', async () => {
    const response = await request(app).get('/api/dogs');
    expect(response.statusCode).toBe(200);
  });

  test('[Dogs|POST] It should add dog obj to DB with status 201', async () => {
    const dog = {
      name: 'Krypto',
      owner: id,
      age: 20,
      breed: 'Kryptonian Mutt',
    };

    const response = await request(app)
      .post('/api/dogs')
      .send(dog);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(dog);
  });
});
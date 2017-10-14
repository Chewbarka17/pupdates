const request = require('supertest');
const app = require('../server');
const db = require('../../db/index');
const mongoose = require('mongoose');

const mongodbURI = process.env.DB_JUNK;
mongoose.connect(mongodbURI, {
  useMongoClient: true,
});

describe('Users routes', () => {
  let id;
  xtest('[Users|GET] It should respond with status 200', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
  });

  test('[Users|POST] It should add user obj to DB with status 201', async () => {
    const owner = {
      name: 'Tiffany Wang',
      age: 26,
      location: '99999',
      picture: 'picture.link.com',
      bio: 'dummy bio',
      rating: 4,
    };

    const response = await request(app)
      .post('/api/users')
      .send(owner);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(owner);
    id = response.body._id;
    
  });

  test('[Users|GET] It should return the user that was created on 200', async () => {
    const response = await request(app).get('/api/users/' + id);
    expect(response.body[0]._id).toBe(id);
  });

  test('[Users|PATCH] It should update a user field on status 201', async () => {
    console.log('TEST:PATCH id: ', id);
    const owner = {
      name: 'Schmiffany',
      age: 26,
      location: '11111',
      picture: 'picture.link.com',
      bio: 'dummy bio',
      rating: 4,
    };

    let response = await request(app)
      .patch('/api/users/' + id)
      .send(owner);
    response = await request(app).get('/api/users/' + id);
    console.log('this response.body ', response.body[0]);
    // expect(response.body.name).toBe('Schmiffany');
    // expect(response.body.location).toBe('11111');
    
  });



});

xdescribe('Dog routes', () => {
  test('It should respond with status 200 on GET', async () => {
    const response = await request(app).get('/api/dogs');
    expect(response.statusCode).toBe(200);
  });

  test('It should add dog obj to DB with status 201 on POST', async () => {
    const dog = new db.Dogs({
      _id: new mongoose.Types.ObjectId(),
      name: 'snuffles',
      owner: 'Tiffany Wang',
      age: 26,
      breed: 'Samoyed',
      pictures: 'link.com',
    });

    const response = await request
  });
});
const request = require('supertest');

const API_BASE_URL = 'https://gorest.co.in/public/v1';
const ACCESS_TOKEN = 'Bearer ';  // replace with your access token

describe('GoRest API tests', () => {
  let createdUserId;
  let createdTodoId;

  it('List users', done => {
    request(API_BASE_URL)
      .get('/users')
      .set('Accept', 'application/json')
      .set('Authorization', ACCESS_TOKEN)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Create user', done => {
    const data = {
      name: 'Tenali Ramakrishna',
      gender: 'male',
      email: 'test' + Date.now().toString() + '@test.com',
      status: 'inactive'
    };

    request(API_BASE_URL)
      .post('/users')
      .send(data)
      .set('Accept', 'application/json')
      .set('Authorization', ACCESS_TOKEN)
      .expect('Content-Type', /json/)
      .expect(201, (err, res) => {
        if (err) {
          return done(err);
        }
        createdUserId = res.body.data.id;
        done();
      });
  });

  it('Update user', done => {
    const data = {
      name: 'Updated Name',
      status: 'active'
    };

    request(API_BASE_URL)
      .patch(`/users/${createdUserId}`)
      .send(data)
      .set('Accept', 'application/json')
      .set('Authorization', ACCESS_TOKEN)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Get todos for user', done => {
    request(API_BASE_URL)
      .get(`/users/${createdUserId}/todos`)
      .set('Accept', 'application/json')
      .set('Authorization', ACCESS_TOKEN)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Create todo for user', done => {
    const data = {
      user_id: createdUserId,
      title: 'New Todo' + Date.now().toString(),
      due_on: '2023-11-11T00:00:00.000+05:30',
      status: 'pending'
    };

    request(API_BASE_URL)
      .post('/todos')
      .send(data)
      .set('Accept', 'application/json')
      .set('Authorization', ACCESS_TOKEN)
      .expect('Content-Type', /json/)
      .expect(201, (err, res) => {
        if (err) {
          return done(err);
        }
        createdTodoId = res.body.data.id;
        done();
      });
  });

  it('Update todo for user', done => {
    const data = {
      title: 'Updated Todo',
      status: 'completed'
    };

    request(API_BASE_URL)
      .patch(`/todos/${createdTodoId}`)
      .send(data)
      .set('Accept', 'application/json')
      .set('Authorization', ACCESS_TOKEN)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Delete todo for user', done => {
    request(API_BASE_URL)
      .delete(`/todos/${createdTodoId}`)
      .set('Accept', 'application/json')
      .set('Authorization', ACCESS_TOKEN)
      .expect(204, done);
  });

  it('Delete user', done => {
    request(API_BASE_URL)
      .delete(`/users/${createdUserId}`)
      .set('Accept', 'application/json')
      .set('Authorization', ACCESS_TOKEN)
      .expect(204, done);  // Successful DELETE requests return HTTP 204 No Content
  });

});
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('backend express testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  //test 1 show list of restaurants
  it('GET list of all restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants')
    expect(res.body.length).toEqual(4);
  })

  afterAll(() => {
    pool.end();
  });
});

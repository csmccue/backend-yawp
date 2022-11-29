const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

// // Dummy user for testing
// const mockUser = {
//   firstName: 'Test',
//   lastName: 'User',
//   email: 'test@example.com',
//   password: '12345',
// };

// const registerAndLogin = async (userProps = {}) => {
//   const password = userProps.password ?? mockUser.password;

//   // Create an "agent" that gives us the ability
//   // to store cookies between requests in a test
//   const agent = request.agent(app);

//   // Create a user to sign in with
//   const user = await UserService.create({ ...mockUser, ...userProps });

//   // ...then sign in
//   const { email } = user;
//   await agent.post('/api/v1/users/sessions').send({ email, password });
//   return [agent, user];
// };

describe('backend express testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  //test 1 show list of restaurants
  it('GET list of all restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.body.length).toEqual(4);
  });

  //test 2 show list of restaurant by id
  it('GET specific restaurant by id', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    const test = {
      id: '1',
      name: 'Pip\'s Original',
      cuisine: 'American',
      cost: 1,
      image: 'https://media-cdn.tripadvisor.com/media/photo-o/05/dd/53/67/an-assortment-of-donuts.jpg',
      website: 'http://www.PipsOriginal.com',
    };
    expect(res.body).toEqual(test);
  });

  //test 3 show list of restaurant by id
  it('GET specific restaurant by id WITH NESTED COMMENTS', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    const test = {
      id: '1',
      name: 'Pip\'s Original',
      cuisine: 'American',
      cost: 1,
      image: 'https://media-cdn.tripadvisor.com/media/photo-o/05/dd/53/67/an-assortment-of-donuts.jpg',
      website: 'http://www.PipsOriginal.com',
    };
    expect(res.body).toEqual(test);
  });

  afterAll(() => {
    pool.end();
  });
});

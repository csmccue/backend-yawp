const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('backend express testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  //test 1 show list of restaurants
  it('GET list of all restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.body.length).toEqual(4);
  });

  //test 2 show list of restaurant by id with nested reviews
  it('GET specific restaurant by id', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "cost": 1,
        "cuisine": "American",
        "id": "1",
        "image": "https://media-cdn.tripadvisor.com/media/photo-o/05/dd/53/67/an-assortment-of-donuts.jpg",
        "name": "Pip's Original",
        "reviews": Array [
          Object {
            "detail": "Best restaurant ever!",
            "id": "1",
            "restaurant_id": "1",
            "stars": 5,
            "user_id": "1",
          },
          Object {
            "detail": "Terrible service :(",
            "id": "2",
            "restaurant_id": "1",
            "stars": 1,
            "user_id": "2",
          },
          Object {
            "detail": "It was fine.",
            "id": "3",
            "restaurant_id": "1",
            "stars": 4,
            "user_id": "3",
          },
        ],
        "website": "http://www.PipsOriginal.com",
      }
    `);
  });

  //test 3 creates new review
  it('POST create new review', async () => {
    const [agent, user] = await registerAndLogin();
    console.log(user.id);
    const newReview = {
      restaurant_id: 3,
      user_id: user.id,
      stars: 2,
      detail: 'pretty trash',
    };
    const res = await agent
      .post('/api/v1/restaurants/3/reviews')
      .send(newReview);
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "detail": "pretty trash",
        "id": "4",
        "restaurant_id": "3",
        "stars": 2,
        "user_id": "4",
      }
    `);
  });

  afterAll(() => {
    pool.end();
  });
});

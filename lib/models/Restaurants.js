const pool = require('../utils/pool');
const { Review } = require('./Reviews');

class Restaurant {
  id;
  name;
  cuisine;
  cost;
  image;
  website;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cuisine = row.cuisine;
    this.cost = row.cost;
    this.image = row.image;
    this.website = row.website;
  }

  static async getAllRestaurants() {
    const { rows } = await pool.query('SELECT * from restaurants');
    return rows.map((newRow) => new Restaurant(newRow));
  }

  static async getRestaurantByID(id) {
    const { rows } = await pool.query('SELECT * from restaurants where id = $1', [id]);
    if (!rows[0]) return null;
    return new Restaurant(rows[0]);
  }

  async addReviews() {
    const { rows } = await pool.query('SELECT * from reviews where restaurant_id = $1', [this.id]);
    this.reviews = rows.map((row) => new Review(row));
  }

  static async insertReview({ restaurantID, userID, detail }) {
    const { rows } = await pool.query(`INSERT INTO reviews * (restaurant_id, user_id, detail)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [restaurantID, userID, detail]
    );
    return new Review(rows[0]);
  }
} 

module.exports = { Restaurant };


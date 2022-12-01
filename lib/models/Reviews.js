const pool = require('../utils/pool');

class Review {
  id;
  user_id;
  restaurant_id;
  stars;
  detail;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.restaurant_id = row.restaurant_id;
    this.stars = row.stars;
    this.detail = row.detail;
  }

  static async getReviews() {
    const { rows } = await pool.query('SELECT * from reviews');
    return rows.map((newRow) => new Review(newRow));
  }

  static async getReviewByID(id) {
    const { rows } = await pool.query('SELECT * from reviews where id = $1', [id]);
    if (!rows[0]) return null;
    return new Review(rows[0]);
  }

  static async insertReview({ restaurantID, userID, stars, detail }) {
    console.log('restID', restaurantID);
    const { rows } = await pool.query(`INSERT INTO reviews (restaurant_id, user_id, stars, detail)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [restaurantID, userID, stars, detail]
    );
    return new Review(rows[0]);
  }
  
} 

module.exports = { Review };


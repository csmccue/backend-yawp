const { Router } = require('express');
const { Restaurant } = require('../models/Restaurants');
const { Review } = require('../models/Reviews');



module.exports = Router() 
  .get('/', async (req, res, next) => {
    try {
      const places = await Restaurant.getAllRestaurants();
      const filtered = places.map(({
        id,
        name,
        cuisine,
        cost,
        image,
        website
      }) => ({
        id,
        name,
        cuisine,
        cost,
        image,
        website
      }));
      res.json(filtered);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const place = await Restaurant.getRestaurantByID(req.params.id);
      await place.addReviews();
      if (!place) next();
      res.json(place);
    } catch(e) {
      next(e);
    } 
  }) 

  .post('/:id/reviews', async (req, res, next) => {
    try {
      const newReview = await Review.insertReview({ 
        restaurantID: req.params.id,
        userID: req.user.id,
        detail: req.body.detail,
      });
      if (!newReview) next();
      res.json(newReview);
    } catch(e) {
      next(e);
    }


  }) 
  
  

;

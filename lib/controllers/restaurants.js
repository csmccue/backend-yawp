const { Router } = require('express');
const { Restaurant } = require('../models/Restaurants');



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
      if (!place) next();
      res.json(place);
    } catch(e) {
      next(e);
    }
  }) 
  
  
  
  
  
  
  
  
;

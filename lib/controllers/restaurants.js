const { Router } = require('express');
const { Restaurant } = require('../models/Restaurants');



module.exports = Router() 
  .get('/', async (req, res, next) => {
    try {
      const places = await Restaurant.getAll();
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
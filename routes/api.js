const express = require('express');
const { getAllItems } = require('../controllers/itemsController');
const { getAllLocations } = require('../controllers/locationsController');

const router = express.Router();

// Route to get all items
router.get('/items', getAllItems);

// Route to get all locations
router.get('/locations', getAllLocations);

module.exports = router;

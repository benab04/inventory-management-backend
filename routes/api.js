const express = require('express');
const { getAllItems } = require('../controllers/itemsController');
const { getAllLocations } = require('../controllers/locationsController');
const { updateItem } = require('../controllers/itemsController');

const router = express.Router();

// Route to get all items
router.get('/items', getAllItems);
router.post("/item/:id", updateItem)
// Route to get all locations
router.get('/locations', getAllLocations);

module.exports = router;

const express = require('express');
const { getAllItems, updateItemLocation } = require('../controllers/itemsController');
const { getAllLocations } = require('../controllers/locationsController');
const { updateItem } = require('../controllers/itemsController');
const Item = require('../models/items');
const { getAllCategories } = require('../controllers/itemsController');
const Fuse = require('fuse.js');

const router = express.Router();

// Route to get all items
router.get('/items', getAllItems);
router.post("/item/:id", updateItem)
router.post("/update-location", updateItemLocation);
router.get("/items/search", async (req, res) => {
    try {
        const { query, category } = req.query;

        const filter = {};
        if (category && category !== "all") {
            filter.category = category; // Filter by category if specified
        }

        // Fetch all items based on category filter
        let items = await Item.find(filter);

        // Create a Fuse instance with options
        const fuse = new Fuse(items, {
            keys: ['name'], // Fields to search in
            threshold: 0.3, // Adjust for fuzziness, 0.0 means exact match, 1.0 means no match
        });

        // Perform the fuzzy search
        const results = fuse.search(query);

        // Extract the matched items
        const matchedItems = results.map(result => result.item);

        res.json(matchedItems);
    } catch (error) {
        console.error("Error searching items:", error);
        res.status(500).send("Server error");
    }
});



// Route to get all locations
router.get('/locations', getAllLocations);


router.get("/categories", getAllCategories);


module.exports = router;

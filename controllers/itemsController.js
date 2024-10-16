const Item = require('../models/items');

// Controller to get all items
const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
};


const updateItem = async (req, res) => {
    try {
        const item = await Item.findOne({ item_id: req.params.id });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Update item fields with the incoming request body data
        Object.assign(item, req.body);

        // Save the updated item
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getAllItems, updateItem };

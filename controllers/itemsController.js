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

const getAllCategories = async (req, res) => {
    try {
        const categories = await Item.distinct("category"); // Assuming 'category' is the field in your Item schema
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateItemLocation = async (req, res) => {
    try {
        const { item_id, new_godown_id } = req.body;
        console.log(item_id, new_godown_id);

        // Validate input
        if (!item_id || !new_godown_id) {
            return res.status(400).json({ message: "Item ID and new Godown ID are required." });
        }

        // Find and update the item
        const updatedItem = await Item.findOneAndUpdate(
            { item_id }, // Filter by item_id
            { godown_id: new_godown_id }, // Update the godown_id
            { new: true } // Return the updated item
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found." });
        }

        res.status(200).json({ message: "Item location updated successfully.", item: updatedItem });
    } catch (error) {
        console.error("Error updating item location:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { getAllItems, updateItem, getAllCategories, updateItemLocation };

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
        const item_id = req.params.id;
        const new_item = req.body;

        await Item.findOneAndUpdate({ item_id: item_id }, new_item)
        res.status(200).json({ "Success": "Item updated successfully" });

    } catch (error) {
        console.log("Error updating item", error);
        res.status(500).json({ "Error": "Something went wrong" });

    }
}

module.exports = { getAllItems, updateItem };

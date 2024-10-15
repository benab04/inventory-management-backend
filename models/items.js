const mongoose = require("mongoose");

// Define the schema
const itemSchema = new mongoose.Schema({
    item_id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['in_stock', 'out_of_stock', 'discontinued'], // Status options
        default: 'in_stock',
    },
    godown_id: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    attributes: {
        type: Map, // Allow dynamic key-value pairs for attributes
        of: String, // Each attribute can be a string or modify to allow other types
    },
    image_url: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

// Create the model
const Item = mongoose.model("items", itemSchema);

module.exports = Item;

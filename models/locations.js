const mongoose = require("mongoose")
// Define the schema for a location
const locationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    parent_godown: {
        type: String,
        default: null,
    }
}, { timestamps: true });

// Create the model
const Location = mongoose.model("locations", locationSchema);

module.exports = Location
const mongoose = require('mongoose');

// Define a schema and model for the map items
const itemSchema = new mongoose.Schema({
    lat: Number,
    lon: Number,
    name: String
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
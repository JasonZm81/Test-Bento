const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;

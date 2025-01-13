const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const Item = require('../models/Items');

// Root route
router.get('/', (req, res) => {
    res.send('Welcome to the Address and Item API'); // Simple message for the root route
});

// API endpoint to retrieve all addresses
router.get('/test/addresses', async (req, res) => {
    try {
        const addresses = await Address.find(); // Fetch all addresses from the database
        res.status(200).json(addresses); // Send the addresses as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching addresses' });
    }
});

// API endpoint to retrieve all items
router.get('/test/items', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items from the database (use Item model)
        res.status(200).json(items); // Send the items as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items' });
    }
});

module.exports = router;

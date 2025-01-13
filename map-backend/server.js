require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Address = require('./models/Address');
const Item = require('./models/Items');
const addressRoutes = require('./routes/addressRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000', // Ensure this matches your frontend URL
    'https://your-frontend-domain.com',
    'https://testing-75857.web.app'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Middleware
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// API endpoint to save a new item
app.post('/api/items', async (req, res) => {
    const newItem = new Item(req.body);
    try {
        const savedItem = await newItem.save();
        console.log('Saved item:', savedItem);
        res.status(201).send(savedItem);
    } catch (error) {
        console.error('Error saving item:', error);
        res.status(400).send(error);
    }
});

// API endpoint to save a new address
app.post('/test/addresses', async (req, res) => {
    const newAddress = new Address(req.body);
    try {
        const savedAddress = await newAddress.save();
        console.log('Saved address:', savedAddress);
        res.status(201).send({ message: 'Address saved successfully!', savedAddress });
    } catch (error) {
        console.error('Error saving address:', error);
        res.status(400).send(error);
    }
});

// API endpoint to retrieve all items
app.get('/test/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to get addresses
app.get('/test/addresses', async (req, res) => {
    try {
        const addresses = await Address.find(); // Fetch all addresses from the database
        res.json(addresses); // Send the addresses as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching addresses' });
    }
});

app.use('/test/addresses', addressRoutes);

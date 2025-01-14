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
    'http://localhost:3000',
    'http://localhost:3000/mapitem', // Ensure this matches your frontend URL
    'https://testing-75857.web.app',
    'https://testing-75857.web.app/mapitem',
    'https://71a0-2001-f40-970-254a-8481-ad99-4d93-bcea.ngrok-free.app',
    'https://71a0-2001-f40-970-254a-8481-ad99-4d93-bcea.ngrok-free.app/test/addresses'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
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

// DB API endpoint to save a new item
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

// DB API endpoint to save a new address
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

// DB API endpoint to retrieve all items
app.get('/test/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

// DB API endpoint to retrieve addresses
app.get('/test/addresses', async (req, res) => {
    try {
        const addresses = await Address.find(); // Fetch all addresses from the database
        res.json(addresses); // Send the addresses as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching addresses' });
    }
});

app.delete('/test/addresses/:id', async (req, res) => {
    const id = req.params.id;
    console.log(`Attempting to delete address with ID: ${id}, print from api path`);
    try {
        const address = await Address.findByIdAndDelete(id);
        if (address) {
            res.status(200).json({ message: 'Address deleted successfully' });
        } else {
            res.status(404).json({ error: 'Address not found. Print frm api path' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting address' });
    }
});

app.use('/test/addresses', addressRoutes);

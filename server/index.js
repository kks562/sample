    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');

    const app = express();
    const port = 3000;
    // Middleware
    app.use(cors());
    app.use(express.json());

    // Connect to MongoDB
    mongoose.connect('mongodb+srv://root1:root1@cluster0.3xlkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

    // Define Schema and Model
    const DataSchema = new mongoose.Schema({
    name: String,
    });

    const DataModel = mongoose.model('Data', DataSchema);

    // POST route to save data
    app.post('/api/data', async (req, res) => {
    try {
        const newData = new DataModel({ name: req.body.name });
        await newData.save();
        res.status(201).json({ message: 'Data saved successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    });

    // GET route to retrieve all data
    app.get('/api/data', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    });

    // Start server
    app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    });

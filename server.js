const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static(__dirname));

// API endpoints
app.get('/api/governorates', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'state-municipality.json'), 'utf8'));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load governorates data' });
    }
});

app.get('/api/governorates/:governorate', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'state-municipality.json'), 'utf8'));
        const governorate = data.find(g => g.Value.toLowerCase() === req.params.governorate.toLowerCase());
        
        if (!governorate) {
            return res.status(404).json({ error: 'Governorate not found' });
        }
        
        res.json(governorate);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load governorate data' });
    }
});

app.get('/api/boundaries', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'syria_administrative_province_state_boundary.geojson'), 'utf8'));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load boundary data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
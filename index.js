const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Load pregnancy data
let pregnancyData = [];
try {
  pregnancyData = JSON.parse(fs.readFileSync('pregnancyData.json', 'utf8'));
} catch (error) {
  console.error('Error loading pregnancy data:', error);
}

// Get all weeks data
app.get('/api/weeks', (req, res) => {
  res.json(pregnancyData);
});

// Get specific week data
app.get('/api/weeks/:week', (req, res) => {
  const weekNumber = parseInt(req.params.week);
  const weekData = pregnancyData.find(data => data.week === weekNumber);
  
  if (!weekData) {
    return res.status(404).json({ error: 'Week not found' });
  }
  
  res.json(weekData);
});

// Get trimester data
app.get('/api/trimester/:trimester', (req, res) => {
  const trimester = parseInt(req.params.trimester);
  if (trimester < 1 || trimester > 3) {
    return res.status(400).json({ error: 'Invalid trimester number' });
  }

  const startWeek = (trimester - 1) * 13 + 1;
  const endWeek = trimester * 13;
  const trimesterData = pregnancyData.filter(data => 
    data.week >= startWeek && data.week <= endWeek
  );

  res.json(trimesterData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
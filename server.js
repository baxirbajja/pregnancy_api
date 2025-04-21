const express = require('express');
const cors = require('cors');
const pregnancyData = require('./pregnancyData.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for mobile app access
app.use(cors());

// Get all pregnancy data
app.get('/api/pregnancy', (req, res) => {
  res.json(pregnancyData);
});

// Get specific week data
app.get('/api/pregnancy/week/:weekNumber', (req, res) => {
  const weekNumber = parseInt(req.params.weekNumber);
  const weekData = pregnancyData.find(data => data.week === weekNumber);

  if (!weekData) {
    return res.status(404).json({ error: 'Week not found' });
  }

  res.json(weekData);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
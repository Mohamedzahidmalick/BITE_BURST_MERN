require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoDB = require('./db'); // MongoDB connection function

// Connect to MongoDB
mongoDB();
//console.log(process.env.MONGO_URI);
// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); // To parse incoming JSON requests

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

// Default route
app.get('/', (req, res) => {
  res.send('Hello from backend server!');
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


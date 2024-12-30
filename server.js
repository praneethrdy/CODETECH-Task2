const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const postRoutes = require('./routes/postRoutes'); // Import the routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Environment Variable Validation
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in .env file');
  process.exit(1); // Exit the application
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(`MongoDB connection error: ${err.message}`));

// Use the routes for the blog posts
app.use('/api', postRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the MERN Blog App');
});

// Set port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

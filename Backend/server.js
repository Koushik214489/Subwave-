require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection function
async function connectdb() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
}

// Start the server after DB connection
connectdb()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start server only after MongoDB connects
mongoose.connection.once('open', () => {
  app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
  });
});
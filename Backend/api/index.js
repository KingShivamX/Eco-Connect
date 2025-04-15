const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('../routes/auth');
const postRoutes = require('../routes/posts');
const eventRoutes = require('../routes/events');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (as you have)
mongoose.connect(process.env.MONGODB_URI, { /* options */ })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/events', eventRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('🌿 EcoConnect API is running');
});

// Do NOT start the server when deploying to Vercel
// Instead, export the app for serverless deployment
module.exports = app;

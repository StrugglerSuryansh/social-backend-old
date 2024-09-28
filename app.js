const express = require('express');
const mongoose = require('mongoose');
const contentRoutes = require('./routes/content');
const schedulerRoutes = require('./routes/scheduler');
const analyticsRoutes = require('./routes/analytics');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(express.json());

// Routes
app.use('/api/content', contentRoutes);
app.use('/api/scheduler', schedulerRoutes);
app.use('/api/analytics', analyticsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
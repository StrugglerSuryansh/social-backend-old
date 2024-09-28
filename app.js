require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const contentRoutes = require('./routes/content');
const analyticsRoutes = require('./routes/analytics');
const schedulerRoutes = require('./routes/schedulerRoutes');
const cronJob = require('./cronJob'); // Import the cron job to start it
const cors = require("cors");
app.use(cors());

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/scheduler', schedulerRoutes);

async function main(){
  await mongoose.connect("mongodb+srv://lomashchoudhary9812:9808268065@cluster0.7nv44.mongodb.net/scroll-hacks")
  app.listen(PORT, () => {  
    console.log("app is listening on port:", PORT)
  })
}

main()
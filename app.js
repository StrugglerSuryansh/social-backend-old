const express = require('express');
const mongoose = require("mongoose");
const contentRoutes = require('./routes/content');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);


async function main(){
  await mongoose.connect("mongodb+srv://lomashchoudhary9812:9808268065@cluster0.7nv44.mongodb.net/scroll-hacks")
  app.listen(PORT, () => {  
    console.log("app is listening on port:", PORT)
  })
}

main()
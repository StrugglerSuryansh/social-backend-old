const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  scheduledFor: { type: Date, required: true },
  postedAt: Date, // Will store the time when the post was published
  platforms: [String], // Platforms like ['twitter', 'facebook']
  engagement: {
    likes: Number,
    shares: Number,
    comments: Number,
  },
});

module.exports = mongoose.model('Content', ContentSchema);

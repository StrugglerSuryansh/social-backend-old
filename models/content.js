const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  scheduledFor: Date,
  postedAt: Date,
  engagement: {
    likes: Number,
    shares: Number,
    comments: Number,
  },
});

module.exports = mongoose.model('Content', ContentSchema);
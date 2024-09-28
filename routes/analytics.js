const express = require('express');
const router = express.Router();
const Content = require('../models/content');

router.get('/', async (req, res) => {
  try {
    // Count the total number of posts
    const totalPosts = await Content.countDocuments();

    // If there are no posts, engagement rate is zero
    if (totalPosts === 0) {
      return res.json({ totalPosts: 0, engagementRate: 0 });
    }

    // Aggregate total likes, comments, and shares from the 'engagement' object
    const allContent = await Content.aggregate([
      {
        $group: {
          _id: null, // Group all documents
          totalLikes: { $sum: "$engagement.likes" },
          totalComments: { $sum: "$engagement.comments" },
          totalShares: { $sum: "$engagement.shares" }
        }
      }
    ]);

    // Extract totals from the aggregation result
    const { totalLikes, totalComments, totalShares } = allContent[0];

    // Calculate the total interactions
    const totalInteractions = totalLikes + totalComments + totalShares;

    // Calculate the engagement rate (total interactions per post)
    const engagementRate = (totalInteractions / totalPosts).toFixed(2);

    // Respond with total posts and engagement rate
    res.json({ totalPosts, engagementRate });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching analytics' });
  }
});

module.exports = router;
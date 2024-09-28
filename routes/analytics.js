const express = require('express');
const router = express.Router();
const Content = require('../models/content');

//get all the anaytics
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

//summary route
router.get('/summary', async (req, res) => {
  try {
    // Example analytics: total contents, most popular content, average engagement
    const totalContents = await Content.countDocuments(); // Get total number of content
    const mostPopularContent = await Content.findOne().sort({ engagement: -1 }).exec(); // Find content with highest engagement (sort by engagement)
    
    // Get average engagement across all content
    const averageEngagementResult = await Content.aggregate([
      {
        $group: {
          _id: null,
          avgEngagement: { $avg: "$engagement" } // Assuming there's an 'engagement' field in your Content model
        }
      }
    ]);

    const averageEngagement = averageEngagementResult[0]?.avgEngagement || 0; // Handle empty content case

    // Respond with the analytics summary
    res.json({
      totalContents,
      mostPopularContent,
      averageEngagement
    });

  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    res.status(500).json({ error: 'Error fetching analytics summary' });
  }
});


module.exports = router;
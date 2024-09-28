const express = require('express');
const router = express.Router();
const Content = require('../models/content');
const cron = require('node-cron'); // Job scheduler
const { postToTwitter } = require('../services/twitterService'); // Import Twitter service

// Helper function to parse "dd-mm-yyyy" into a Date object
function parseDateString(dateString) {
  const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
  const match = dateString.match(regex);
  
  if (match) {
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Months are 0-based in JavaScript
    const year = parseInt(match[3], 10);
    
    // Create and return a Date object
    return new Date(year, month, day);
  }

  // Return null if the date format is invalid
  return null;
}

// POST /api/scheduler/schedule: Schedule a post
router.post('/schedule', async (req, res) => {
  try {
    const { contentId, scheduledFor, platforms } = req.body;

    // Validate request data
    if (!contentId || !scheduledFor || !platforms) {
      return res.status(400).json({ error: 'Content ID, scheduled date, and platforms are required' });
    }

    // Parse and validate the scheduledFor date (in dd-mm-yyyy format)
    const postDate = parseDateString(scheduledFor);
    if (!postDate || isNaN(postDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Use dd-mm-yyyy.' });
    }

    // Find content by its ID
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Update content with scheduling info
    content.scheduledFor = postDate;
    content.platforms = platforms; // Platforms like ['twitter', 'facebook']
    await content.save();

    const currentDate = new Date();

    if (postDate > currentDate) {
      // Schedule for the future using node-cron
      const cronTime = `${postDate.getMinutes()} ${postDate.getHours()} ${postDate.getDate()} ${postDate.getMonth() + 1} *`;
      cron.schedule(cronTime, async () => {
        // Post to each platform
        await postToPlatforms(content);
      });
    } else {
      // If the time has already passed, post immediately
      await postToPlatforms(content);
    }

    res.json({ message: 'Post scheduled successfully', content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error scheduling the post' });
  }
});

// GET /api/scheduler/scheduled: Get all scheduled posts
router.get('/scheduled', async (req, res) => {
  try {
    // Fetch all content that hasn't been posted yet (postedAt is null)
    const scheduledPosts = await Content.find({ postedAt: null });
    res.json(scheduledPosts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching scheduled posts' });
  }
});

// Helper function to post content to multiple platforms
async function postToPlatforms(content) {
  try {
    const platforms = content.platforms;

    // Post to Twitter if 'twitter' is included in platforms
    if (platforms.includes('twitter')) {
      await postToTwitter(content.text); // Use Twitter service to post
    }

    // Additional platform integrations can be added here, e.g., Facebook, Instagram, etc.

    // Update the postedAt time after posting
    content.postedAt = new Date();
    await content.save();

    console.log('Post successfully published on platforms:', platforms);
  } catch (error) {
    console.error('Error posting to platforms:', error);
  }
}

module.exports = router;

const cron = require('node-cron');
const Content = require('./models/content');
const { postToTwitter } = require('./services/twitterService');
// Add other platform services as needed (Facebook, LinkedIn, etc.)

// Cron job to check for scheduled posts every minute
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    
    // Find posts that are scheduled and not yet posted
    const scheduledPosts = await Content.find({
      scheduledFor: { $lte: now },
      postedAt: null
    });

    for (const post of scheduledPosts) {
      if (post.platforms.includes('twitter')) {
        const twitterResponse = await postToTwitter(post.text);
        console.log('Posted to Twitter:', twitterResponse);
      }

      // Add additional platforms (e.g., Facebook, LinkedIn, etc.) here

      // Mark the post as posted
      post.postedAt = now;
      await post.save();
    }
  } catch (error) {
    console.error('Error in scheduled post job:', error);
  }
});

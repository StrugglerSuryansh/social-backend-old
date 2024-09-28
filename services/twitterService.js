const Twit = require('twit');

const twitterClient = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function postToTwitter(content) {
  try {
    const response = await twitterClient.post('statuses/update', { status: content });
    return response.data;
  } catch (error) {
    console.error('Error posting to Twitter:', error);
    throw error;
  }
}

module.exports = { postToTwitter };

require('dotenv').config();
const axios = require('axios');
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function getRandomQuote() {
  try {
    // Use ZenQuotes API
    const response = await axios.get('https://zenquotes.io/api/random');
    if (response.status === 200) {
      return response.data[0].q; // Return the quote
    } else {
      throw new Error('Failed to fetch the quote');
    }
  } catch (error) {
    console.error('Error fetching quote:', error);
    return 'Quote not available'; // Default message if fetching fails
  }
}

async function postTweet(tweetText) {
  try {
    const { data } = await client.v2.tweet(tweetText);
    console.log('Successfully tweeted:', data);
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

(async function () {
  const quote = await getRandomQuote();
  console.log('Fetched Quote:', quote); // Optional: print the fetched qu>  postTweet(quote); // Post the fetched quote as a tweet
})();

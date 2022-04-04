const needle = require('needle');

// for now we're querying the most recent tweets
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";
const token = "AAAAAAAAAAAAAAAAAAAAADOOawEAAAAAJ3y3WbTi4hwFxW3PxWUHVINx1dk%3DE64YEkGaST3ts9WfrA2sq9h5Fe8mYTUzjYO021aaN0qLoA2DvR";

// retrieves 10 tweets at a time that contains "#{keyword}"
// all 10 tweets include an image URL
const getTweets = async (req, res) => {
    console.log("Get tweets!");

    const keyword = req.params.hashtag;

    // by default, only the Tweet ID and text fields are returned
    const params = {
        'query': `#${keyword} -is:retweet has:media has:images`,
        'media.fields': 'url',
        'expansions': 'attachments.media_keys',
    }

    const tweets = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    });

    if (tweets.body) {
        return res.status(200).json(tweets.body);
    } else {
        return res.status(404).json("Invalid disease name provided");
    }


};

module.exports = {
    getTweets,
};

const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = "AAAAAAAAAAAAAAAAAAAAADOOawEAAAAAJ3y3WbTi4hwFxW3PxWUHVINx1dk%3DE64YEkGaST3ts9WfrA2sq9h5Fe8mYTUzjYO021aaN0qLoA2DvR";

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getRequest() {

    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
    const params = {
        'query': '#disease -is:retweet has:media has:images',
        'media.fields': 'url',
        'expansions': 'attachments.media_keys',
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

(async () => {

    try {
        // Make request
        const response = await getRequest();
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();


module.exports = {
    getRequest,
  };
const express = require("express");
const router = express.Router();

// Controller functions
const { getTweets } = require("../controllers/twitterController");

router.get("/:hashtag", getTweets);

module.exports = router;
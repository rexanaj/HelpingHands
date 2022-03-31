const express = require("express");
const router = express.Router();

// Controller functions
const { getRequest } = require("../controllers/twitterController");

router.get("/", getRequest);

module.exports = router;
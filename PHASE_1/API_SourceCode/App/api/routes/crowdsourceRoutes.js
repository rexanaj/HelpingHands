const express = require("express");
const router = express.Router();

// Controller functions
const { getPosts, makePost } = require("../controllers/crowdsourceController");

router.get("/:disease", getPosts);
router.post("/makePost", makePost);

module.exports = router;
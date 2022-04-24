const express = require("express");
const router = express.Router();

// Controller functions
const {
  getPosts,
  makePost,
  upvotePost,
  downvotePost,
} = require("../controllers/crowdsourceController");

router.get("/:disease", getPosts);
router.post("/makePost", makePost);
router.post("/upvotePost", upvotePost);
router.post("/downvotePost", downvotePost);

module.exports = router;

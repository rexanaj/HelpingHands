require("../../firebase/firebase"); // Initialises the database
const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();
const { addLog } = require("../../helper/log");

const getPosts = async (req, res) => {
  console.log("Calling get posts");

  // Database query in collection quotes
  var query = await db.collection("posts");
  const disease = req.params.disease;
  console.log("disease: " + disease);
  query = query.where("disease", "==", disease);
  // Make the query to the database, only 10 so far
  const postsRef = await query.limit(10).get();
  var posts = [];

  postsRef.forEach((doc) => {
    var data = doc.data();
    data["id"] = doc.id;
    posts.push(data);
  });

  console.log("Number of returned posts: ", posts.length);
  res.status(200).json(addLog(posts));
};

const makePost = (req, res) => {
  // body in the form of
  /*
        {
            "name": {posterName},
            "content": {postContent}
        }
    */

  const name = req.body.name;
  const content = req.body.content;
  const disease = req.body.disease;
  const date = req.body.date;
  console.log(name);
  console.log(content);
  db.collection("posts")
    .doc()
    .set({
      name: name,
      content: content,
      disease: disease,
      date: date,
      upvotes: [],
      downvotes: [],
    })
    .then(function () {
      console.log("post added successfully!");
    })
    .catch(function (error) {
      console.error("Error writing post: ", error);
    });

  res.status(200).json({ requestBody: req.body });
};

const upvotePost = (req, res) => {
  db.collection("posts")
    .doc(req.body.id)
    .update({
      upvotes: firebaseAdmin.firestore.FieldValue.arrayUnion(req.body.uid),
      downvotes: firebaseAdmin.firestore.FieldValue.arrayRemove(req.body.uid),
    })
    .then(function () {
      console.log("upvote added successfully!");
    })
    .catch(function (error) {
      console.error("Error adding upvote: ", error);
    });

  res.status(200).json({ requestBody: req.body });
};

const downvotePost = (req, res) => {
  db.collection("posts")
    .doc(req.body.id)
    .update({
      upvotes: firebaseAdmin.firestore.FieldValue.arrayRemove(req.body.uid),
      downvotes: firebaseAdmin.firestore.FieldValue.arrayUnion(req.body.uid),
    })
    .then(function () {
      console.log("downvote added successfully!");
    })
    .catch(function (error) {
      console.error("Error adding downvote: ", error);
    });

  res.status(200).json({ requestBody: req.body });
};

module.exports = { getPosts, makePost, upvotePost, downvotePost };

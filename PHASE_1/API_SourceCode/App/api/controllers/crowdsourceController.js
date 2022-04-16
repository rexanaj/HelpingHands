require("../../firebase/firebase"); // Initialises the database
const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();
const { addLog } = require('../../helper/log');

const getPosts = async (req, res) => {
    console.log("Calling get posts");
  
    // Database query in collection quotes
    var query = await db.collection("posts");
  
    // Make the query to the database, only 10 so far
    const postsRef = await query.limit(10).get();
    var data = [];
  
    postsRef.forEach((doc) => {data.push(doc.data())})
    
    if (data.length == 0) {
      res.status(404).json("No posts found");
      return;
    }
  
    var numDocs = 0;
    data.forEach((doc) => {
      if (doc.id != undefined) {
        numDocs += 1;
      }
    })
    console.log("Number of returned posts: ", numDocs);
    res.status(200).json(addLog(data));
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
    const content = req.body.content
    console.log(name);
    console.log(content);
    db.collection("posts")
        .doc()
        .set({
          name: name,
          content: content
        })
        .then(function () {
          console.log("post added successfully!");
        })
        .catch(function (error) {
          console.error("Error writing post: ", error);
        });


    res.status(200).json({requestBody: req.body})
}
  
  module.exports = { getPosts, makePost };
  
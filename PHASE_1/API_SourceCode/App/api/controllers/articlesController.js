require('../../firebase/firebase') // Initialises the database
const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.firestore();

// Controller functions
//retrieves summaries with respect to limit parameter
const getArticles = (req, res) => {
  try {
    console.log("Getting articles equal to limit parameter provided");
    //Collect all articles from the database
    const articlesRef = await db.collection("articles").get();
    const arr = [];
    if (articleRef.empty) {
      res.status(200).json({ message: "No articles found" });
    } else {
      let count = 0;
      //Get the correct number of articles based on limit parameter
      articlesRef.foreach(function (doc) {
        while (count < req.query.limit) {
          const article = new Article(
            doc.data().title,
            doc.data().main_text
          );
          arr.push(article);
          count++;
        }
      });
      res.status(200).json({
        "Article Summaries": arr 
      });
    }
  } catch (error) {
    //check limit is parsed in parameter
    if (req.query.limit == undefined) {
      res.status(400).json("Missing limit parameter");
      return;
    }
    
    //check if parameter type is correct
    let limit = parseInt(req.query.limit);
    if (Number.isNaN(limit)) {
      res.status(400).json("Invalid parameter type");
      return;
    }
  }
};

//retrieves summaries with respect to start_date and end_date parameters
const getArticlesDate = (req, res) => {
  try {
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    console.log("Getting articles equal to start date" + start_date ,"and end date" + end_date);
    //Collect all articles from the database
    const articlesRef = await db.collection("articles").get();
    const arr = [];

    const date1 = new Date(start_date);
    const date2 = new Date(end_date);
    //Loop through all articles 
    articlesRef.forEach(function (doc) {
      //Get article summaries inbetween start date and end date parameter
      doc.data().date_of_publication.forEach(function (date) {
        const article_date = new Date(date);
        //Check if date of publication is inbetween start date and end date
        if (article_date >= start_date && article_date <= end_date) {
          const article = new Article(
            doc.data().title,
            doc.data().main_text
          );
          arr.push(article);
        }
      })
    });
    res.status(200).json({
      "Article Summaries": arr 
    });
  } catch (error) {
    //check start_date and end_date are parsed in parameter
    if (req.query.start_date == undefined || req.query.end_date == undefined) {
      res.status(400).json("Missing start_date and end_date parameter");
      return;
    }

    //check if parameter type is correct
    if (typeof req.query.start_date !== 'string' || typeof req.query.end_date !== 'string') {
      res.status(400).json("Invalid parameter type");
      return;
    }
  }
};

module.exports = { getArticles, getArticlesDate };

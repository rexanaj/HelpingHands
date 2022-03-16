require('../../firebase/firebase') // Initialises the database
const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.firestore();

const { stringToDate } = require('./timestamp');

/**
 * Ensures a 'limit' param is passed in 
 * Checks each other non-required param and if defined, adds to the query
 */

const getArticles = async (req, res) => {
  console.log("Calling get articles with these params: ", req.query);

  const limit = parseInt(req.query.limit);
  // Check limit is passed in as a param
  if (limit == undefined) {
    res.status(400).json("Missing limit parameter");
    return;
  }

  // Check if limit type is correct
  if (Number.isNaN(limit)) {
    res.status(400).json("Invalid parameter type");
    return;
  }

  // Database query
  var query = db.collection("articles");

  // Check start_date
  const startDate = req.query.start_date;
  if (startDate != undefined) {
    // Check if start date is valid 
    if (Date.parse(startDate) != NaN) {
      query = query.where("date_of_publication", ">=", stringToDate(startDate));
    } else {
      res.status(400).json({ message: "Timestamp is in an invalid format" });
      return;
    }
  }

  // Check if end date is valid 
  const endDate = req.query.end_date;
  if (endDate != undefined) {
    // Check if start date is valid
    if (Date.parse(endDate) != NaN) {
      query = query.where("date_of_publication", "<=", stringToDate(endDate));
    } else {
      res.status(400).json({ message: "Timestamp is in an invalid format" });
      return;
    }
  }

  // Check keyterms
  const keyTerms = req.query.keyterms;
  if (keyTerms != undefined) {
    // TODO: Format key terms
    // TODO: Add key terms to query 
  }

  // Check location 
  const location = req.query.location;
  if (location != undefined) {
    // TODO: Format location - check my branch for the 'capitalisestring' function and use that
    // TODO: Create a query that gets the given the locations
  }

  // Make the query to the database 
  const articlesRef = await query.orderBy('date_of_publication').limit(limit).get();
  var data = [];
  console.log("Number of returned docs: ", articlesRef.size);
  articlesRef.forEach((doc) => {
    data.push(doc.data());
  })
  res.status(200).json(data);
};

module.exports = { getArticles };

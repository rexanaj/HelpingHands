require("../../firebase/firebase"); // Initialises the database
const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

const { capitaliseString } = require('../../helper/strings');
const { addLog } = require('../../helper/log');

const getArticles = async (req, res) => {
  console.log("Calling get articles with these params: ", req.query);

  /**
   * Ensures a 'limit' param is passed in
   * Checks each other non-required param and if defined, adds to the query
   */
  const limit = parseInt(req.query.limit);
  // Check limit is passed in as a param
  if (!req.query.limit) {
    res.status(400).json("Missing limit parameter");
    return;
  }

  // Check if limit type is correct
  if (Number.isNaN(limit)) {
    res.status(400).json("Invalid parameter type");
    return;
  }

  //Check limit value is larger than 0
  if (req.query.limit <= 0) {
    res.status(400).json("Invalid parameter value");
    return;
  }
  // Database query
  var query = await db.collection("articles");

  // Check start_date
  const startDate = req.query.start_date;

  if (startDate != undefined) {
    // Check if start date is valid
    const startDateObj = new Date(startDate);
    const startMonth = startDateObj.getUTCMonth() + 1;
    const startYear = startDateObj.getUTCFullYear();
    //check correct start date format for eg. without year should be error
    if (!startMonth || !startYear) {
      res.status(400).json("Invalid start date");
      return;
    }
    query = query.where("date_of_publication", ">=", startDateObj);
  }

  // Check if end_date
  const endDate = req.query.end_date;
  if (endDate != undefined) {
    // Check if end date is valid
    const endDateObj = new Date(endDate);
    const endMonth = endDateObj.getUTCMonth() + 1;
    const endYear = endDateObj.getUTCFullYear();

    //check correct start date format for eg. without year should be error
    if (!endMonth || !endYear) {
      res.status(400).json("Invalid end date");
      return;
    }
    query = query.where("date_of_publication", "<=", endDate);
  }

  // Check keyterms
  const keyTerms = req.query.keyterms;
  if (keyTerms != undefined) {
    //Type check parameter
    if (!isNaN(keyTerms)) {
      res.status(400).json("Invalid parameter type");
      return;
    }

    // Format key terms
    const keyTermsList = keyTerms.split(",").map(capitaliseString);

    //Check that there are less than 10 key words
    if (keyTermsList.length > 10) {
      res.status(400).json("No more than 10 key terms allowed in the query");
      return;
    }

    // Loop through key terms list and find articles containing any of the key terms
    query = query.where("keywords", "array-contains-any", keyTermsList);
    if (query.empty) {
      res.status(404).json("No articles found with given key terms");
      return;
    }
  }


  // Make the query to the database
  const articlesRef = await query.limit(limit).get();
  var data = [];


  // Manual location check
  const location = req.query.location;
  if (location != undefined) {

    // Type check parameter
    if (!isNaN(req.query.location)) {
      res.status(400).json("Invalid parameter type");
      return;
    }

    // Look through query results for matching locations 
    articlesRef.forEach((doc) => {
      const locationName = capitaliseString(req.query.location);
      // For each location in each doc, check if it matches the given location
      doc.data().locations.forEach((location) => {
        if (location === locationName) {
          data.push(doc.data());
        }
      })
    });
  } else {
    articlesRef.forEach((doc) => {
      data.push(doc.data());
    })
  }

  if (data.length == 0) {
    res.status(404).json("No matching locations found");
    return;
  }

  var numDocs = 0;
  data.forEach((doc) => {
    if (doc.id != undefined) {
      numDocs += 1;
    }
  })
  console.log("Number of returned docs: ", numDocs);
  res.status(200).json(addLog(data));
};

module.exports = { getArticles };

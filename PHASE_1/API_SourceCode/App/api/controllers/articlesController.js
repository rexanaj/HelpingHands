require('../../firebase/firebase') // Initialises the database
const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.firestore();

const { stringToDate } = require('./timestamp');
const { capitaliseString } = require('../../helper/strings');

/**
 * Ensures a 'limit' param is passed in 
 * Checks each other non-required param and if defined, adds to the query
 */

const getArticles = async (req, res) => {
  console.log("Calling get articles with these params: ", req.query);

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

  // Database query
  var query = await db.collection("articles");

  // Check start_date
  const startDate = req.query.start_date;
  if (startDate != undefined) {
    // Check if start date is valid
    const startDateObj = new Date(startDate);

    const startMonth = startDateObj.getUTCMonth() + 1;
    const startYear = startDateObj.getUTCFullYear();
    console.log("Month: ", startMonth);
    console.log("Year: ", startYear);
    console.log("Date: ", startDateObj);
    //check correct start date format for eg. without year should be error
    if (!startMonth || !startYear) {
        res.status(400).json("Invalid start date");
        return;
    } 
    query = query.where("date_of_publication", ">=", stringToDate(startDate));
    //query = await query.orderBy('date_of_publication').startAt(startDateObj);
  }

  // Check if end date is valid 
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
    query = query.where("date_of_publication", "<=", stringToDate(endDate));
  }

  // Check keyterms
  const keyTerms = req.query.key_terms;
  if (keyTerms != undefined) {
    // Format key terms
    //const keyTerms = capitaliseString(req.query.key_terms);
    const keyTermsList = keyTerms.split(",");
    //Check that there are less than 10 key words
    if (keyTermsList.length > 10) {
      res.status(400).json("No more than 10 key terms allowed in the query");
    }
    
    //const results = [];
    console.log("Get key terms: " + keyTerms);
    // TODO: Add key terms to query 
    //Loop through key terms list and find articles containing ALL the key terms
    query = query.where('key_terms', 'array-contains', keyTermsList);
    if (query.empty) {
      res.status(404).json("No articles found with given key terms");
      return;
    }
  }

  // Check location 
  const location = req.query.location;
  if (location != undefined) {
    //Format location
    const locationName = capitaliseString(req.query.location);
    console.log("Get location name: " + locationName);
    //Create a query that gets the given locations
    query = query.where('locations', 'array-contains', locationName);
    if (query.empty) {
      res.status(404).json("No matching locations found");
      return;
    }
  }

  // Make the query to the database 
  const articlesRef = await query.limit(limit).get();
  var data = [];
  console.log("Number of returned docs: ", articlesRef.size);
  articlesRef.forEach((doc) => {
    data.push(doc.data());
  })
  res.status(200).json(data);
};

module.exports = { getArticles };

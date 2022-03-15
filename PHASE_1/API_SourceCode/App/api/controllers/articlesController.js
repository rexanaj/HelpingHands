//create global sample dictionary of summaries
let summaryDict = {
  article_1: {
    summary: "Lassa Fever – United Kingdom of Great Britain and Northern Ireland",
    date: "2022-02-21T09:48:23",
    location: "United Kingdom"
  },
  article_2: {
    summary: "Lassa Fever - Nigeria",
    date: "2022-01-03T05:00:00",
    location: "Nigeria"
  },
  article_3: {
    summary: "Measles - Afghanistan",
    date: "2018-01-01T14:00:23",
    location: "Afghanistan"
  }
}

// Controller functions
//retrieves summaries with respect to limit parameter
const getArticles = (req, res) => {
  "use strict";
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

  //retrieve the number of summaries equal to the limit provided
  for(let count = 0; count <= req.query.limit; count++) {
    //find the properties of an article in the summary dictionary 
    const summary_return = summaryDict[Object.keys(summaryDict)[count]];
    res.json(summary_return);
  }

  //Todo: get articles from database
  console.log(limit);
  res.json("Success");
};

//retrieves summaries with respect to start_date and end_date parameters
const getArticlesDate = (req, res) => {
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

  //with respect to start_date and end_date parameters
  const date1 = new Date(start_date);
  const date2 = new Date(end_date);

  //find any article that has value date in between start_date and end_date
  for(const[key, { date }] of Object.entries(summaryDict)) {
    const date_summary = new Date(date);
    if(date_summary >= date1 && date_summary <= date2) {
      const summary_return = summaryDict.key.summary; 
      res.json(summary_return);
    }
  }
}

module.exports = { getArticles, getArticlesDate };

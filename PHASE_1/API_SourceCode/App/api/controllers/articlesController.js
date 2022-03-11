// Controller functions
const getArticles = (req, res) => {
  //check limit is parsed in parameter
  if (req.query.limit == undefined) {
    res.status(400).json("Missing limit parameter");
    return;
  }

  let limit = parseInt(req.query.limit);
  if (Number.isNaN(limit)) {
    res.status(400).json("Invalid parameter type");
    return;
  }
  //Todo: get articles from database
  console.log(limit);
  res.json("Success");
};

module.exports = { getArticles };

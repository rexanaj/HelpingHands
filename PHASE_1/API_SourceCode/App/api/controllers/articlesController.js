// Controller functions
const getArticles = (req, res) => {
  //check limit is parsed in parameter
  if (req.query.limit == undefined) {
    res.status(400).send();
    return;
  } 

  let limit = parseInt(req.query.limit);
  if (Number.isNaN(limit)) {
    res.status(400).send();
    return;
  }
  //Todo: get articles from database
  console.log(limit);
  res.send("Success");
};

module.exports = { getArticles };

// Controller functions
const getExample = (req, res) => {
  example = "Hello World";
  res.json(example);
};

module.exports = {getExample}

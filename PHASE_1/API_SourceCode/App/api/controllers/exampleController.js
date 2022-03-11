// Controller functions
const getExample = (req, res) => {
  const example = "Hello World";
  res.json(example);
};

module.exports = { getExample };

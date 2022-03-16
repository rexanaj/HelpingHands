const app = require("./app");
const port = process.env.PORT || 5555;

// Begins the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

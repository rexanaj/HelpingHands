const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

// Route imports
const exampleRoutes = require("./api/routes/exampleRoute");
const dbTestRoutes = require("./api/routes/dbTestRoute");

// Server info
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // lets us parse JSON

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API",
      description: "API Information",
    },
    servers: ["http:://localhost:5000"],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Access api docs at /docs

// Routes
app.use("/example", exampleRoutes);
app.use("/dbTest", dbTestRoutes)

module.exports = app;

const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

// Route imports
const exampleRoutes = require("./api/routes/exampleRoute");
const diseasesRoutes = require("./api/routes/diseaseRoute");
const dbTestRoutes = require("./api/routes/dbTestRoute");

// Server info
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // lets us parse JSON

// Swagger setup
const port = process.env.PORT || 5555;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "API Information",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./app.js", "./api/routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs)); // Access api docs at /docs

/**
 * @swagger
 * components:
 *  responses:
 *    Success:
 *      description: OK
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *    InputError:
 *      description: Input error
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: Invalid input
 */

// Routes
app.use("/example", exampleRoutes);
app.use("/diseases", diseasesRoutes);
app.use("/dbTest", dbTestRoutes);

module.exports = app;

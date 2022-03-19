const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const firebaseAdmin = require("firebase-admin");

// Route imports
const diseasesRoutes = require("./api/routes/diseaseRoute");

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
 *    NotFoundError:
 *      description: Not found error
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: Not found
 */

// Routes
app.use("/diseases", diseasesRoutes);

// sending scraper data to database
var db = firebaseAdmin.firestore();
app.use("/load", (req, res) => {
  var dataset = [];
  var i = 0;
  // new child process to call python script
  const { spawn } = require("child_process");
  console.log(__dirname + "/resources/web-scraper.py");
  const pythonShell = spawn("python", [
    __dirname + "/resources/web-scraper.py",
  ]);

  // collect data from script
  pythonShell.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataset.push(data);
  });
  // in close event we are sure that stream from child process is closed

  // for (var i = 0; i < dataset.length; i++) {
  //   console.log(dataset[i]);
  // }

  pythonShell.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser

    console.log(dataset.length);
    // console.log(dataset.join(""))
    var results = JSON.parse(dataset.join(""));
    for (var i = 0; i < results.length; i++) {
      var article = results[i];
      console.log(article["headline"]);

      // enter into firestore
      db.collection("articles")
        .doc()
        .set({
          id: article["id"],
          url: article["url"],
          date_of_publication: article["date_of_publication"],
          headline: article["headline"],
          main_text: article["main_text"],
          reports: article["reports"],
        })
        .then(function () {
          console.log("Article added successfully!");
        })
        .catch(function (error) {
          console.error("Error writing article: ", error);
        });

      db.collection("reports")
        .doc()
        .set({
          report: article["reports"],
        })
        .then(function () {
          console.log("report added successfully!");
        })
        .catch(function (error) {
          console.error("Error writing report: ", error);
        });
    }
  });
});

module.exports = app;

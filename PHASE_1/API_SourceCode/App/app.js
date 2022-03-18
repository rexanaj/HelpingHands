const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const firebaseAdmin = require('firebase-admin');

// Route imports
const exampleRoutes = require("./api/routes/exampleRoute");
const diseasesRoutes = require("./api/routes/diseaseRoute");
const dbTestRoutes = require("./api/routes/dbTestRoute");

// Server info
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // lets us parse JSON

const port = process.env.PORT || 5555;
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API",
      description: "API Information",
    },
    servers: ["http:://localhost:" + port],
  },
  apis: ["./api/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Access api docs at /docs

// Routes
app.use("/example", exampleRoutes);
app.use("/diseases", diseasesRoutes);
app.use("/dbTest", dbTestRoutes)


// sending scraper data to database
var db = firebaseAdmin.firestore();
app.use('/load', (req, res) => {
  
    var dataset = [];
    var i = 0;
    // new child process to call python script
    const { spawn } = require('child_process');
    console.log(__dirname + '/resources/web-scraper.py')
    const pythonShell = spawn('python', [__dirname + '/resources/web-scraper.py']);

    // collect data from script
    pythonShell.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataset.push(data)
    });
    // in close event we are sure that stream from child process is closed

    // for (var i = 0; i < dataset.length; i++) {
    //   console.log(dataset[i]);
    // }

    

    pythonShell.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        
        console.log(dataset.length)
        // console.log(dataset.join(""))
        var results = JSON.parse(dataset.join(""))
        for (var i = 0; i < results.length; i++) {
          var article = results[i]
          console.log(article['headline']);

          // enter into firestore
          db.collection("articles").doc().set({
            id: article['id'],
            url: article['url'],
            date_of_publication: article['date_of_publication'],
            headline: article['headline'],
            main_text: article['main_text'],
            reports: article['reports']
          })
          .then(function() {
            console.log("Article added successfully!");
          })
          .catch(function(error) {
            console.error("Error writing article: ", error);
          });

          db.collection("reports").doc().set({
            report: article['reports']
          })
          .then(function() {
            console.log("report added successfully!");
          })
          .catch(function(error) {
            console.error("Error writing report: ", error);
          });
        }
    });
    
    

})

module.exports = app;

const ngoList = require("../../resources/ngo_list.json");
const diseaseList = require("../../resources/disease_list.json");

const getNGOs = (req, res) => {
  var requestedLocations = [];
  var requestedDiseases = [];
  if (req.query.locations != undefined) {
    requestedLocations = req.query.locations.split(",").filter((e) => e);
  }
  if (req.query.diseases != undefined) {
    requestedDiseases = req.query.diseases.split(",").filter((e) => e);
  }

  // Only look at valid requested diseases
  if (requestedDiseases.length > 0) {
    var validDiseases = [];
    requestedDiseases.forEach((requestedDisease) => {
      diseaseList.forEach((disease) => {
        if (disease.name.toLowerCase() === requestedDisease.toLowerCase()) {
          validDiseases.push(requestedDisease);
        }
      });
    });
    if (validDiseases.length <= 0) {
      // No matches found
      res.send([]);
      return;
    }
  }
  console.log(requestedLocations, requestedDiseases);

  // Check for matching NGOs
  var matches = [];
  for (let k = 0; k < ngoList.length; k++) {
    const ngo = ngoList[k];

    if (requestedLocations.length > 0 && requestedDiseases.length > 0) {
      // NGO must have both matching locations and diseases
      var locationFound = false;
      for (let i = 0; i < requestedLocations.length; i++) {
        if (ngo.locations[0] === "all") {
          // These NGOs match all diseases and should always be displayed
          locationFound = true;
        } else if (
          ngo.locations.includes(requestedLocations[i].toLowerCase())
        ) {
          locationFound = true;
        }
      }

      if (locationFound) {
        for (let i = 0; i < requestedDiseases.length; i++) {
          if (ngo.keywords.includes(requestedDiseases[i].toLowerCase())) {
            matches.push(ngo);
          }
        }
      }
    } else if (requestedLocations.length > 0) {
      // Find all matching locations with any disease
      for (let i = 0; i < requestedLocations.length; i++) {
        if (ngo.locations[0] === "all") {
          // These NGOs match all locations and should always be displayed
          matches.push(ngo);
        } else if (
          ngo.locations.includes(requestedLocations[i].toLowerCase())
        ) {
          matches.push(ngo);
        }
      }
    } else if (requestedDiseases.length > 0) {
      // Find all matching diseases with any location
      for (let i = 0; i < requestedDiseases.length; i++) {
        if (ngo.keywords[0] === "all") {
          // These NGOs match all diseases and should always be displayed
          matches.push(ngo);
        } else if (ngo.keywords.includes(requestedDiseases[i].toLowerCase())) {
          matches.push(ngo);
        }
      }
    }
  }

  res.send(matches);
};

module.exports = {
  getNGOs,
};

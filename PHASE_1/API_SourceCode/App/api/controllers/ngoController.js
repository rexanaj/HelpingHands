const ngoList = require('../../resources/ngo_list.json');
const diseaseList = require('../../resources/disease_list.json');

const getNGOs = (req, res) => {
    var requestedLocations = req.query.locations.split(",");
    var requestedDiseases = req.query.diseases.split(",");

    // Only look at valid requested diseases
    var validDiseases = [];
    requestedDiseases.forEach(requestedDisease => {
        diseaseList.forEach(disease => {
            if (disease.name.toLowerCase() === requestedDisease.toLowerCase()) {
                validDiseases.push(requestedDisease);
                return;
            }
        })
    })
    if (validDiseases.length <= 0) {
        // No matches found
        res.send([]);
        return;
    }

    // Check for matching NGOs
    var matches = [];
    ngoList.forEach((ngo) => {

        // NGO must have both matching locations and diseases 

        // if (ngo.keywords[0] === "all") {
        //     // These NGOs match all diseases and should always be displayed
        //     matches.push(ngo);
        //     // Next iteration of the loop
        //     return;
        // }

        // Check if NGO has matching locations
        // for (let i = 0; i < requestedLocations.length; i++) {
        //     if (ngo.locations.includes(requestedLocations[i].toLowerCase())) {
        //         matches.push(ngo);
        //         return;
        //     }
        // }


        // Check if NGO has matching diseases
        // for (let i = 0; i < requestedDiseases.length; i++) {
        //     if (ngo.keywords.includes(requestedDiseases[i].toLowerCase())) {
        //         matches.push(ngo);
        //         return;
        //     }
        // }
    });

    res.send(matches);
}

module.exports = {
    getNGOs
};

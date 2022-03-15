require('../../firebase/firebase') // Initialises the database
const firebaseAdmin = require('firebase-admin');
const { report } = require('superagent');
const db = firebaseAdmin.firestore();

const { capitaliseString } = require('../../helper/strings')

// Retrieves all diseases 
const getAllDiseases = async (req, res) => {
    console.log("Get all diseases called!");

    // Gets all reports from the database
    const reportsRef = await db.collection('reports').get();
    if (reportsRef.empty) {
        res.status(404).json("No reports found");
    }

    var allDiseases = [];
    reportsRef.forEach(function (doc) {
        // Loop through each disease in the report
        doc.data().diseases.forEach(function (disease) {
            // Format string to ensure no duplicates 
            const formattedDisease = capitaliseString(disease);
            if (!allDiseases.includes(formattedDisease)) {
                allDiseases.push(formattedDisease);
            }
        })
    });

    if (allDiseases.length == 0) {
        res.status(404).json("No diseases found.");
        return;
    }
    res.json(allDiseases);
};

// Retrieves a information about a specified disease 
// Including: symptoms, affected areas and number of cases
const getDisease = async (req, res) => {
    const diseaseName = capitaliseString(req.params.disease);
    console.log("Get specified disease: " + diseaseName);

    // Gets all reports from the database
    const reportsRef = await db.collection('reports');
    const diseasesRef = await reportsRef.where('diseases', 'array-contains', diseaseName).get();
    if (diseasesRef.empty) {
        res.status(404).json("No matching diseases found");
        return;
    }

    var allLocations = [];
    diseasesRef.forEach(function (doc) {
        // Loop through each disease in the report
        doc.data().locations.forEach(function (location) {
            // Format string to ensure no duplicates 
            const formattedLocation = capitaliseString(location);
            if (!allLocations.includes(formattedLocation)) {
                allLocations.push(formattedLocation);
            }
        })
    });

    res.json({
        affected_areas: allLocations,
        number_of_cases: allLocations.length
    });
}

module.exports = { getAllDiseases, getDisease };

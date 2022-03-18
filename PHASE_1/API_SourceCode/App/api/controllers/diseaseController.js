require("../../firebase/firebase"); // Initialises the database
const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

const { capitaliseString } = require("../../helper/strings");
const { addLog } = require("../../helper/log");

const diseaseList = require("../../resources/disease_list.json");

// Retrieves all diseases alongside their information
const getAllDiseasesInfo = async (req, res) => {
    console.log("Get all diseases called!");

    // Gets all reports from the database
    const reportsRef = await db.collection("reports").get();
    if (reportsRef.empty) {
        res.status(200).json([]);
        return;
    }

    const diseasesInfo = {};
    reportsRef.forEach(function (doc) {
        // Loop through each disease in the report
        Object.keys(doc.data().report[0]).forEach(function (report) {
            const diseases = doc.data().report[0].diseases;
            const locations = doc.data().report[0].locations;
            const syndromes = doc.data().report[0].syndromes;

            // Loop through each disease in current report
            for (let i = 0; i < diseases.length; i++) {

                // Create new disease if not already existing 
                if (!Object.keys(diseasesInfo).includes(diseases[i])) {
                    diseasesInfo[diseases[i]] = {
                        "locations": [],
                        "syndromes": []
                    }
                }

                // Find all unique locations 
                for (let j = 0; j < locations.length; j++) {
                    if (!diseasesInfo[diseases[i]]["locations"].includes(locations[j])) {
                        diseasesInfo[diseases[i]]["locations"].push(locations[j]);
                    }
                }

                // Find all unique syndromes 
                for (let j = 0; j < syndromes.length; j++) {
                    if (!diseasesInfo[diseases[i]]["syndromes"].includes(syndromes[j])) {
                        diseasesInfo[diseases[i]]["syndromes"].push(syndromes[j]);
                    }
                }
            }

        })
    });

    if (diseasesInfo.length == 0) {
        res.status(200).json([]);
        return;
    }

    res.json(
        addLog({
            diseasesInfo: diseasesInfo,
        })
    );
};

// Retrieves only the diseases name field
const getAllDiseaseNames = async (req, res) => {
    console.log("Get all disease names called!");

    // Gets all reports from the database
    const reportsRef = await db.collection("reports").get();
    if (reportsRef.empty) {
        res.status(200).json([]);
        return;
    }

    var allDiseases = [];
    reportsRef.forEach(function (doc) {
        // Loop through each disease in the report
        doc.data().report[0].diseases.forEach(function (disease) {
            // Format string to ensure no duplicates
            const formattedDisease = capitaliseString(disease);
            if (!allDiseases.includes(formattedDisease)) {
                allDiseases.push(formattedDisease);
            }
            console.log(disease);
        });
    });

    if (allDiseases.length == 0) {
        res.status(404).json("No diseases found.");
        return;
    }
    res.json(
        addLog({
            diseaseNames: allDiseases,
        })
    );
};

// Retrieves a information about a specified disease
// Including: symptoms, affected areas and number of cases
const getDisease = async (req, res) => {
    const diseaseName = capitaliseString(req.params.disease);
    console.log("Get specified disease: " + diseaseName);

    var found = false;
    diseaseList.forEach((disease) => {
        if (capitaliseString(disease.name) === diseaseName) {
            found = true;
        }
    })
    if (!found) {
        res.status(404).json("Invalid disease name provided");
        return;
    }

    // Gets all reports from the database
    const reportsRef = await db.collection("reports").get();
    if (reportsRef.empty) {
        res.status(200).json([]);
        return;
    }

    var diseaseInfo = {
        "disease": diseaseName,
        "locations": [],
        "syndromes": [],
        "number_of_cases": 0,
    }

    reportsRef.forEach(function (doc) {
        Object.keys(doc.data().report[0]).forEach(function (report) {
            const diseases = doc.data().report[0].diseases;
            const locationsData = doc.data().report[0].locations;
            const syndromesData = doc.data().report[0].syndromes;
            if (diseases.includes(diseaseName)) {
                for (let i = 0; i < locationsData.length; i++) {
                    if (!diseaseInfo["locations"].includes(locationsData[i])) {
                        diseaseInfo["locations"].push(locationsData[i]);
                    }
                }
                for (let i = 0; i < syndromesData.length; i++) {
                    if (!diseaseInfo["syndromes"].includes(syndromesData[i])) {
                        diseaseInfo["syndromes"].push(syndromesData[i]);
                    }
                }
                diseaseInfo["number_of_cases"] += 1;
            }
        });
    });

    res.json(addLog(diseaseInfo));
};

module.exports = { getAllDiseasesInfo, getAllDiseaseNames, getDisease };

// Controller functions

// Retrieves all diseases 
const getAllDiseases = (req, res) => {
    // TODO: Get data from database
    console.log("Get all diseases called!");
    let data = {
        "disease1": {
            "symptoms": "",
            "affected_areas": "",
            "number_cases": ""
        },
        "disease2": {
            "symptoms": "",
            "affected_areas": "",
            "number_cases": ""
        }
    };
    res.json(data);
};

// Retrieves a specified disease 
const getDisease = (req, res) => {
    const diseaseName = req.params.disease;
    console.log("Get specified disease: " + diseaseName);

    // TODO: get specified disease from database 

    // Not found in the database
    // if (...) {
    //     res.status(404).json("Disease not found");
    // }

    let data = {
        "disease1": {
            "symptoms": "",
            "affected_areas": "",
            "number_cases": ""
        },
    }
    res.json(data);
}

module.exports = { getAllDiseases, getDisease };

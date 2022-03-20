const express = require("express");
const router = express.Router();

// Controller functions
const {
  getAllDiseasesInfo,
  getDisease,
  getAllDiseaseNames,
} = require("../controllers/diseaseController");

router.get("/", getAllDiseasesInfo);
router.get("/names", getAllDiseaseNames);
router.get("/:disease", getDisease);

module.exports = router;

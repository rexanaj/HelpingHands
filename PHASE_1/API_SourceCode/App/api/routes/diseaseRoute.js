const express = require("express");
const router = express.Router();

// Controller functions
const { getAllDiseases, getDisease } = require("../controllers/diseaseController");

/**
 * @swagger
 * /example:
 *  get:
 *    tags:
 *      - Example
 *    summary: An example of how to write the swagger docs
 *    description: Use to get 'Hello World'
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", getAllDiseases);
router.get("/:disease", getDisease);

module.exports = router;

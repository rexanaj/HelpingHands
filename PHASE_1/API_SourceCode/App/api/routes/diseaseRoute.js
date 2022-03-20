const express = require("express");
const router = express.Router();

// Controller functions
const {
  getAllDiseasesInfo,
  getDisease,
  getAllDiseaseNames,
} = require("../controllers/diseaseController");

router.get("/", getAllDiseasesInfo);

/**
 * @swagger
 * /diseases/names:
 *  get:
 *    tags:
 *      - Diseases
 *    summary: Gets all disease type names
 *    description: Returns _all_ disease type names from the reports database
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                diseases:
 *                  $ref: '#/components/schemas/Diseases'
 *                log:
 *                  $ref: '#/components/schemas/Log'
 *      '204':
 *        description: OK with no content
 *      '400':
 *        $ref: '#components/responses/InputError'
 */
router.get("/names", getAllDiseaseNames);

/**
 * @swagger
 * /diseases/:disease:
 *  get:
 *    tags:
 *      - Diseases
 *    summary: Gets the information for a specific disease type
 *    description: Returns information relating to a specific disease type, including symptoms, affected locations and the number of cases
 *    parameters:
 *      - in: path
 *        name: diseaseName
 *        required: true
 *        schema:
 *          type: string
 *          example: "Lassa Fever"
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                diseaseInfo:
 *                  $ref: '#/components/schemas/DiseaseInfo'
 *                log:
 *                  $ref: '#/components/schemas/Log'
 *      '400':
 *        $ref: '#components/responses/InputError'
 *      '404':
 *        $ref: '#components/responses/InputError'
 */
router.get("/:disease", getDisease);

module.exports = router;

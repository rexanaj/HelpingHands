const express = require("express");
const router = express.Router();

// Controller functions
const {
  getAllDiseasesInfo,
  getAllDiseaseReports,
  getDisease,
  getAllDiseaseNames,
} = require("../controllers/diseaseController");

/**
 * @swagger
 * tags:
 *   name: Diseases
 *   description: Routes to get disease specific info
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Diseases:
 *      type: array
 *      description: The types of diseases found in the report
 *      items:
 *        type: string
 *      example: ["Lassa Fever", "Diphtheria", "Chikungunya", "Influenza", "Covid-19"]
 *    Event_date:
 *      type: string
 *      description: The date the report was published
 *      example: "14 December 2021"
 *    Keywords:
 *      type: array
 *      description: Key filter words for the report/article
 *      items:
 *        type: string
 *      example: ["Outbreak", "Virus", "Ebola"]
 *    Locations:
 *      type: array
 *      description: The locations where the disease cases were discovered
 *      items:
 *        type: string
 *      example: ["Asia", "Nigeria", "United Kingdom"]
 *    Syndromes:
 *      type: array
 *      description: The major symtomatic indicators of the diseases
 *      items:
 *        type: string
 *      example: ["Haemorrhagic Fever"]
 *    Number_of_cases:
 *      type: number
 *      description: The amount of cases of the disease (from references in the database)
 *      example: 10
 *    DiseaseName:
 *      type: string
 *      description: The name of the disease
 *      example: "Lassa Fever"
 *
 *    Report:
 *      type: object
 *      properties:
 *        diseases:
 *          type: string
 *          example: "Lassa Fever"
 *        locations:
 *          $ref: '#/components/schemas/Locations'
 *        syndromes:
 *          $ref: '#/components/schemas/Syndromes'
 *        event_date:
 *          $ref: '#/components/schemas/Event_date'
 *        keywords:
 *          $ref: '#/components/schemas/Keywords'
 *    Reports:
 *      type: array
 *      description: Array containing all of the disease reports
 *      items:
 *        $ref: '#components/schemas/Report'
 *
 *    DiseaseInfo:
 *      type: object
 *      properties:
 *        locations:
 *          $ref: '#/components/schemas/Locations'
 *        syndromes:
 *          $ref: '#/components/schemas/Syndromes'
 *    DiseasesInfo:
 *      type: object
 *      properties:
 *        "Lassa Fever":
 *          $ref: '#/components/schemas/DiseaseInfo'
 *      additionalProperties:
 *        $ref: '#/components/schemas/DiseaseInfo'
 *
 *    Log:
 *      type: object
 *      properties:
 *        team_name:
 *          type: string
 *          example: "Dwen"
 *        access_time:
 *          type: timedate
 *          example: "2022-03-18T00:04:49.3652"
 *        data_source:
 *          type: string
 *          example: "https://www.who.int/emergencies/diesease-outbreak-news"
 */

/**
 * @swagger
 * /diseases:
 *  get:
 *    tags:
 *      - Diseases
 *    summary: Gets a summary of all the diseases with corresponding reports in the database
 *    description: Returns a summary of _all_ diseases referenced in at least on report in the database
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                diseasesInfo:
 *                  $ref: '#/components/schemas/DiseasesInfo'
 *                log:
 *                  $ref: '#/components/schemas/Log'
 *      '400':
 *        $ref: '#components/responses/InputError'
 */
router.get("/", getAllDiseasesInfo);

/**
 * @swagger
 * /diseases/names:
 *  get:
 *    tags:
 *      - Diseases
 *    summary: Gets all disease type names in database
 *    description: Returns _all_ disease type names which are referenced in at least one report in the database
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                diseaseNames:
 *                  $ref: '#/components/schemas/Diseases'
 *                log:
 *                  $ref: '#/components/schemas/Log'
 *      '400':
 *        $ref: '#components/responses/InputError'
 */
router.get("/names", getAllDiseaseNames);

/**
 * @swagger
 * /diseases/reports:
 *  get:
 *    tags:
 *      - Diseases
 *    summary: Gets all disease reports from the database
 *    description: Returns _all_ disease reports from the database regardless of their contents
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                reports:
 *                  $ref: '#/components/schemas/Reports'
 *                log:
 *                  $ref: '#/components/schemas/Log'
 *      '400':
 *        $ref: '#components/responses/InputError'
 */
router.get("/reports", getAllDiseaseReports);

/**
 * @swagger
 * /diseases/{disease}:
 *  get:
 *    tags:
 *      - Diseases
 *    summary: Gets the information for a specific disease type
 *    description: Returns information relating to a specific disease type, including symptoms, affected locations and the number of cases
 *    parameters:
 *      - in: path
 *        name: disease
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
 *                disease:
 *                  $ref: '#/components/schemas/DiseaseName'
 *                locations:
 *                  $ref: '#/components/schemas/Locations'
 *                syndromes:
 *                  $ref: '#/components/schemas/Syndromes'
 *                number_of_cases:
 *                  $ref: '#/components/schemas/Number_of_cases'
 *                log:
 *                  $ref: '#/components/schemas/Log'
 *      '400':
 *        $ref: '#components/responses/InputError'
 *      '404':
 *        $ref: '#components/responses/NotFoundError'
 */
router.get("/:disease", getDisease);

module.exports = router;

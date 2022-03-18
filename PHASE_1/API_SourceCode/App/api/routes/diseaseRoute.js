const express = require("express");
const router = express.Router();

// Controller functions
const {
  getAllDiseasesInfo,
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
 *      example: ["Lassa Fever", "Diphtheria", "Influenza"]
 *    Event_date:
 *      type: object
 *      description: The timedate of when the report was published
 *      properties:
 *        _seconds:
 *          type: number
 *          example: 1644325200
 *        _nanoseconds:
 *          type: number
 *          example: 0
 *    Locations:
 *      type: array
 *      description: The locations where the disease cases were discovered
 *      items:
 *        type: string
 *      example: ["United Kingdom", "Mali"]
 *    Syndrome:
 *      type: array
 *      description: The major symtomatic indicators of the diseases
 *      items:
 *        type: string
 *      example: ["Haemorrhagic Fever"]
 *
 *    Report:
 *      type: object
 *      required:
 *        - diseases
 *        - event_date
 *        - locations
 *        - syndrome
 *      properties:
 *        diseases:
 *          $ref: '#/components/schemas/Diseases'
 *        event_date:
 *          $ref: '#/components/schemas/Event_date'
 *        locations:
 *          $ref: '#/components/schemas/Locations'
 *        syndrome:
 *          $ref: '#/components/schemas/Syndrome'
 *    Reports:
 *      type: array
 *      description: Array containing all of the disease reports
 *      items:
 *        $ref: '#components/schemas/Report'
 *
 *    DiseaseInfo:
 *      type: object
 *      required:
 *        - affected_areas
 *        - number_of_cases
 *      properties:
 *        affected_areas:
 *          $ref: '#/components/schemas/Locations'
 *        number_of_cases:
 *          type: number
 *          exapmle: 2
 *
 *    Log:
 *      type: object
 *      required:
 *        - team_name
 *        - access_time
 *        - data_source
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
 * /diseases/:
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
 *      '204':
 *        description: OK with no content
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

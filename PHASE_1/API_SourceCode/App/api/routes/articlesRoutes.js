const express = require("express");
const router = express.Router();

// Controller functions
const { getArticles } = require("../controllers/articlesController");

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Routes to get disease articles
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
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Date_of_publication:
 *      type: object
 *      description: Date and time the article was published
 *      properties:
 *        "_seconds":
 *          type: number
 *          example: 1644757200
 *        "_nanoseconds":
 *          type: number
 *          example: 0
 *    Headline:
 *      type: string
 *      description: The article title
 *      example: "Circulating vaccine-derived poliovirus type 2 (cVDPV2) ??? Yemen"
 *    Id:
 *      type: number
 *      description: The article id (in the database)
 *      example: 15
 *    Main_text:
 *      type: string
 *      description: The main article body
 *      example:
 *        "On 22 November 2021, the International Health Regulations national focal point (IHR NFP) for Yemen notified WHO of
 *         the detection of circulating vaccine-derived poliovirus type 2 (cVDPV2) in stool samples from two children with acute
 *         flaccid paralysis (AFP) in Yemen."
 *    Url:
 *      type: string
 *      description: Url from which the article was sourced
 *      example: "https://www.who.int/emergencies/disease-outbreak-news/item/hepatitis-e-virus-republic-of-south-sudan"
 *
 *    Article:
 *      type: object
 *      description: Disease article
 *      required:
 *      properties:
 *        date_of_publication:
 *          $ref: '#/components/schemas/Date_of_publication'
 *        headline:
 *          $ref: '#/components/schemas/Headline'
 *        id:
 *          $ref: '#/components/schemas/Id'
 *        main_text:
 *          $ref: '#/components/schemas/Main_text'
 *        reports:
 *          $ref: '#/components/schemas/Reports'
 *        url:
 *          $ref: '#/components/schemas/Url'
 *    Articles:
 *      type: array
 *      description: Array containing all of the filtered articles
 *      items:
 *        $ref: '#components/schemas/Article'
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
 * /articles:
 *  get:
 *    tags:
 *      - Articles
 *    summary: Gets all relevent articles from the database
 *    description: Returns _all_ articles from the database which plaintext match the query parameters
 *    parameters:
 *      - name: limit
 *        in: query
 *        required: true
 *        schema:
 *          type: number
 *          example: 5
 *      - name: start_date
 *        in: query
 *        required: false
 *        schema:
 *          type: date
 *          example: "2021-01-10"
 *      - name: end_date
 *        in: query
 *        required: false
 *        schema:
 *          type: date
 *          example: "2021-10-20"
 *      - name: key_terms
 *        in: query
 *        required: false
 *        schema:
 *          type: array
 *          example: ["Outbreak","Epidemic","Ebola"]
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                articles:
 *                  $ref: '#/components/schemas/Articles'
 *                log:
 *                  $ref: '#/components/schemas/Log'
 *      '400':
 *        $ref: '#components/responses/InputError'
 *      '404':
 *        $ref: '#components/responses/NotFoundError'
 */
router.get("/", getArticles);

module.exports = router;

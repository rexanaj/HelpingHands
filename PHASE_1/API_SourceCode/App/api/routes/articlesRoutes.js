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
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Date_of_publication:
 *      type: date
 *      description: Date the article was published
 *      example: "25 November 2021"
 *    Headline:
 *      type: string
 *      description: The article title
 *      example: "Monkeypox - United States of America"
 *    Id:
 *      type: number
 *      description: The article id (in the database)
 *      example: 17
 *    Main_text:
 *      type: string
 *      description: The main article body
 *      example:
 *        "On 16 November 2021, the IHR National Focal Point of the United States of America (USA) notified PAHO/WHO of an imported
 *         case of human monkeypox in Maryland, USA. The patient is an adult, resident of the USA, with recent travel history to
 *         Nigeria."
 *    Url:
 *      type: string
 *      description: Url from which the article was sourced
 *      example: "https://www.who.int/emergencies/disease-outbreak-news/item/2021-DON344"
 *
 *    Article:
 *      type: object
 *      description: Disease article
 *      required:
 *        - date_of_publication
 *        - headline
 *        - id
 *        - main_text
 *        - reports
 *        - url
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
 * /articles/:
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
 *          example: "13 October 2021"
 *      - name: end_date
 *        in: query
 *        required: false
 *        schema:
 *          type: date
 *          example: "20 November 2021"
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
 */
router.get("/", getArticles);

module.exports = router;

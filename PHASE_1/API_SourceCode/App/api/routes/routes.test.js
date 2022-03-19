const app = require("../../app");
const supertest = require("supertest");

// To run tests, use "npm test"
describe("Routes", () => {
  ///////////////////////////START DATE PARAMETER TESTS////////////////////////////////////////////////////////////////////////
  //Test error codes
  //Check correct format of start date (missing month and year)
  it("GET /articles/limit=1/start_date=29 ==> Invalid start date", async () => {
    const res = await supertest(app).get("/articles?limit=1&start_date=29");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid start date");
  });

  //Check correct format of start date (missing year)
  it("GET /articles/limit=1/start_date=29- ==> Invalid start date", async () => {
    const res = await supertest(app).get("/articles?limit=1&start_date=30-02");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid start date");
  });

  //Check correct articles are returned with respect to start date
  it("GET /articles/limit=1/start_date=02-03-2022 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10&start_date=2022-02-01");
    //five articles in the database have dates later than provided start date

    //convert start date query into unix timestamp
    var unixStartDate = Date.parse("01-Feb-2022 00:00:00")/1000;
    //compare unix time in articles to start date unix time
    res.body.forEach(function (item, index) {
      expect(item["date_of_publication"]["_seconds"]).toBeGreaterThanOrEqual(unixStartDate);
    });

    expect(res.statusCode).toEqual(200);
    //check that five articles are in the response
    expect(res.body).toHaveLength(5);
  });

  ///////////////////////////////LIMIT PARAMETER TESTS////////////////////////////////////////////////////////////////////////
  //Test error codes
  //no limit parameter
  it("GET /articles ==> missing limit parameter", async () => {
    const res = await supertest(app).get("/articles");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Missing limit parameter");
  });

  //string passed into limit paramater
  it("GET /articles/limit=hi ==> invalid parameter type", async () => {
    const res = await supertest(app).get("/articles?limit=hi");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid parameter type");
  });

  //limit equals 0
  it("GET /articles/limit=0 ==> invalid parameter type", async () => {
    const res = await supertest(app).get("/articles?limit=0");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid parameter value");
  });

  //limit is a negative number
  it("GET /articles/limit=-5 ==> invalid parameter type", async () => {
    const res = await supertest(app).get("/articles?limit=-5");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid parameter value");
  });

  //Check that content of response is correct and the right number
  //of articles are returned based on limit
  it("GET /articles/limit=1 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=1");
    //check that only one article is in the response
    expect(res.body).toHaveLength(1);
  });

  it("GET /articles/limit=3 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=3");
    expect(res.statusCode).toEqual(200);
    //check that three article are in the response
    expect(res.body).toHaveLength(3);
  });

  /////////////////////////////// LOCATION PARAMETER TESTS ////////////////////////////////////////////////////////////////////////
  // Test successful location
  it("GET /articles/limit=10/location=nigeria ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10?location=nigeria");
    expect(res.statusCode).toEqual(200);
    // Currently only one article with location = nigeria in database
    expect(res.body).toHaveLength(1);
  });

  // Test location with multiple articles
  it("GET /articles/limit=10/location=ukraine ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10?location=ukraine");
    expect(res.statusCode).toEqual(200);
    // Currently only one article with location = ukraine in database
    expect(res.body).toHaveLength(5);
  });

  // Test invalid parameter type
  it("GET /articles/limit=10/location=12 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10?location=12");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid parameter value");
  });

  // Test no articles with matching location
  it("GET /articles/limit=10/location=australia ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10?location=australia");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual("No matching locations found");
  });

  /////////////////////////////// KEYWORDS PARAMETER TESTS ////////////////////////////////////////////////////////////////////////
  // Test successful keywords
  it("GET /articles/limit=10/keyterms=outbreak ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10?keyterms=outbreak");
    expect(res.statusCode).toEqual(200);
    // Currently more than 10 articles with outbreak keyterms
    expect(res.body).toHaveLength(10);
  });

  // Test less keywords
  it("GET /articles/limit=10/keyterms=lassa%20fever ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10?keyterms=lassa%20fever");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  // Test too many keywords
  it("GET /articles/limit=10/keyterms=lassa%20fever,fever,zika,virus,ebola,epidemic,outbreak,mes,illness,bacteria,emerging ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10?keyterms=lassa%20fever,fever,zika,virus,ebola,epidemic,outbreak,mes,illness,bacteria,emerging");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("No more than 10 key terms allowed in the query");
  });

  // Test multiple keywords search
  it("GET /articles/limit=10/keyterms=outbreak,infection ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10?location=australia");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(10);
  });

});

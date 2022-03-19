const app = require("../../app");
const supertest = require("supertest");

// To run tests, use "npm test"
describe("Routes", () => {
  ///////////////////////////START DATE PARAMETER TESTS////////////////////////////////////////////////////////////////////////
  //Test error codes
  //Check correct format of start date (invalid year)

  jest.setTimeout(30000);

  it("GET /articles?limit=1&start_date=29 ==> Invalid start date", async () => {
    const res = await supertest(app).get("/articles?limit=1&start_date=29");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid start date");
  });

  //Check correct format of start date (not a number)
  it("GET /articles?limit=1&start_date=hi ==> Invalid start date", async () => {
    const res = await supertest(app).get("/articles?limit=1&start_date=hi");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid start date");
  });

  //Check no articles are returned when start date is
  //later than all dates of publication
  it("GET /articles?limit=20&start_date=2022-03-03T00:00:01 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=20&start_date=2022-03-03T00:00:01");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual("No articles found with given parameters");
  });

  //Check correct articles are returned with respect to start date
  it("GET /articles?limit=10&start_date=2021-02-03T23:59:59 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10&start_date=2021-02-03T23:59:59");
    //five articles in the database have dates later than provided start date
    //convert start date query into unix timestamp
    var unixStartDate = Date.parse("2021-02-03 23:59:59") / 1000;
    //compare unix time in articles to start date unix time
    res.body.forEach(function (item, index) {
      expect(item["date_of_publication"]["_seconds"]).toBeGreaterThanOrEqual(unixStartDate);
    });

    expect(res.statusCode).toEqual(200);
    //check that five articles are in the response
    expect(res.body).toHaveLength(10);
  });

  //Check all articles are returned when start date is earlier than
  //all dates of publication
  it("GET /articles?limit=25&start_date=2021 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=25&start_date=2021");
    //all articles in the database have dates later than provided start date
    //convert start date query into unix timestamp
    var unixStartDate = Date.parse("01-Jan-2021 00:00:00") / 1000;
    //compare unix time in articles to start date unix time
    res.body.forEach(function (item, index) {
      expect(item["date_of_publication"]["_seconds"]).toBeGreaterThanOrEqual(unixStartDate);
    });

    expect(res.statusCode).toEqual(200);
    //check that 20 articles are in the response
    expect(res.body).toHaveLength(20);
  });

  ////////////////////////////END DATE PARAMETER TESTS////////////////////////////////////////////////////////////////////////
  //Test error codes
  //Check correct format of end date (invalid year)
  it("GET /articles?limit=1&end_date=-30 ==> Invalid end date", async () => {
    const res = await supertest(app).get("/articles?limit=1&end_date=-30");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid end date");
  });

  //Check correct format of end date (not a number)
  it("GET /articles?limit=1&end_date=bye ==> Invalid end date", async () => {
    const res = await supertest(app).get("/articles?limit=1&end_date=bye");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid end date");
  });

  //Check no articles are returned when end date is
  //earlier than all dates of publication
  it("GET /articles?limit=10&end_date=2021-10-12T09:40:01 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10&end_date=2021-10-12T09:40:01");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual("No articles found with given parameters");
  });

  //Check correct articles are returned with respect to end date
  it("GET /articles?limit=20&end_date=2021-12-23T00:00:01 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=20&end_date=2021-12-23T00:00:01");
    //12 articles in the database have dates earlier than provided end date
    //convert end date query into unix timestamp
    var unixEndDate = Date.parse("23-Dec-2022 00:00:01") / 1000;
    //compare unix time in articles to start date unix time
    res.body.forEach(function (item, index) {
      expect(item["date_of_publication"]["_seconds"]).toBeLessThanOrEqual(unixEndDate);
    });

    expect(res.statusCode).toEqual(200);
    //check that 12 articles are in the response
    expect(res.body).toHaveLength(12);
  });

  //Check all articles are returned when end date is later than
  //all dates of publication
  it("GET /articles?limit=25&end_date=2022-03-04 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=25&end_date=2022-03-04");
    //all articles in the database have dates earlier than provided end date
    //convert end date query into unix timestamp
    var unixEndDate = Date.parse("04-Mar-2022 00:00:00") / 1000;
    //compare unix time in articles to start date unix time
    res.body.forEach(function (item, index) {
      expect(item["date_of_publication"]["_seconds"]).toBeLessThanOrEqual(unixEndDate);
    });

    expect(res.statusCode).toEqual(200);
    //check that 20 articles are in the response
    expect(res.body).toHaveLength(20);
  });

  ///////////////////////////START DATE AND END DATE PARAMETER TESTS//////////////////////////////////////////////////////////
  //Test error codes
  //start date and end date don't contain any article date
  it("GET /articles?limit=4&start_date=2018-01-20&end_date=2019-12-12 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=4&start_date=2018-01-20&end_date=2019-12-12");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual("No articles found with given parameters");
  });

  //start date and end date contains some article dates
  it("GET /articles?limit=12&start_date=2022-01-07&end_date=2022-03-01 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=12&start_date=2022-01-07&end_date=2022-03-01");
    //7 articles in the database have dates between start date and end date
    //convert start date and end date query into unix timestamp
    var unixStartDate = Date.parse("07-Jan-2022 00:00:00") / 1000;
    var unixEndDate = Date.parse("01-Mar-2022 00:00:00") / 1000;
    //compare unix time in articles to start date and end date unix time
    res.body.forEach(function (item, index) {
      expect(item["date_of_publication"]["_seconds"]).toBeGreaterThanOrEqual(unixStartDate);
      expect(item["date_of_publication"]["_seconds"]).toBeLessThanOrEqual(unixEndDate);
    });

    expect(res.statusCode).toEqual(200);
    //check that 7 articles are in the response
    expect(res.body).toHaveLength(7);
  });

  //start date and end date contains all article dates
  it("GET /articles?limit=36&start_date=2020-10-13&end_date=2022-03-03 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=36&start_date=2020-10-13&end_date=2022-03-03");
    //12 articles in the database have dates between start date and end date
    //convert start date and end date query into unix timestamp
    var unixStartDate = Date.parse("2020-10-13T00:00:00") / 1000;
    var unixEndDate = Date.parse("2022-03-03T00:00:00") / 1000;
    //compare unix time in articles to start date and end date unix time
    res.body.forEach(function (item, index) {
      expect(item["date_of_publication"]["_seconds"]).toBeGreaterThanOrEqual(unixStartDate);
      expect(item["date_of_publication"]["_seconds"]).toBeLessThanOrEqual(unixEndDate);
    });

    expect(res.statusCode).toEqual(200);
    //check that 12 articles are in the response
    expect(res.body).toHaveLength(20);
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
  it("GET /articles?limit=hi ==> invalid parameter type", async () => {
    const res = await supertest(app).get("/articles?limit=hi");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid parameter type");
  });

  //limit equals 0
  it("GET /articles?limit=0 ==> invalid parameter type", async () => {
    const res = await supertest(app).get("/articles?limit=0");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid parameter value");
  });

  //limit is a negative number
  it("GET /articles?limit=-5 ==> invalid parameter type", async () => {
    const res = await supertest(app).get("/articles?limit=-5");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid parameter value");
  });

  //Check the right number of articles are returned based on limit
  it("GET /articles?limit=1 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=1");
    //check that only one article is in the response
    expect(res.body).toHaveLength(1);
  });

  //Check the right number of articles are returned based on limit
  it("GET /articles?limit=3 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=3");
    expect(res.statusCode).toEqual(200);
    //check that three article are in the response
    expect(res.body).toHaveLength(3);
  });

  /////////////////////////////// LOCATION PARAMETER TESTS ////////////////////////////////////////////////////////////////////////
  // Test successful location
  it("GET /articles?limit=10&location=nigeria ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10&location=nigeria");
    expect(res.statusCode).toEqual(200);
    // Currently only one article with location = nigeria in database
    expect(res.body).toHaveLength(1);
  });

  // Test location with multiple articles
  it("GET /articles?limit=10&location=ukraine ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10&location=ukraine");
    expect(res.statusCode).toEqual(200);
    // Currently only two articles with location = ukraine in database
    expect(res.body).toHaveLength(2);
  });

  // Test no articles with matching location
  it("GET /articles?limit=10&location=australia ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10&location=australia");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual("No articles found with given parameters");
  });

  /////////////////////////////// KEYWORDS PARAMETER TESTS ////////////////////////////////////////////////////////////////////////
  // Test successful keywords
  it("GET /articles?limit=10&keyterms=outbreak ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10&keyterms=outbreak");
    expect(res.statusCode).toEqual(200);
    // Currently more than 10 articles with outbreak keyterms
    expect(res.body).toHaveLength(10);
  });

  // Test less keywords
  it("GET /articles?limit=10&keyterms=lassa%20fever ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10&keyterms=lassa%20fever");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(3);
  });

  // Test too many keywords
  it("GET /articles?limit=10&keyterms=lassa%20fever,fever,zika,virus,ebola,epidemic,outbreak,mes,illness,bacteria,emerging ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10&keyterms=lassa%20fever,fever,zika,virus,ebola,epidemic,outbreak,mes,illness,bacteria,emerging");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("No more than 10 key terms allowed in the query");
  });

  // Test multiple keywords search
  it("GET /articles?limit=10&keyterms=outbreak,infection ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10&keyterms=outbreak,infection");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(10);
  });

  /////////////////////////////// ALL PARAMETERS TEST //////////////////////////////////////////////////////////////////
  //Test all parameters together
  it("GET /articles?limit=4&start_date=2022-03-02&end_date=2022-03-04&location=malawi&keyterms=outbreak,virus ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=4&start_date=2022-03-02&end_date=2022-03-04&location=malawi&keyterms=outbreak,virus");
    //1 article in the database satisfies all the parameters
    //convert start date and end date query into unix timestamp
    var unixStartDate = Date.parse("02-Mar-2022 00:00:00") / 1000;
    var unixEndDate = Date.parse("04-Mar-2022 00:00:00") / 1000;
    //compare unix time in articles to start date and end date unix time
    res.body.forEach(function (item, index) {
      expect(item["date_of_publication"]["_seconds"]).toBeGreaterThanOrEqual(unixStartDate);
      expect(item["date_of_publication"]["_seconds"]).toBeLessThanOrEqual(unixEndDate);
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });
});


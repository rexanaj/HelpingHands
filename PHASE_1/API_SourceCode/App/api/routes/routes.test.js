const app = require("../../app");
const supertest = require("supertest");

// To run tests, use "npm test"
describe("Routes", () => {
  //Tests for start_date parameter
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
    const res = await supertest(app).get("/articles?limit=1&start_date=2022-03-02");

    //check that the correct article is in the response
    const expected = { "date_of_publication": "3 March 2022" };
    expect(res.body[0]).toMatchObject(expected);

    expect(res.statusCode).toEqual(200);
    //check that only one article is in the response
    expect(res.body).toHaveLength(1);
  });

  //Check correct articles are returned with respect to start date
  it("GET /articles/limit=1/start_date=02-03-2022 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=4&start_date=2022-02-01");

    //check that the correct article is in the response
    const expected_1 = { "date_of_publication": "3 March 2022" };
    const expected_2 = { "date_of_publication": "21 February 2022" };
    expect(res.body[0]).toMatchObject(expected);
    expect(res.body[2]).toMatchObject(expected);

    expect(res.statusCode).toEqual(200);
    //check that only one article is in the response
    expect(res.body).toHaveLength(2);
  });

  //Tests for limit parameter
  //Test error codes
  it("GET /articles ==> missing limit parameter", async () => {
    const res = await supertest(app).get("/articles");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Missing limit parameter");
  });

  it("GET /articles/limit=hi ==> invalid parameter type", async () => {
    const res = await supertest(app).get("/articles?limit=hi");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Invalid parameter type");
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

  it("GET /articles/limit=10 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10");
    expect(res.statusCode).toEqual(200);

    //check that 10 article are in the response
    expect(res.body).toHaveLength(10);
  });
});

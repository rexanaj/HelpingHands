const app = require("../../app");
const supertest = require("supertest");

// To run tests, use "npm test"
describe("Routes", () => {
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

  it("GET /articles/limit=1 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=1");

    //check that the first article in the database is in the response
    const expected = { "id":1 };
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toMatchObject(expected);

    //check that only one article is in the response
    expect(res.body).toHaveLength(1);
  });

  it("GET /articles/limit=3 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=3");

    //check that the first three articles in the database are in the response
    const expected_1 = { "id":1 };
    const expected_2 = { "id":2 };
    const expected_3 = { "id":3 };
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toMatchObject(expected_1);
    expect(res.body[1]).toMatchObject(expected_2);
    expect(res.body[2]).toMatchObject(expected_3);

    //check that three article are in the response
    expect(res.body).toHaveLength(3);
  });

  it("GET /articles/limit=10 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=10");

    //when there are less articles in the database than the limit query,
    //return the first three articles
    const expected_1 = { "id":1 };
    const expected_2 = { "id":2 };
    const expected_3 = { "id":3 };
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toMatchObject(expected_1);
    expect(res.body[1]).toMatchObject(expected_2);
    expect(res.body[2]).toMatchObject(expected_3);

    //check that three article are in the response
    expect(res.body).toHaveLength(3);
  });
});

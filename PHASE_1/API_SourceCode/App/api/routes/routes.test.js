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

  it("GET /articles/limit=100 ==> successful", async () => {
    const res = await supertest(app).get("/articles?limit=100");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual("Success");
  });
});

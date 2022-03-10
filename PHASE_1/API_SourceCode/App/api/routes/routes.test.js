const app = require("../../app");
const supertest = require("supertest");

// To run tests, use "npm test"
describe("Routes", () => {
  it("GET /example ==> return hello world", async () => {
    const res = await supertest(app).get("/example");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual("Hello World");
  });
});
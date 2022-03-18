const app = require("../../app");
const supertest = require("supertest");

let diseaseNames = [];

// // To run tests, use "npm test"
// describe("Routes", () => {
//   it("GET /example ==> return hello world", async () => {
//     const res = await supertest(app).get("/example");

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toEqual("Hello World");
//   });
// });

describe("Testing disease names", () => {
  it("GET /names ==> return all disease names", async () => {
    const res = await supertest(app).get("/diseases/names");
    // there should be a list a disease names
    expect(res.body.diseaseNames.length).toBeGreaterThanOrEqual(0);
    // there should be a log object
    expect(res.body.log).toEqual(expect.anything());
    // record all the disease names for other test cases
    diseaseNames = res.body.diseaseNames;
  });
});

describe("Testing disease route", () => {
  it("GET / ==> return all diseases info", async () => {
    const res = await supertest(app).get("/diseases");

    expect(res.statusCode).toEqual(200);
    // there should be a list of dis
    expect(res.body.diseaseInfo.length).toBeGreaterThanOrEqual(0);
    // for each disease:
    res.body.diseaseInfo.forEach(element => {
      // disease names should be a subset of names retrieved from "diseases/names"
      expect(diseaseNames).toEqual(expect.arrayContaining(element.report[0].diseases));
    });
  });
});

// describe("Testing disease")
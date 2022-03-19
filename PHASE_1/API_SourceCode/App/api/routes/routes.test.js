const app = require("../../app");
const supertest = require("supertest");
const diseaseResource = require("../../resources/disease_list.json");
let syndromes = require("../../resources/syndrome_list.json").map(obj => obj.name);
syndromes.push("unknown");
let diseaseNames = [];

describe("Testing all disease names", () => {
  it("GET /names ==> return all disease names", async () => {
    const res = await supertest(app).get("/diseases/names");
    // there should be a list a disease names
    expect(res.statusCode).toEqual(200);
    expect(res.body.diseaseNames.length).toBeGreaterThan(0);
    // there should be a log object
    expect(res.body.log).toEqual(expect.anything());
    // record all the disease names for other test cases
    diseaseNames = res.body.diseaseNames.map((n) => n.toUpperCase()).sort();
  });
  
});

describe("Testing all diseases info", () => {
  it("GET / ==> return all diseases info", async () => {
    const res = await supertest(app).get("/diseases");

    expect(res.statusCode).toEqual(200);
    const diseaseDict = res.body.diseasesInfo;
    // the fetched diseases matched exactly the names fetched from "diseases/names"
    const fetched_diseases = Object.keys(diseaseDict)
      .map((n) => n.toUpperCase())
      .sort();
    expect(fetched_diseases).toEqual(expect.arrayContaining(diseaseNames));
    expect(diseaseNames).toEqual(expect.arrayContaining(fetched_diseases));
    // for each disease we check if locations exist and syndromes are valid
    Object.keys(diseaseDict).forEach(disease => {
      expect(diseaseDict[disease].locations.length).toBeGreaterThan(0);
      expect(syndromes).toEqual(expect.arrayContaining(diseaseDict[disease].syndromes));
    });
    // there should be a log object
    expect(res.body.log).toEqual(expect.anything());
  });

  it("GET /names ==> return all disease info", async () => {
    const res = await supertest(app).get("/diseases?something=0");

    expect(res.statusCode).toEqual(200);
    const diseaseDict = res.body.diseasesInfo;
    // the fetched diseases matched exactly the names fetched from "diseases/names"
    const fetched_diseases = Object.keys(diseaseDict)
      .map((n) => n.toUpperCase())
      .sort();
    expect(fetched_diseases).toEqual(expect.arrayContaining(diseaseNames));
    expect(diseaseNames).toEqual(expect.arrayContaining(fetched_diseases));
    // for each disease we check if locations exist and syndromes are valid
    Object.keys(diseaseDict).forEach(disease => {
      expect(diseaseDict[disease].locations.length).toBeGreaterThan(0);
      expect(syndromes).toEqual(expect.arrayContaining(diseaseDict[disease].syndromes));
    });
    // there should be a log object
    expect(res.body.log).toEqual(expect.anything());
  });
});

describe("Testing all diseases reports", () => {
  it("GET / ==> return all disease reports", async () => {
    const res = await supertest(app).get("/diseases/reports");

    expect(res.statusCode).toEqual(200);
    const reportDict = res.body.reports;
    // there should be a reports array returned (could be empty)
    expect(reportDict).toEqual(expect.any(Array));
    // there should be a log object
    expect(res.body.log).toEqual(expect.any(Object));
  });
});

describe("Testing specified disease name", () => {
  it("GET /:disease ==> return info for the specified disease", async () => {
    for (let testDiseaseName of diseaseNames) {
      const res = await supertest(app).get("/diseases/" + testDiseaseName);

      expect(res.statusCode).toEqual(200);
      const disease = res.body;
      // check if the fetched the disease is the same as the passed in disease
      expect(disease.disease.toUpperCase()).toEqual(testDiseaseName);
      // check if locations exist
      expect(disease.locations.length).toBeGreaterThanOrEqual(0);
      // check if syndromes are valid
      expect(syndromes).toEqual(expect.arrayContaining(disease.syndromes));
      // check if the number of cases is a valid number
      expect(disease.number_of_cases).toBeGreaterThanOrEqual(0);
      // check if log exists
      expect(disease.log).toEqual(expect.anything());
    }
  });

  it("GET /:invalid-disease-name ==> return 404", async () => {
    const res = await supertest(app).get("/diseases/some-invalid-disease");
    expect(res.statusCode).toEqual(404);
  });
});

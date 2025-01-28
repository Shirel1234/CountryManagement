import app from "../../src/app";
import request from "supertest";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import { afterEach } from "node:test";
import { connectDB, clearDB, closeDB } from "../mocks/mongoose";

describe("Country Controller Tests", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  it("should create a new country", async () => {
    const newCountry = {
      name: "Testland",
      flag: "test.png",
      population: 5000,
      region: "Test Region",
    };

    const response = await request(app)
      .post("/api/countries")
      .send(newCountry)
      .expect(201);

    expect(response.body.name).toBe("Testland");
  });

  it("should fetch all countries", async () => {
    const response = await request(app).get("/api/countries").expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch a specific country by ID", async () => {
    const newCountry = {
      name: "Testland",
      flag: "test.png",
      population: 5000,
      region: "Test Region",
    };
    const savedCountry = await request(app)
      .post("/api/countries")
      .send(newCountry);

    const response = await request(app)
      .get(`/api/countries/${savedCountry.body._id}`)
      .expect(200);
    expect(response.body.name).toBe("Testland");
  });

  it("should update an existing country", async () => {
    const newCountry = {
      name: "Oldland",
      flag: "old.png",
      population: 3000,
      region: "Old Region",
    };
    const savedCountry = await request(app)
      .post("/api/countries")
      .send(newCountry);

    const updatedData = {
      name: "Newland",
      flag: "new.png",
      population: 6000,
      region: "New Region",
    };
    const response = await request(app)
      .put(`/api/countries/${savedCountry.body._id}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.name).toBe("Newland");
  });

  it("should delete a specific country", async () => {
    const newCountry = {
      name: "Deleteland",
      flag: "delete.png",
      population: 2000,
      region: "Delete Region",
    };
    const savedCountry = await request(app)
      .post("/api/countries")
      .send(newCountry);

    await request(app)
      .delete(`/api/countries/${savedCountry.body._id}`)
      .expect(204);

    const response = await request(app)
      .get(`/api/countries/${savedCountry.body._id}`)
      .expect(404);
    expect(response.body).toEqual({ error: "Country not found" });
  });
});

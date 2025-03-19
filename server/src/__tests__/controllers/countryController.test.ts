import { app } from "../../app";
import request from "supertest";
import { describe, expect, it } from "@jest/globals";
import { token } from "../setupTests";
import mongoose from "mongoose";
import {
  API_PREFIX,
  AUTHORIZATION_HEADER,
  COUNTRY_MESSAGES,
  COUNTRY_PREFIX,
  COUNTRY_ROUTES,
  HTTP_STATUS_CODES,
} from "../../constants";

const BASE_URL = `${API_PREFIX}${COUNTRY_PREFIX}`;

describe("Country Controller Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new country", async () => {
    const newCountry = {
      name: "Testland",
      flag: "https://example.com/test.png",
      population: 5000,
      region: "Test Region",
    };

    const response = await request(app)
      .post(`${BASE_URL}${COUNTRY_ROUTES.CREATE_COUNTRY}`)
      .set(AUTHORIZATION_HEADER(token))
      .send(newCountry)
      .expect(HTTP_STATUS_CODES.CREATED);

    expect(response.body.name).toBe("Testland");
  });

  it("should fetch all countries", async () => {
    const response = await request(app)
      .get(`${BASE_URL}${COUNTRY_ROUTES.GET_COUNTRIES}`)
      .set(AUTHORIZATION_HEADER(token))
      .expect(HTTP_STATUS_CODES.OK);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch a specific country by ID", async () => {
    const newCountry = {
      name: "Testland",
      flag: "https://example.com/test.png",
      population: 5000,
      region: "Test Region",
    };
    const savedCountry = await request(app)
      .post(`${BASE_URL}${COUNTRY_ROUTES.CREATE_COUNTRY}`)
      .set(AUTHORIZATION_HEADER(token))
      .send(newCountry);

    const response = await request(app)
      .get(
        `${BASE_URL}${COUNTRY_ROUTES.GET_COUNTRY_BY_ID.replace(
          ":id",
          savedCountry.body._id
        )}`
      )
      .set(AUTHORIZATION_HEADER(token))
      .expect(HTTP_STATUS_CODES.OK);
    expect(response.body.name).toBe("Testland");
  });

  it("should update an existing country", async () => {
    const newCountry = {
      name: "Oldland",
      flag: "https://example.com/old.png",
      population: 3000,
      region: "Old Region",
    };
    const savedCountry = await request(app)
      .post(`${BASE_URL}${COUNTRY_ROUTES.CREATE_COUNTRY}`)
      .set(AUTHORIZATION_HEADER(token))
      .send(newCountry);

    const updatedData = {
      name: "Newland",
      flag: "https://example.com/new.png",
      population: 6000,
      region: "New Region",
    };
    const response = await request(app)
      .put(
        `${BASE_URL}${COUNTRY_ROUTES.UPDATE_COUNTRY.replace(
          ":id",
          savedCountry.body._id
        )}`
      )
      .set(AUTHORIZATION_HEADER(token))
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.name).toBe("Newland");
  });

  it("should delete a specific country", async () => {
    const newCountry = {
      name: "Deleteland",
      flag: "https://example.com/delete.png",
      population: 2000,
      region: "Delete Region",
    };
    const savedCountry = await request(app)
      .post(`${BASE_URL}${COUNTRY_ROUTES.CREATE_COUNTRY}`)
      .set(AUTHORIZATION_HEADER(token))
      .send(newCountry);

    await request(app)
      .delete(
        `${BASE_URL}${COUNTRY_ROUTES.DELETE_COUNTRY.replace(
          ":id",
          savedCountry.body._id
        )}`
      )
      .set(AUTHORIZATION_HEADER(token))
      .expect(HTTP_STATUS_CODES.NO_CONTENT);

    const response = await request(app)
      .get(
        `${BASE_URL}${COUNTRY_ROUTES.GET_COUNTRY_BY_ID.replace(
          ":id",
          savedCountry.body._id
        )}`
      )
      .set(AUTHORIZATION_HEADER(token))
      .expect(HTTP_STATUS_CODES.NOT_FOUND);
    expect(response.body).toEqual({ error: COUNTRY_MESSAGES.NOT_FOUND });
  });
});

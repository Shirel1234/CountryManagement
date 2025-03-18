import { app } from "../../app";
import request from "supertest";
import { describe, expect, it } from "@jest/globals";
import { token } from "../setupTests";
import mongoose from "mongoose";
import {
  API_PREFIX,
  AUTHORIZATION_HEADER,
  CITY_MESSAGES,
  CITY_PREFIX,
  CITY_ROUTES,
  HTTP_STATUS_CODES,
} from "../../constants";

describe("City Controller Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new city", async () => {
    const newCity = {
      name: "Test City",
    };
    const response = await request(app)
      .post(`${API_PREFIX}${CITY_PREFIX}${CITY_ROUTES.CREATE_CITY}`)
      .set(AUTHORIZATION_HEADER(token))
      .send(newCity)
      .expect(HTTP_STATUS_CODES.CREATED);

    expect(response.body.name).toBe("Test City");
  });

  it("should fetch all cities", async () => {
    const response = await request(app)
      .get(`${API_PREFIX}${CITY_PREFIX}${CITY_ROUTES.GET_CITIES}`)
      .set(AUTHORIZATION_HEADER(token))
      .expect(HTTP_STATUS_CODES.OK);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch a specific city by ID", async () => {
    const newCity = {
      name: "Test Specific City",
    };
    const savedCity = await request(app)
      .post(`${API_PREFIX}${CITY_PREFIX}${CITY_ROUTES.CREATE_CITY}`)
      .set(AUTHORIZATION_HEADER(token))
      .send(newCity);

    const response = await request(app)
      .get(
        `${API_PREFIX}${CITY_PREFIX}${CITY_ROUTES.GET_CITY_BY_ID.replace(
          ":id",
          savedCity.body._id
        )}`
      )
      .set(AUTHORIZATION_HEADER(token))
      .expect(HTTP_STATUS_CODES.OK);
    expect(response.body.name).toBe("Test Specific City");
  });

  it("should update an existing city", async () => {
    const newCity = {
      name: "Old City",
    };
    const savedCity = await request(app)
      .post(`${API_PREFIX}${CITY_PREFIX}${CITY_ROUTES.CREATE_CITY}`)
      .set(AUTHORIZATION_HEADER(token))
      .send(newCity);

    const updatedData = {
      name: "New City",
    };
    const response = await request(app)
      .put(
        `${API_PREFIX}${CITY_PREFIX}${CITY_ROUTES.UPDATE_CITY.replace(
          ":id",
          savedCity.body._id
        )}`
      )
      .set(AUTHORIZATION_HEADER(token))
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.name).toBe("New City");
  });

  it("should delete a specific city", async () => {
    const newCity = {
      name: "Delete City",
    };
    const savedCity = await request(app)
      .post(`${API_PREFIX}${CITY_PREFIX}${CITY_ROUTES.CREATE_CITY}`)
      .set(AUTHORIZATION_HEADER(token))
      .send(newCity);

    await request(app)
      .delete(
        `${API_PREFIX}${CITY_PREFIX}${CITY_ROUTES.DELETE_CITY.replace(
          ":id",
          savedCity.body._id
        )}`
      )
      .set(AUTHORIZATION_HEADER(token))
      .expect(HTTP_STATUS_CODES.NO_CONTENT);

    const response = await request(app)
      .get(
        `${API_PREFIX}${CITY_PREFIX}${CITY_ROUTES.GET_CITY_BY_ID.replace(
          ":id",
          savedCity.body._id
        )}`
      )
      .set(AUTHORIZATION_HEADER(token))
      .expect(HTTP_STATUS_CODES.NOT_FOUND);
    expect(response.body).toEqual({ error: CITY_MESSAGES.CITY_NOT_FOUND });
  });
});

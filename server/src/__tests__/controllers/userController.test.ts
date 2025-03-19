import { app } from "../../app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { User } from "../../lib/models/userModel";
import mongoose from "mongoose";
import { token } from "../setupTests";
import {
  API_PREFIX,
  AUTHORIZATION_HEADER,
  HTTP_STATUS_CODES,
  USER_PREFIX,
  USER_ROUTES,
} from "../../constants";

const BASE_URL = `${API_PREFIX}${USER_PREFIX}`;

describe("User Controller Tests", () => {
  let userId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);

    const newUser = new User({
      firstName: "Test",
      lastName: "User",
      phone: "0587654321",
      username: "testuser",
      password: "testpass",
      email: "testuser@example.com",
    });

    const savedUser = await newUser.save();
    userId = savedUser._id.toString();
  });

  afterAll(async () => {
    await User.deleteMany({ username: { $ne: "admin" } });
    await mongoose.connection.close();
  });

  it("should create a new user", async () => {
    const newUser = {
      firstName: "Alice",
      lastName: "Smith",
      phone: "0587654321",
      username: "alice",
      password: "alicepass",
      email: "alice@example.com",
    };

    const response = await request(app)
      .post(`${BASE_URL}${USER_ROUTES.CREATE_USER}`)
      .set(AUTHORIZATION_HEADER(token))
      .send(newUser)
      .expect(HTTP_STATUS_CODES.CREATED);

    expect(response.body.username).toBe("alice");
  });

  it("should fetch all users", async () => {
    const response = await request(app)
      .get(`${BASE_URL}${USER_ROUTES.GET_USERS}`)
      .set(AUTHORIZATION_HEADER(token))
      .expect(HTTP_STATUS_CODES.OK);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch a specific user by ID", async () => {
    const response = await request(app)
      .get(`${BASE_URL}${USER_ROUTES.GET_USER_BY_ID.replace(":id", userId)}`)
      .set(AUTHORIZATION_HEADER(token))
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body._id).toBe(userId);
  });

  it("should update an existing user", async () => {
    const updatedData = {
      firstName: "Johnny",
      lastName: "Dough",
      phone: "0534567899",
    };

    const response = await request(app)
      .put(`${BASE_URL}${USER_ROUTES.UPDATE_USER.replace(":id", userId)}`)
      .set(AUTHORIZATION_HEADER(token))
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.firstName).toBe("Johnny");
  });

  it("should delete a specific user", async () => {
    await request(app)
      .delete(`${BASE_URL}${USER_ROUTES.DELETE_USER.replace(":id", userId)}`)
      .set(AUTHORIZATION_HEADER(token))
      .expect(HTTP_STATUS_CODES.NO_CONTENT);

    const response = await request(app)
      .get(`${BASE_URL}${USER_ROUTES.GET_USER_BY_ID.replace(":id", userId)}`)
      .set(AUTHORIZATION_HEADER(token));

    expect(response.status).toBe(HTTP_STATUS_CODES.NOT_FOUND);
  });
});

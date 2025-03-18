import {app} from "../../app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import mongoose from "mongoose";
import { User } from "../../lib/models/userModel";
import { AUTH_PREFIX, AUTH_ROUTES, HTTP_STATUS_CODES } from "../../constants";

describe("Auth Controller Tests", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
  });

  afterAll(async () => {
    await User.deleteMany({ username: { $ne: 'admin' } });
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const newUser = {
      firstName: "Test",
      lastName: "Test",
      phone: "0545252478",
      username: "test",
      password: "test1234",
      email: "test@example.com",
    };

    const response = await request(app)
      .post(`${AUTH_PREFIX}${AUTH_ROUTES.REGISTER}`)
      .send(newUser)
      .expect(HTTP_STATUS_CODES.CREATED);

    expect(response.body.myUsername).toBe("test");
    expect(response.body.message).toBe("Registration successful.");
  });

  it("should fail to register a user with missing required fields", async () => {
    const incompleteUser = {
      firstName: "Dan",
      username: "admin",
      password: "adminpass",
    };

    const response = await request(app)
      .post(`${AUTH_PREFIX}${AUTH_ROUTES.REGISTER}`)
      .send(incompleteUser)
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.message).toBe("Missing required fields.");
  });

  it("should log in an existing user", async () => {
    const newUser = {
      firstName: "TestTwo",
      lastName: "TestTwo",
      phone: "0545252478",
      username: "test2",
      password: "test21234",
      email: "test2@example.com",
    };

    await request(app).post(`${AUTH_PREFIX}${AUTH_ROUTES.REGISTER}`).send(newUser).expect(HTTP_STATUS_CODES.CREATED);

    const loginResponse = await request(app)
      .post(`${AUTH_PREFIX}${AUTH_ROUTES.LOGIN}`)
      .send({ username: "test2", password: "test21234" })
      .expect(HTTP_STATUS_CODES.OK);

    expect(loginResponse.body.message).toBe("Login successful.");
  });

  it("should fail to log in with invalid credentials", async () => {
    const loginResponse = await request(app)
      .post(`${AUTH_PREFIX}${AUTH_ROUTES.LOGIN}`)
      .send({ username: "admin", password: "wrongpass" })
      .expect(HTTP_STATUS_CODES.UNAUTHORIZED);

    expect(loginResponse.body.message).toBe("Invalid username or password.");
  });

  it("should log out successfully", async () => {
    const newUser = {
      firstName: "Dan",
      lastName: "Dahan",
      phone: "0545252478",
      username: "DanTest",
      password: "adminpass",
      email: "dantest@example.com",
    };

    await request(app).post(`${AUTH_PREFIX}${AUTH_ROUTES.REGISTER}`).send(newUser).expect(HTTP_STATUS_CODES.CREATED);
    const loginResponse = await request(app)
      .post(`${AUTH_PREFIX}${AUTH_ROUTES.LOGIN}`)
      .send({ username: "DanTest", password: "adminpass" })
      .expect(HTTP_STATUS_CODES.OK);

    let token = loginResponse.body.token;

    const logoutResponse = await request(app)
      .post(`${AUTH_PREFIX}${AUTH_ROUTES.LOGOUT}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.OK);

    expect(logoutResponse.body.message).toBe("Logout successful.");
  });

  it("should return a 400 error if username or password is missing in login", async () => {
    const response = await request(app)
      .post(`${AUTH_PREFIX}${AUTH_ROUTES.LOGIN}`)
      .send({ username: "admin" })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.message).toBe("Username and password are required.");
  });

});

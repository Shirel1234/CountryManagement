import {app} from "../../app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { afterEach } from "node:test";
import { User } from "../../lib/models/userModel";
import mongoose from "mongoose";
import { RequestAccessAction, RequestAccessStatus } from "../../constants/requestAccessEnum";
import { token } from "../setupTests";
import { RequestAccess } from "../../lib/models/requestAccessModel";
import { HTTP_STATUS_CODES } from "../../constants";


describe("Request Access Controller Tests", () => {
  let userId;
  let tokenUser;
  
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);

    const registerResponse = await request(app)
      .post("/auth/register")
      .send({
        firstName: "John",
        lastName: "Doe",
        phone: "0524567890",
        username: "user1",
        password: "password123",
        email: "user@example.com",
      })
      .expect(HTTP_STATUS_CODES.CREATED);
    
    userId = registerResponse.body.myId;
    const loginResponse = await request(app)
      .post("/auth/login")
      .send({ username: "user1", password: "password123" })
      .expect(HTTP_STATUS_CODES.OK);
    
      tokenUser = loginResponse.body.token;
  });

  afterAll(async () => {
    await RequestAccess.deleteMany({ });
    await mongoose.connection.close();
    
  });

  it("should create a new access request", async () => {
    const response = await request(app)
      .post("/api/request-access")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send({ action: RequestAccessAction.UPDATE })
      .expect(HTTP_STATUS_CODES.CREATED);

    expect(response.body.message).toBe("Request submitted");
  });

  it("should fetch all access requests", async () => {
    const response = await request(app)
      .get("/api/request-access")
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.OK);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch access requests by user ID", async () => {
    const response = await request(app)
      .get(`/api/request-access/${userId}`)
      .set("Authorization", `Bearer ${tokenUser}`)
      .expect(HTTP_STATUS_CODES.OK);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should process an access request and update status", async () => {
    const requestResponse = await request(app)
      .post("/api/request-access")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send({ action: RequestAccessAction.UPDATE })
      .expect(HTTP_STATUS_CODES.CREATED);
    
    const requestId = requestResponse.body.request._id;
    
    const updateResponse = await request(app)
      .patch(`/api/request-access/${requestId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: RequestAccessStatus.APPROVED })
      .expect(HTTP_STATUS_CODES.OK);
    
    expect(updateResponse.body.message).toBe("Request approved");
  });
});

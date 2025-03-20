import { app } from "../../app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { User } from "../../lib/models/userModel";
import {
  PASSWORD_RESET_MESSAGES,
  HTTP_STATUS_CODES,
  PASSWORD_RESET_ROUTES,
  API_PREFIX,
} from "../../constants";
import { PasswordReset } from "../../lib/models/passwordResetModel";
import crypto from "crypto";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

describe("Password Reset Controller Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
  });

  afterAll(async () => {
    await User.deleteMany({ username: { $ne: "admin" } });
    await mongoose.connection.close();
  });

  it("should return an error if email is missing in requestPasswordReset", async () => {
    const response = await request(app)
      .post(`${API_PREFIX}${PASSWORD_RESET_ROUTES.REQUEST_PASSWORD_RESET}`)
      .send({});
    expect(response.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
    expect(response.body.message).toBe(PASSWORD_RESET_MESSAGES.EMAIL_REQUIRED);
  });

  it("should send a password reset email", async () => {
    const response = await request(app)
      .post(`${API_PREFIX}${PASSWORD_RESET_ROUTES.REQUEST_PASSWORD_RESET}`)
      .send({ email: "dan111@example.com" });
    expect(response.status).toBe(HTTP_STATUS_CODES.OK);
    expect(response.body.message).toBe(PASSWORD_RESET_MESSAGES.EMAIL_SENT);
  });

  it("should return an error if token or newPassword is missing in resetPasswordHandler", async () => {
    const response = await request(app)
      .post(`${API_PREFIX}${PASSWORD_RESET_ROUTES.RESET_PASSWORD}`)
      .send({});
    expect(response.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
    expect(response.body.message).toBe(
      PASSWORD_RESET_MESSAGES.TOKEN_PASSWORD_REQUIRED
    );
  });

  it("should successfully reset the password", async () => {
    const user = await User.create({
      firstName: "Dan",
      lastName: "Dahan",
      phone: "0545252479",
      username: "dan",
      password: "oldPassword123",
      email: "dan@example.com",
    });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    await PasswordReset.create({
      userId: user._id,
      resetToken,
      expiresAt,
    });

    const newPassword = "newPassword123";

    const response = await request(app)
      .post(`${API_PREFIX}${PASSWORD_RESET_ROUTES.RESET_PASSWORD}`)
      .send({ token: resetToken, newPassword });
    expect(response.status).toBe(HTTP_STATUS_CODES.OK);
    expect(response.body.message).toBe(
      PASSWORD_RESET_MESSAGES.PASSWORD_RESET_SUCCESS
    );

    const updatedUser = await User.findById(user._id);
    const isPasswordMatch = await bcrypt.compare(
      newPassword,
      updatedUser.password
    );
    expect(isPasswordMatch).toBe(true);
  });
});

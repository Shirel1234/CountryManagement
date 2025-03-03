import { Request, Response } from "express";
import {
  sendPasswordResetEmail,
  resetPassword,
} from "../services/passwordResetService";
import { HTTP_STATUS_CODES } from "../constants";

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ message: "Email is required." });
    return;
  }
  try {
    await sendPasswordResetEmail(email);
    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: "Password reset email sent." });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server errors: ${error}` });
  }
};
export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ message: "Token and new password are required." });
  } else {
    try {
      await resetPassword(token, newPassword);
      res
        .status(HTTP_STATUS_CODES.OK)
        .json({ message: "Password successfully reset." });
    } catch (error) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error." });
    }
  }
};

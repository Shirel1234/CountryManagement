import { Request, Response } from "express";
import {
  sendPasswordResetEmail,
  resetPassword,
} from "../services/passwordResetService";

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required." });
    return;
  }
  try {
    await sendPasswordResetEmail(email);
    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    res.status(500).json({ message: `Internal server errors: ${error}` });
  }
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    res.status(400).json({ message: "Token and new password are required." });
  } else {
    try {
      await resetPassword(token, newPassword);
      res.status(200).json({ message: "Password successfully reset." });
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  }
};

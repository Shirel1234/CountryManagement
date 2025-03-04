import { Request, Response } from "express";
import {
  sendPasswordResetEmail,
  resetPassword,
} from "../services/passwordResetService";
import { HTTP_STATUS_CODES, PASSWORD_RESET_MESSAGES } from "../constants";

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ message: PASSWORD_RESET_MESSAGES.EMAIL_REQUIRED });
    return;
  }
  try {
    await sendPasswordResetEmail(email);
    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: PASSWORD_RESET_MESSAGES.EMAIL_SENT });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({
        message: `${PASSWORD_RESET_MESSAGES.INTERNAL_SERVER_ERROR} ${error}`,
      });
  }
};
export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ message: PASSWORD_RESET_MESSAGES.TOKEN_PASSWORD_REQUIRED });
  } else {
    try {
      await resetPassword(token, newPassword);
      res
        .status(HTTP_STATUS_CODES.OK)
        .json({ message: PASSWORD_RESET_MESSAGES.PASSWORD_RESET_SUCCESS });
    } catch (error) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: PASSWORD_RESET_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }
};

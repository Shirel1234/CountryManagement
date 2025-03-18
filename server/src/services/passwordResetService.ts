import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";
import { User } from "../lib/models/userModel";
import { PasswordReset } from "../lib/models/passwordResetModel";
import nodemailer from "nodemailer";
import { IUser } from "../lib/types/user";
import logger from "../utils/logger";
import {
  EMAIL_USER,
  FRONTEND_URL,
  LOGGER_MESSAGES_PASSWORD_RESET,
  PASSWORD_RESET_EMAIL_TEXT,
  PASSWORD_RESET_EXPIRATION,
  PASSWORD_RESET_SUBJECT,
  TRANSPORTER,
} from "../constants";

dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

const transporter = nodemailer.createTransport(TRANSPORTER);

export const sendPasswordResetEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.error(`${LOGGER_MESSAGES_PASSWORD_RESET.USER_NOT_FOUND} ${email}`);
      return null;
    }

    const resetTokenEntry = await createPasswordResetEntry(user);
    const resetLink = `${FRONTEND_URL}/reset-password?token=${resetTokenEntry.resetToken}`;

    const mailOptions = {
      from: EMAIL_USER,
      to: user.email,
      subject: PASSWORD_RESET_SUBJECT,
      text: PASSWORD_RESET_EMAIL_TEXT(resetLink),
    };

    await transporter.sendMail(mailOptions);
    logger.info(`${LOGGER_MESSAGES_PASSWORD_RESET.RESET_EMAIL_SENT} ${email}`);
  } catch (error) {
    logger.error(
      `${LOGGER_MESSAGES_PASSWORD_RESET.ERROR_SENDING_RESET_EMAIL} ${error.message}`
    );
    throw error;
  }
};
const createPasswordResetEntry = async (user: IUser) => {
  try {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + PASSWORD_RESET_EXPIRATION);

    const passwordResetEntry = new PasswordReset({
      userId: user._id,
      resetToken,
      expiresAt,
    });

    await passwordResetEntry.save();
    logger.info(
      `${LOGGER_MESSAGES_PASSWORD_RESET.RESET_SUCCESSFUL} ${user._id}`
    );
    return passwordResetEntry;
  } catch (error) {
    logger.error(
      `${LOGGER_MESSAGES_PASSWORD_RESET.ERROR_CREATING_RESET_ENTRY} ${user._id}: ${error.message}`
    );
    throw error;
  }
};
export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const passwordResetEntry = await PasswordReset.findOne({
      resetToken: token,
      expiresAt: { $gt: new Date() },
    }).populate("userId");

    if (!passwordResetEntry) {
      logger.warn(LOGGER_MESSAGES_PASSWORD_RESET.INVALID_OR_EXPIRED_TOKEN);
      throw new Error(LOGGER_MESSAGES_PASSWORD_RESET.INVALID_OR_EXPIRED_TOKEN);
    }

    const user = await User.findById(passwordResetEntry.userId);
    if (!user) {
      logger.warn(
        `${LOGGER_MESSAGES_PASSWORD_RESET.USER_NOT_FOUND_FOR_RESET_TOKEN} ${token}`
      );
      throw new Error(
        LOGGER_MESSAGES_PASSWORD_RESET.USER_NOT_FOUND_FOR_RESET_TOKEN
      );
    }

    user.password = newPassword;
    await user.save();
    await PasswordReset.findByIdAndDelete(passwordResetEntry._id);
    logger.info(
      `${LOGGER_MESSAGES_PASSWORD_RESET.RESET_SUCCESSFUL} ${user._id}`
    );
  } catch (error) {
    logger.error(
      `${LOGGER_MESSAGES_PASSWORD_RESET.ERROR_RESETTING_PASSWORD} ${error.message}`
    );
    throw error;
  }
};

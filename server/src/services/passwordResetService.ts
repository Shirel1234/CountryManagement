import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { User } from "../lib/models/userModel";
import { PasswordReset } from "../lib/models/passwordResetModel";
import nodemailer from "nodemailer";
import { IUser } from "../types/user";
import logger from "../utils/logger";

dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordResetEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.error(`User not found for email: ${email}`);
      throw new Error("User not found");
    }

    const resetTokenEntry = await createPasswordResetEntry(user);
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetTokenEntry.resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: `You can reset your password using the following link:${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Password reset email sent to ${email}`);
  } catch (error) {
    logger.error(`Error sending password reset email: ${error.message}`);
    throw error;
  }
};

// Create password reset entry in DB
const createPasswordResetEntry = async (user: IUser) => {
  try {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000);

    const passwordResetEntry = new PasswordReset({
      userId: user._id,
      resetToken,
      expiresAt,
    });

    await passwordResetEntry.save();
    logger.info(`Password reset entry created for user ${user._id}`);
    return passwordResetEntry;
  } catch (error) {
    logger.error(
      `Error creating password reset entry for user ${user._id}: ${error.message}`
    );
    throw error;
  }
};

// Reset user password using token
export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const passwordResetEntry = await PasswordReset.findOne({
      resetToken: token,
      expiresAt: { $gt: new Date() },
    }).populate("userId");

    if (!passwordResetEntry) {
      logger.warn("Invalid or expired password reset token");
      throw new Error("Invalid or expired token");
    }

    const user = await User.findById(passwordResetEntry.userId);
    if (!user) {
      logger.warn(`User not found for reset token: ${token}`);
      throw new Error("User not found");
    }

    user.password = newPassword;
    await user.save();
    await PasswordReset.findByIdAndDelete(passwordResetEntry._id);
    logger.info(`Password reset successful for user ${user._id}`);
    
  } catch (error) {
    logger.error(`Error resetting password: ${error.message}`);
    throw error;
  }
};

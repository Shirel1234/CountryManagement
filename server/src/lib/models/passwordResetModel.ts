import mongoose, { Schema } from "mongoose";
import { IPasswordReset } from "../types/passwordReset";

const passwordResetSchema = new Schema<IPasswordReset>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resetToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const PasswordReset = mongoose.model<IPasswordReset>(
  "PasswordReset",
  passwordResetSchema
);

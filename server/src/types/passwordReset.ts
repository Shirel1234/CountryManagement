import { Document, ObjectId } from "mongoose";

export interface IPasswordReset extends Document {
  userId: ObjectId;
  resetToken: string;
  expiresAt: Date;
}
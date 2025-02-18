import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IRequestAccess extends Document {
    _id: string,
    userId: mongoose.Types.ObjectId;
    action: "add" | "update" | "delete";
    status: "pending" | "approved" | "denied";
    createdAt: Date;
  }
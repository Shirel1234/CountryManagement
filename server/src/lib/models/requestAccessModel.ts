import mongoose, { Schema } from "mongoose";
import { IRequestAccess } from "../../types/requestAccess";

const RequestAccessSchema = new Schema<IRequestAccess>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, enum: ["add", "update", "delete"], required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const RequestAccess = mongoose.model<IRequestAccess>(
  "RequestAccess",
  RequestAccessSchema
);

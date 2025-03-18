import mongoose, { Schema } from "mongoose";
import { IRequestAccess } from "../types/requestAccess";
import {
  RequestAccessAction,
  RequestAccessStatus,
} from "../../constants/requestAccessEnum";

const RequestAccessSchema = new Schema<IRequestAccess>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: {
      type: String,
      enum: Object.values(RequestAccessAction),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(RequestAccessStatus),
      default: RequestAccessStatus.PENDING,
    },
  },
  { timestamps: true }
);

export const RequestAccess = mongoose.model<IRequestAccess>(
  "RequestAccess",
  RequestAccessSchema
);

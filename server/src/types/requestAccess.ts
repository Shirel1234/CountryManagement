import mongoose from "mongoose";
import { Document } from "mongoose";
import { RequestAccessAction, RequestAccessStatus } from "../constants/requestAccessEnum";

export interface IRequestAccess extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  action: RequestAccessAction;
  status: RequestAccessStatus;
  createdAt: Date;
  updatedAt: Date;
}

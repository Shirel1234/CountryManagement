import { RequestAccessAction, RequestAccessStatus } from "../constants/requestAccessEnum";

export interface IRequestAccess {
  _id: string;
  userId: { username: string } | null;
  action: RequestAccessAction;
  status: RequestAccessStatus;
  createdAt: Date;
  updatedAt: Date;
}

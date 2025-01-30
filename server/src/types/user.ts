import { Document } from "mongoose";
export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  profileImage?: string;
  password: string;
  accessLevel: number;
}

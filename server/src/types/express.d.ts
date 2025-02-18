import { IUser } from './user'; 
import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: IUser;  
  }
}

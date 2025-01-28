import { Document } from "mongoose";
export interface ICountry extends Document {
  _id: string | undefined;
  name: string;
  flag: string;
  population: number;
  region: string;
}

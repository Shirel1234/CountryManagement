import { Document } from "mongoose";
export interface ICountry extends Document {
    name: string;
    flag: string;
    population: number;
    region: string;
  }
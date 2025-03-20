import { ICity } from "./city";

export interface ICountry {
  _id: string;
  name: string;
  flag: string;
  population: number;
  region: string;
  cities: ICity[];
}

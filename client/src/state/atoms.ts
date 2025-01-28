import { atom } from "recoil";
import { ICountry } from "../types/country";

export const selectedCountryState = atom<ICountry | null>({
  key: "selectedCountryState",
  default: null,
});

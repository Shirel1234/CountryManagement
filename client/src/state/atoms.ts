import { atom } from "recoil";
import { ICountry } from "../types/country";

export const isLoggedInState = atom<boolean>({
  key: "isLoggedInState", 
  default: false, 
});
export const selectedCountryState = atom<ICountry | null>({
  key: "selectedCountryState",
  default: null,
});
export const userAccessLevelState = atom({
  key: 'userAccessLevelState', 
  default: 1, 
});



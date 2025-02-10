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
export const userState = atom({
  key: 'userState', 
  default: {
    username: '',
    profileImage: '',
  }, 
});



import { atom } from "recoil";
import { ICountry } from "../api/types/country";

export const selectedCountryState = atom<ICountry | null>({
  key: "selectedCountryState",
  default: null,
});
export const userAccessLevelState = atom({
  key: 'userAccessLevelState', 
  default: 1, 
});

export const userState = atom({
  key: "userState",
  default: {
    myId: "",
    myUsername: "",
    myProfileImage: "",
  },
});


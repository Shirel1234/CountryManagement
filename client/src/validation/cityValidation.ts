import * as Yup from "yup";
import { VALIDATION_MESSAGES_CITY } from "../constants";

export const cityValidationSchema = Yup.object({
  name: Yup.string()
    .required(VALIDATION_MESSAGES_CITY.REQUIRED)
    .min(3, VALIDATION_MESSAGES_CITY.MIN_LENGTH)
    .matches(/^[^\d]+$/, VALIDATION_MESSAGES_CITY.NO_NUMBERS),
});

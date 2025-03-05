import * as Yup from "yup";
import {
  VALIDATION_MESSAGES_CITY,
  VALIDATION_MESSAGES_COUNTRY,
} from "../constants";

export const countryValidationSchema = Yup.object({
  name: Yup.string()
    .required(VALIDATION_MESSAGES_COUNTRY.NAME_REQUIRED)
    .min(3, VALIDATION_MESSAGES_COUNTRY.NAME_MIN_LENGTH)
    .matches(/^[^\d]+$/, VALIDATION_MESSAGES_COUNTRY.NAME_NO_NUMBERS),
  flag: Yup.string()
    .required(VALIDATION_MESSAGES_COUNTRY.FLAG_REQUIRED)
    .matches(
      /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i,
      VALIDATION_MESSAGES_COUNTRY.FLAG_INVALID
    ),
  population: Yup.number()
    .required(VALIDATION_MESSAGES_COUNTRY.POPULATION_REQUIRED)
    .min(0, VALIDATION_MESSAGES_COUNTRY.POPULATION_MIN),
  region: Yup.string()
    .required(VALIDATION_MESSAGES_COUNTRY.REGION_REQUIRED)
    .matches(/^[^\d]+$/, VALIDATION_MESSAGES_COUNTRY.REGION_NO_NUMBERS),
  cities: Yup.array()
    .of(
      Yup.object({
        _id: Yup.string().required(VALIDATION_MESSAGES_CITY.ID_REQUIRED),
        name: Yup.string()
          .required(VALIDATION_MESSAGES_CITY.REQUIRED)
          .matches(/^[^\d]+$/, VALIDATION_MESSAGES_CITY.NO_NUMBERS),
      })
    )
    .default([]),
});

import mongoose, { Schema, Types } from "mongoose";
import { ICountry } from "../types/country";
import { COUNTRY_VALIDATION } from "../../constants";

const countrySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, COUNTRY_VALIDATION.NAME_TOO_SHORT],
      validate: {
        validator: (value: string) => /^[^\d]+$/.test(value.trim()),
        message: COUNTRY_VALIDATION.NAME_INVALID,
      },
    },
    flag: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) =>
          /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(value),
        message: COUNTRY_VALIDATION.FLAG_INVALID,
      },
    },
    population: {
      type: Number,
      required: true,
      min: [0, COUNTRY_VALIDATION.POPULATION_NEGATIVE],
      validate: {
        validator: (value: number) => value >= 0,
        message: COUNTRY_VALIDATION.POPULATION_NEGATIVE,
      },
    },
    region: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => /^[^\d]+$/.test(value.trim()),
        message: COUNTRY_VALIDATION.REGION_INVALID,
      },
    },
    cities: [
      {
        type: Schema.Types.ObjectId,
        ref: "City",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Country = mongoose.model<ICountry>("Country", countrySchema);

export default Country;

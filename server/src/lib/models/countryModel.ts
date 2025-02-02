import mongoose, { Schema } from "mongoose";
import { ICountry } from "../../types/country";

const countrySchema: Schema = new Schema({
  name: { type: String, required: true },
  flag: { type: String, required: true },
  population: {
    type: Number,
    required: true,
    validate: {
      validator: (value: number) => value >= 0,
      message: "Population cannot be a negative number.",
    },
  },
  region: { type: String, required: true },
  cities: { type: [String], default: [] },
});

const Country = mongoose.model<ICountry>("Country", countrySchema);

export default Country;

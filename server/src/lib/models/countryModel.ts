import mongoose, { Schema } from "mongoose";
import { ICountry } from "../../types/country";

const countrySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name should have at least 3 characters."],
      validate: {
        validator: (value: string) => /^[^\d]+$/.test(value.trim()),
        message: "Name must not contain numbers.",
      },
    },
    flag: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) =>
          /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(value),
        message: "Flag should be a valid image URL (jpg, jpeg, png, gif).",
      },
    },
    population: {
      type: Number,
      required: true,
      min: [0, "Population cannot be a negative number."],
      validate: {
        validator: (value: number) => value >= 0,
        message: "Population cannot be a negative number.",
      },
    },
    region: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => /^[^\d]+$/.test(value.trim()),
        message: "Region must not contain numbers.",
      },
    },
    cities: {
      type: [String],
      default: [],
      validate: {
        validator: (value: string[]) =>
          value.every((city) => /^[^\d]+$/.test(city)),
        message:
          "Cities must not contain numbers",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Country = mongoose.model<ICountry>("Country", countrySchema);

export default Country;

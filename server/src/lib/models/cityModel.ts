import mongoose, { Schema } from "mongoose";
import { ICity } from "../types/city";
import { CITY_VALIDATION } from "../../constants";

const citySchema = new Schema<ICity>({
  name: {
    type: String,
    required: true,
    minlength: [3, CITY_VALIDATION.NAME_TOO_SHORT],
    validate: {
      validator: (value: string) => /^[^\d]+$/.test(value.trim()),
      message: CITY_VALIDATION.NAME_INVALID,
    },
  },
});

export const City = mongoose.model<ICity>("City", citySchema);

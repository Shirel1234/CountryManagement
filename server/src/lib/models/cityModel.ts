import mongoose, { Schema } from "mongoose";
import { ICity } from "../../types/city";

const citySchema = new Schema<ICity>({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name should have at least 3 characters."],
    validate: {
      validator: (value: string) => /^[^\d]+$/.test(value.trim()),
      message: "Name must not contain numbers.",
    },
  },
});

export const City = mongoose.model<ICity>("City", citySchema);

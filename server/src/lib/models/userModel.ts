import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../../types/user";
import { AccessLevel } from "../../types/accessLevel";

// Define the User schema
const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [2, "First name must have at least 2 characters."],
      validate: {
        validator: (value: string) => /^[A-Za-z]+$/.test(value), 
        message: "First name can only contain letters.",
      },
    },
    lastName: {
      type: String,
      required: true,
      minlength: [2, "Last name must have at least 2 characters."],
      validate: {
        validator: (value: string) => /^[A-Za-z]+$/.test(value), 
        message: "Last name can only contain letters.",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => /^[A-Za-z0-9_]+$/.test(value), 
        message: "Username can only contain letters, numbers, and underscores.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Please provide a valid email address.",
      ],
    },
    phone: {
      type: String,
      required: true,
      match: [
        /^05\d{8}$/,
        "Please provide a valid phone number (e.g., +1234567890).",
      ],
    },
    profileImage: {
      type: String,
      required: false,
      match: [
        /^(https?:\/\/.*\.(jpg|jpeg|png|gif))$|^([a-zA-Z0-9_\-]+\.(jpg|jpeg|png|gif))$/i,
        "Profile image must be a valid image URL (jpg, jpeg, png, gif) or a valid local file name (jpg, jpeg, png, gif)."
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must have at least 6 characters."],
    },
    accessLevel: {
      type: Number,
      required: true,
      enum:  Object.values(AccessLevel).filter((v) => typeof v === "number"),
      default: AccessLevel.VIEWER,
    },
  },
  {
    timestamps: true, 
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const saltRounds = 10;
  if (typeof this.password !== "string") {
    throw new Error("Password must be a string");
  }
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

export const User = mongoose.model<IUser>("User", UserSchema);

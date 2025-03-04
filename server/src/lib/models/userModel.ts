import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../../types/user";
import { AccessLevel } from "../../constants/accessLevelEnum";
import { USER_VALIDATION } from "../../constants";

// Define the User schema
const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [2, USER_VALIDATION.FIRST_NAME_TOO_SHORT],
      validate: {
        validator: (value: string) => /^[A-Za-z]+$/.test(value),
        message: USER_VALIDATION.FIRST_NAME_INVALID,
      },
    },
    lastName: {
      type: String,
      required: true,
      minlength: [2, USER_VALIDATION.LAST_NAME_TOO_SHORT],
      validate: {
        validator: (value: string) => /^[A-Za-z]+$/.test(value),
        message: USER_VALIDATION.LAST_NAME_INVALID,
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => /^[A-Za-z0-9_]+$/.test(value),
        message: USER_VALIDATION.USERNAME_INVALID,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        USER_VALIDATION.EMAIL_INVALID,
      ],
    },
    phone: {
      type: String,
      required: true,
      match: [/^05\d{8}$/, USER_VALIDATION.PHONE_INVALID],
    },
    profileImage: {
      type: String,
      required: false,
      match: [
        /^(https?:\/\/.*\.(jpg|jpeg|png|gif))$|^([a-zA-Z0-9_\-]+\.(jpg|jpeg|png|gif))$/i,
        USER_VALIDATION.PROFILE_IMAGE_INVALID,
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, USER_VALIDATION.PASSWORD_TOO_SHORT],
    },
    accessLevel: {
      type: Number,
      required: true,
      enum: Object.values(AccessLevel).filter((v) => typeof v === "number"),
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
    throw new Error(USER_VALIDATION.PASSWORD_INVALID);
  }
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

export const User = mongoose.model<IUser>("User", UserSchema);

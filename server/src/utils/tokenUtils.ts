import jwt from "jsonwebtoken";
import { IUser } from "../lib/types/user";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user: IUser): string => {
  const payload = {
    id: user._id,
    email: user.email,
    accessLevel: user.accessLevel,
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const expiresIn = process.env.JWT_EXPIRES_IN
    ? eval(process.env.JWT_EXPIRES_IN)
    : 7 * 24 * 60 * 60 * 1000;

  return jwt.sign(payload, secret, { expiresIn });
};

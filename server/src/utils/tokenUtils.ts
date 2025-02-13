import jwt from "jsonwebtoken";
import { IUser } from "../types/user";

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

  const expiresIn = parseInt(process.env.JWT_EXPIRES_IN || "3600");

  return jwt.sign(payload, secret, { expiresIn });
};


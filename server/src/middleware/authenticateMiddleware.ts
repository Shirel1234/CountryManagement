import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../lib/models/userModel";
import dotenv from "dotenv";
import logger from "../utils/logger";
import { HTTP_STATUS_CODES } from "../constants";
dotenv.config();

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.originalUrl === '/api/request-password-reset' || req.originalUrl === '/api/reset-password') {
    console.log("goodddddddddd")
    return next();
  }
  const token = req.cookies.token;
  if (!token) {
    logger.warn("Access attempt without token.");
    res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: "Access denied. No token provided." });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      id: string;
      accessLevel: number;
    };

    const user = await User.findById(decoded.id);
    if (!user) {
      logger.warn("User not found with ID: ", decoded.id);
      res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: "User not found." });
      return;
    }
    res.locals.id = decoded.id;
    res.locals.accessLevel = decoded.accessLevel;

    next();
  } catch (error) {
    logger.error("JWT Verification Error:", error);
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ message: "Invalid token." });
    return;
  }
};

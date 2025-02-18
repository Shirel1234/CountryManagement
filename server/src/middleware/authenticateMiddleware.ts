import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../lib/models/userModel";
import dotenv from "dotenv";
import logger from "../utils/logger";
dotenv.config();

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    logger.warn("Access attempt without token.");
    res.status(401).json({ message: "Access denied. No token provided." });
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
      res.status(401).json({ message: "User not found." });
      return;
    }
    res.locals.id = decoded.id;
    res.locals.accessLevel = decoded.accessLevel;

    next();
  } catch (error) {
    logger.error("JWT Verification Error:", error);
    res.status(400).json({ message: "Invalid token." });
    return;
  }
};

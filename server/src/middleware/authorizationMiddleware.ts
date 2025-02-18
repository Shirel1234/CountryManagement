// src/middleware/authorizationMiddleware.ts

import { NextFunction, Request, Response } from "express";
import { AccessLevel } from "../types/accessLevel";
import logger from "../utils/logger";

export const checkAccessLevel = (requiredLevel: AccessLevel) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.id;
    if (!userId) {
      logger.warn("User not authenticated.");
      res.status(401).json({ message: "User not authenticated." });
      return;
    }
    const userAccessLevel = res.locals.accessLevel;
    if (userAccessLevel >= requiredLevel) {
      logger.info("Access granted.");
      next();
    } else {
      logger.error("Access denied: Insufficient permissions.");
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }
  };
};

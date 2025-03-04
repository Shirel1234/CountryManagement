import { NextFunction, Request, Response } from "express";
import { AccessLevel } from "../constants/accessLevelEnum";
import logger from "../utils/logger";
import { AUTHORIZATION_MESSAGES, HTTP_STATUS_CODES } from "../constants";

export const checkAccessLevel = (requiredLevel: AccessLevel) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.id;
    if (!userId) {
      logger.warn(AUTHORIZATION_MESSAGES.USER_NOT_AUTHENTICATED);
      res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: AUTHORIZATION_MESSAGES.USER_NOT_AUTHENTICATED });
      return;
    }
    const userAccessLevel = res.locals.accessLevel;
    if (userAccessLevel >= requiredLevel) {
      logger.info(AUTHORIZATION_MESSAGES.ACCESS_GRANTED);
      next();
    } else {
      logger.error(AUTHORIZATION_MESSAGES.ACCESS_DENIED);
      res
        .status(HTTP_STATUS_CODES.FORBIDDEN)
        .json({ message: AUTHORIZATION_MESSAGES.FORBIDDEN });
    }
  };
};

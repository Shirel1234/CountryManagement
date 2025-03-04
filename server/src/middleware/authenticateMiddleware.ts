import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../lib/models/userModel";
import dotenv from "dotenv";
import logger from "../utils/logger";
import {
  API_PREFIX,
  HTTP_STATUS_CODES,
  LOGGER_MESSAGES_USER,
  AUTHENTICATE_MESSAGES,
  PASSWORD_RESET_ROUTES,
  USER_MESSAGES,
} from "../constants";
dotenv.config();

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.originalUrl ===
      `${API_PREFIX} ${PASSWORD_RESET_ROUTES.REQUEST_PASSWORD_RESET}` ||
    req.originalUrl === `${API_PREFIX}${PASSWORD_RESET_ROUTES.RESET_PASSWORD}`
  ) {
    console.log("goodddddddddd");
    return next();
  }
  const token = req.cookies.token;
  if (!token) {
    logger.warn(AUTHENTICATE_MESSAGES.ACCESS_ATTEMPT_WITHOUT_TOKEN);
    res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: AUTHENTICATE_MESSAGES.ACCESS_DENIED_NO_TOKEN });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      id: string;
      accessLevel: number;
    };

    const user = await User.findById(decoded.id);
    if (!user) {
      logger.warn(LOGGER_MESSAGES_USER.USER_NOT_FOUND_BY_ID(decoded.id));
      res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: USER_MESSAGES.USER_NOT_FOUND });
      return;
    }
    res.locals.id = decoded.id;
    res.locals.accessLevel = decoded.accessLevel;

    next();
  } catch (error) {
    logger.error(AUTHENTICATE_MESSAGES.JWT_VERIFICATION_ERROR, error);
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ message: AUTHENTICATE_MESSAGES.INVALID_TOKEN });
    return;
  }
};

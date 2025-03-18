import rateLimit from "express-rate-limit";
import { RATE_LIMIT_MESSAGES } from "../constants";

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: RATE_LIMIT_MESSAGES.LOGIN_ATTEMPT_EXCEEDED,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

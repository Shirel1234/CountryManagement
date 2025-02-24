import rateLimit from "express-rate-limit";

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message:
      "You have tried to log in too many times. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

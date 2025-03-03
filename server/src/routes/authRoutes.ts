import express from "express";
import { login, register, logout } from "../controllers/authController";
import upload from "../utils/multer.ts";
import { loginRateLimiter } from "../middleware/rateLimitMiddleware";
import { AUTH_ROUTES } from "../constants";

const router = express.Router();

router.post(AUTH_ROUTES.LOGIN, loginRateLimiter, login);
router.post(AUTH_ROUTES.REGISTER, upload.single("profileImage"), register);
router.post(AUTH_ROUTES.LOGOUT, logout);

export default router;

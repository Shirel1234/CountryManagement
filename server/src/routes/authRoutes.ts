import { Router } from "express";
import { login, register, logout } from "../controllers/authController";
import { resetPassword } from "../services/passwordResetService";
import upload from "../utils/multer.ts";

const router = Router();

router.post("/login", login);
router.post("/register",upload.single('profileImage'), register);
router.post("/logout", logout);

export default router;

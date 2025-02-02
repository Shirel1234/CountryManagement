import { Router } from "express";
import { requestPasswordReset, resetPasswordHandler } from "../controllers/passwordResetController";

const router = Router();

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPasswordHandler);

export default router;

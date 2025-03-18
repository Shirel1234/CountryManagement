import express from "express";
import {
  requestPasswordReset,
  resetPasswordHandler,
} from "../controllers/passwordResetController";
import { PASSWORD_RESET_ROUTES } from "../constants";

const router = express.Router();

router.post(PASSWORD_RESET_ROUTES.REQUEST_PASSWORD_RESET,requestPasswordReset);
router.post(PASSWORD_RESET_ROUTES.RESET_PASSWORD, resetPasswordHandler);

export default router;

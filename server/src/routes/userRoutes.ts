import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController";
import express from "express";
import upload from "../utils/multer.ts";
import { checkAccessLevel } from "../middleware/authorizationMiddleware";
import { authenticateToken } from "../middleware/authenticateMiddleware";
import { AccessLevel } from "../constants/accessLevelEnum";
import {
  USER_ROUTES
} from "../constants";

const router = express.Router();
router.use(authenticateToken);

// Route to get and update users data if needed
router.get(USER_ROUTES.GET_USERS, checkAccessLevel(AccessLevel.VIEWER), getUsers);
router.get(
  USER_ROUTES.GET_USER_BY_ID,
  checkAccessLevel(AccessLevel.VIEWER),
  getUserById
);
router.post(
  USER_ROUTES.CREATE_USER,
  checkAccessLevel(AccessLevel.ADMIN),
  upload.single("profileImage"),
  createUser
);
router.put(
  USER_ROUTES.UPDATE_USER,
  checkAccessLevel(AccessLevel.UPDATE),
  upload.single("profileImage"),
  updateUser
);
router.delete(
  USER_ROUTES.DELETE_USER,
  checkAccessLevel(AccessLevel.ADMIN),
  deleteUser
);
export default router;

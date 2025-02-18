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
import { AccessLevel } from "../types/accessLevel";

const router = express.Router();
router.use(authenticateToken);

// Route to get and update users data if needed
router.get("/users", checkAccessLevel(AccessLevel.VIEWER), getUsers);
router.get("/users/:id", checkAccessLevel(AccessLevel.VIEWER), getUserById);
router.post("/users", checkAccessLevel(AccessLevel.ADMIN), upload.single("profileImage"), createUser);
router.put("/users/:id", checkAccessLevel(AccessLevel.ADMIN), upload.single("profileImage"), updateUser);
router.delete("/users/:id", checkAccessLevel(AccessLevel.ADMIN),  deleteUser);
export default router;

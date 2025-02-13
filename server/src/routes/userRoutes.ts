import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/userController";
import express from "express";
import upload from "../utils/multer.ts";

const router = express.Router();

// Route to get and update users data if needed
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", upload.single("profileImage"), createUser);
router.put("/users/:id", upload.single('profileImage'), updateUser);
router.delete("/users/:id", deleteUser);
export default router;

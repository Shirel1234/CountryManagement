import { createUser, deleteUser, getUserById, getUsers, updateuser } from "../controllers/userController";
import express from "express";

const router = express.Router();

// Route to get and update users data if needed
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateuser);
router.delete("/users/:id", deleteUser);
export default router;

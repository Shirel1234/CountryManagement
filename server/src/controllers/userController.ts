import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  fetchUserById,
  fetchUsersData,
  modifyUser,
  removeUser,
  saveUser,
} from "../services/userService";
import { handleValidationError } from "../utils/errorUtils";

//Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await fetchUsersData();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users data." });
  }
};
// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await fetchUserById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
};
// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const createData = req.body;
    const user = await saveUser(createData);
    res.status(201).json(user);
  } catch (error) {
    handleValidationError(error, res, "Failed to create user");
  }
};
// Update a user by ID
export const updateuser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const user = await modifyUser(id, updatedData);
    res.status(200).json(user);
  } catch (error) {
    handleValidationError(error, res, "Failed to update user");
  }
};
// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await removeUser(id);
    if (!result) {
      res.status(404).json({ error: "user not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

import { Request, Response } from "express";
import {
  fetchUserById,
  fetchUsers,
  modifyUser,
  removeUser,
  saveUser,
} from "../services/userService";
import { handleValidationError } from "../utils/errorUtils";
import fs from "fs";
import path from "path";
import { AccessLevel } from "../types/accessLevel";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await fetchUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users data." });
  }
};

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

export const createUser = async (req: Request, res: Response) => {
  try {
    const createData = req.body;

    if (req.file) {
      createData.profileImage = req.file.filename;
    }

    const user = await saveUser(createData);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error during user creation:");
    handleValidationError(error, res, "Failed to create user");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, accessLevel } = req.body;

    const existingUser = await fetchUserById(id);
    if (!existingUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    let profileImage = existingUser.profileImage;
    if (req.file) {
      if (profileImage) {
        const oldImagePath = path.join(
          __dirname,
          "../public/uploads",
          profileImage
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      profileImage = req.file.filename;
    }

    let updatedAccessLevel = existingUser.accessLevel;
    if (accessLevel !== undefined) {
      const numericAccessLevel = Number(accessLevel);
      if (!Object.values(AccessLevel).includes(numericAccessLevel)) {
        res.status(400).json({ message: "Invalid access level." });
        return;
      }
      updatedAccessLevel = numericAccessLevel;
    }

    const updatedData = {
      firstName,
      lastName,
      phone,
      profileImage,
      accessLevel: updatedAccessLevel,
    };
    const updatedUser = await modifyUser(id, updatedData);
    res.status(200).json(updatedUser);
  } catch (error) {
    handleValidationError(error, res, "Failed to update user");
  }
};

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

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
import { AccessLevel } from "../constants/accessLevelEnum";
import { HTTP_STATUS_CODES, USER_MESSAGES } from "../constants";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await fetchUsers();
    res.status(HTTP_STATUS_CODES.OK).json(users);
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: USER_MESSAGES.ERROR_FETCHING_USERS });
  }
};
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await fetchUserById(id);
    if (!user) {
      res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: USER_MESSAGES.USER_NOT_FOUND });
    } else {
      res.status(HTTP_STATUS_CODES.OK).json(user);
    }
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: USER_MESSAGES.ERROR_FETCHING_USER, error });
  }
};
export const createUser = async (req: Request, res: Response) => {
  try {
    const createData = req.body;

    if (req.file) {
      createData.profileImage = req.file.filename;
    }

    const user = await saveUser(createData);
    res.status(HTTP_STATUS_CODES.CREATED).json(user);
  } catch (error) {
    console.error(USER_MESSAGES.FAILED_CREATE_USER);
    handleValidationError(error, res, USER_MESSAGES.FAILED_CREATE_USER);
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, accessLevel } = req.body;

    const existingUser = await fetchUserById(id);
    if (!existingUser) {
      res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ message: USER_MESSAGES.USER_NOT_FOUND });
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
        res
          .status(HTTP_STATUS_CODES.BAD_REQUEST)
          .json({ message: USER_MESSAGES.INVALID_ACCESS_LEVEL });
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
    res.status(HTTP_STATUS_CODES.OK).json(updatedUser);
  } catch (error) {
    handleValidationError(error, res, USER_MESSAGES.FAILED_UPDATE_USER);
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await removeUser(id);
    if (!result) {
      res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: USER_MESSAGES.USER_NOT_FOUND });
    } else {
      res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
    }
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: USER_MESSAGES.FAILED_DELETE_USER, error });
  }
};

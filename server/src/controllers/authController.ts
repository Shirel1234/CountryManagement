import { Request, Response } from "express";
import { authenticateUser, registerUser } from "../services/authService";
import { IUser } from "../types/user";
import { AUTH_MESSAGES, HTTP_STATUS_CODES } from "../constants";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ message: AUTH_MESSAGES.USERNAME_PASSWORD_REQUIRED });
    return;
  }
  try {
    const { token, myId, myUsername, myProfileImage } = await authenticateUser(
      username,
      password
    );

    if (!token) {
      res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: AUTH_MESSAGES.INVALID_USERNAME_PASSWORD });
    } else {
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(HTTP_STATUS_CODES.OK)
        .json({
          message: AUTH_MESSAGES.LOGIN_SUCCESSFUL,
          token,
          myId,
          myUsername,
          myProfileImage,
        });
    }
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
export const register = async (req: Request, res: Response) => {
  try {
    const profileImage = req.file ? req.file.filename : null;
    const { username, email, firstName, lastName, password, phone } = req.body;

    if (!username || !email || !password) {
      res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ message: AUTH_MESSAGES.MISSING_REQUIRED_FIELDS });
      return;
    }

    const createData = {
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
      profileImage,
    } as IUser;
    const { token, myId, myUsername, myProfileImage } = await registerUser(
      createData
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(HTTP_STATUS_CODES.OK).json({
      message: AUTH_MESSAGES.REGISTRATION_SUCCESSFUL,
      myId,
      myUsername,
      myProfileImage,
    });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const logout = (_req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: AUTH_MESSAGES.LOGOUT_SUCCESSFUL });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

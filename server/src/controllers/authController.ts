import { Request, Response } from "express";
import { authenticateUser, registerUser } from "../services/authService";
import { IUser } from "../types/user";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required." });
  } else {
    try {
      const { token, myUsername, myProfileImage } = await authenticateUser(
        username,
        password
      );

      if (!token) {
        res.status(401).json({ message: "Invalid username or password." });
      } else {
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000,
          })
          .status(200)
          .json({
            message: "Login successful.",
            token,
            myUsername,
            myProfileImage,
          });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const profileImage = req.file ? req.file.filename : null;

    const { username, email, firstName, lastName, password, phone } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "Missing required fields." });
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
    const { token, myUsername, myProfileImage } = await registerUser(
      createData
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).json({
      message: "Registration successful.",
      myUsername,
      myProfileImage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (_req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

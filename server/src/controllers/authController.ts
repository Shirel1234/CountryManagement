import { Request, Response } from "express";
import { authenticateUser, registerUser } from "../services/authService";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required." });
  } else {
    try {
      const token = await authenticateUser(username, password);
      if (!token) {
        res.status(401).json({ message: "Invalid username or password." });
      }
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const createData = req.body;
    const token = await registerUser(createData);
    res.status(201).json({ message: "User created successfully", token });
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

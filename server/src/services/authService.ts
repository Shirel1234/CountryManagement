import bcrypt from "bcrypt";
import { User } from "../lib/models/userModel";
import { generateToken } from "../utils/tokenUtils";
import { IUser } from "../types/user";
import logger from "../utils/logger";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<{
  token: string;
  myUsername: string;
  myProfileImage: string;
} | null> => {
  const user = await User.findOne({ username });

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = generateToken(user);

  return {
    token,
    myUsername: user.username,
    myProfileImage: user.profileImage || "",
  };
};

export const registerUser = async (
  createData: IUser
): Promise<{
  token: string;
  myUsername: string;
  myProfileImage: string;
} | null> => {
  try {
    const newUser = new User(createData);
    await newUser.save();

    const token = generateToken(newUser);
    logger.info("User successfully registered!");
    return {
      token,
      myUsername: newUser.username,
      myProfileImage: newUser.profileImage || "",
    };
  } catch (error) {
    logger.error("Error saving user to the database:", error);
    throw error;
  }
};

import bcrypt from "bcrypt";
import { User } from "../lib/models/userModel";
import { generateToken } from "../utils/tokenUtils";
import { IUser } from "../types/user";
import logger from "../utils/logger";
import { LOGGER_MESSAGES_AUTH } from "../constants";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<{
  token: string;
  myId: string;
  myUsername: string;
  myProfileImage: string;
} | null> => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      logger.warn(LOGGER_MESSAGES_AUTH.USER_NOT_FOUND, username);
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(LOGGER_MESSAGES_AUTH.INVALID_CREDENTIALS);
      return null;
    }
    const token = generateToken(user);

    return {
      token,
      myId: user._id,
      myUsername: user.username,
      myProfileImage: user.profileImage || "",
    };
  } catch (error) {
    logger.error(LOGGER_MESSAGES_AUTH.AUTH_ERROR, error);
    throw error;
  }
};
export const registerUser = async (
  createData: IUser
): Promise<{
  token: string;
  myId: string;
  myUsername: string;
  myProfileImage: string;
} | null> => {
  try {
    const newUser = new User(createData);
    await newUser.save();

    const token = generateToken(newUser);
    logger.info(LOGGER_MESSAGES_AUTH.REGISTER_SUCCESS);
    return {
      token,
      myId: newUser._id,
      myUsername: newUser.username,
      myProfileImage: newUser.profileImage || "",
    };
  } catch (error) {
    logger.error(LOGGER_MESSAGES_AUTH.REGISTER_ERROR, error);
    throw error;
  }
};

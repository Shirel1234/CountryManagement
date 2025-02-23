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
  myId: string;
  myUsername: string;
  myProfileImage: string;
} | null> => {

  try{
    const user = await User.findOne({ username });
    if (!user){
      logger.warn("User not found with the provided username:", username);
     return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn("Invalid username or password.");
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
    logger.error("Error authenticated user:", error);
    throw new Error("Failed to authenticated user.");
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
    logger.info("User successfully registered!");
    return {
      token,
      myId: newUser._id,
      myUsername: newUser.username,
      myProfileImage: newUser.profileImage || "",
    };
  } catch (error) {
    logger.error("Error saving user to the database:", error);
    throw error;
  }
};

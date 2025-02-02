import bcrypt from "bcrypt";
import { User } from "../lib/models/userModel";
import { generateToken } from "../utils/tokenUtils";
import { IUser } from "../types/user";

// Authenticate user by comparing password
export const authenticateUser = async (
  username: string,
  password: string
): Promise<string | null> => {
  const user = await User.findOne({ username });

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = generateToken(user);
  return token;
};

// Register user and return the generated token
export const registerUser = async (createData: IUser): Promise<string> => {
  const newUser = new User(createData);
  await newUser.save();
  
  const token = generateToken(newUser);
  return token;
};

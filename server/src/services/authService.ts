import bcrypt from "bcrypt";
import { User } from "../lib/models/userModel";
import { generateToken } from "../utils/tokenUtils";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<string | null> => {
  const user = await User.findOne({ username });

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  // Generate a JWT token for the user
  const token = generateToken(user);
  return token;
};

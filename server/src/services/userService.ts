import { User } from "../lib/models/userModel";
import { IUser } from "../types/user";
import logger from "../utils/logger";

//Function to fetch data and save it to MongoDB if not already present
export const fetchUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    logger.error("Error fetching Users data:");
    throw error;
  }
};
// Fetch a user by ID
export const fetchUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      logger.error("User not found with the provided ID:", id);
      return null;
    }
    return user;
  } catch (error) {
    logger.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user by ID.");
  }
};
// Save a new User to the database
export const saveUser = async (data: IUser) => {
  try {
    const newUser = new User(data);
    await newUser.save();
    logger.info("User successfully added!");
    return newUser;
  } catch (error) {
    logger.error("Error saving user to the database:", error);
    throw error;
  }
};
// Update a user by ID
export const modifyUser = async (id: string, updatedData: Partial<IUser>) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      logger.warn("User not found with the provided ID:", id);
      throw new Error("User not found with the provided ID.");
    }
    logger.info("User updated successfully!");
    return updatedUser;
  } catch (error) {
    logger.error("Error updating User:", error);
    throw new Error("Failed to update User.");
  }
};
// Delete a user by ID
export const removeUser = async (id: string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      logger.warn("User not found with the provided ID:", id);
      throw new Error("User not found with the provided ID.");
    }
    logger.info("User deleted successfully!");
    return deletedUser;
  } catch (error) {
    logger.error("Error deleting user:", error);
    throw new Error("Failed to delete user.");
  }
};

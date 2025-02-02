import axios from "axios";
import { IUser } from "../types/user";
import logim from "../utils/logim";

// Fetch all users
export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/users", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    logim.error(
      `Error fetching users: ${error instanceof Error ? error.message : error}`
    );
    throw error;
  }
};

// Get a user by ID
export const getUserById = async (id: string | undefined): Promise<IUser> => {
  if (!id) {
    throw new Error("User ID is required");
  }
  try {
    const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    logim.error(
      `Error fetching user by id: ${
        error instanceof Error ? error.message : error
      }`
    );
    throw error;
  }
};

// Add a new user
export const addUser = async (newUser: Omit<IUser, "_id">): Promise<IUser> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users",
      newUser,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    logim.error(
      `Error adding user: ${error instanceof Error ? error.message : error}`
    );
    throw error;
  }
};

// Update user data
export const updateUser = async (
  id: string | undefined,
  updatedData: Partial<IUser>
): Promise<IUser> => {
  if (!id) {
    throw new Error("User ID is required");
  }
  try {
    const response = await axios.put(
      `http://localhost:5000/api/users/${id}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    logim.error(
      `Error updating user: ${error instanceof Error ? error.message : error}`
    );
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(`http://localhost:5000/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    logim.error(
      `Error deleting user: ${error instanceof Error ? error.message : error}`
    );
    throw error;
  }
};

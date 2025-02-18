import axios from "axios";
import { IUser } from "../types/user";

// Use the VITE_BASE_URL environment variable
const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_BASE_URL is not defined in the environment variables");
}

// Fetch all users
export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    throw error;
  }
};
// Get a user by ID
export const getUserById = async (id: string | undefined): Promise<IUser> => {
  if (!id) {
    throw new Error("User ID is required");
  }
  try {
    const response = await axios.get(`${BASE_URL}/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching user by id: ${error}`);
    throw error;
  }
};
// Add a new user
export const addUser = async (newUser: Omit<IUser, "_id">): Promise<IUser> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users`, newUser, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding user: ${error}`);
    throw error;
  }
};
// Update user data
export const updateUser = async (
  id: string | undefined,
  formData: FormData
): Promise<IUser> => {
  if (!id) {
    throw new Error("User ID is required");
  }
  try {
    const response = await axios.put(`${BASE_URL}/api/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating user: ${error}`);
    throw error;
  }
};
// Delete a user by ID
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(`Error deleting user: ${error}`);
    throw error;
  }
};

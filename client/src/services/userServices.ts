import axios from "axios";
import { IUser } from "../types/user";
import { API_ENDPOINTS_USER, ERROR_MESSAGES_USER, HEADERS } from "../constants";

export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get(API_ENDPOINTS_USER.ALL, {
      headers: HEADERS.JSON,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_USER.FETCH_FAILED}: ${error}`);
    throw error;
  }
};
export const getUserById = async (id: string | null): Promise<IUser> => {
  if (!id) {
    throw new Error("User ID is required");
  }
  try {
    const response = await axios.get(API_ENDPOINTS_USER.BY_ID(id), {
      headers: HEADERS.JSON,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_USER.FETCH_BY_ID_FAILED}: ${error}`);
    throw error;
  }
};
export const addUser = async (newUser: Omit<IUser, "_id">): Promise<IUser> => {
  try {
    const response = await axios.post(API_ENDPOINTS_USER.ALL, newUser, {
      headers: HEADERS.JSON,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_USER.ADD_FAILED}: ${error}`);
    throw error;
  }
};
export const updateUser = async (
  id: string | null,
  formData: FormData
): Promise<IUser> => {
  if (!id) {
    throw new Error("User ID is required");
  }
  try {
    const response = await axios.put(API_ENDPOINTS_USER.BY_ID(id), formData, {
      headers: HEADERS.MULTIPART,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_USER.UPDATE_FAILED}: ${error}`);
    throw error;
  }
};
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(API_ENDPOINTS_USER.BY_ID(id), {
      headers: HEADERS.JSON,
      withCredentials: true,
    });
  } catch (error) {
    console.error(`${ERROR_MESSAGES_USER.DELETE_FAILED}: ${error}`);
    throw error;
  }
};

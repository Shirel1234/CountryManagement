import axios from "axios";
import { IRequestAccess } from "../types/requestAccess";

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_BASE_URL is not defined in the environment variables");
}

export const addRequestAccess= async (
  newRequest: { action: string }
  ): Promise<IRequestAccess> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/request-access`, JSON.stringify(newRequest), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(`Error adding a request: ${error}`);
      throw error;
    }
  };
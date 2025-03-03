import axios from "axios";
import { ICity } from "../types/city";

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_BASE_URL is not defined in the environment variables");
}

export const fetchCities = async (): Promise<ICity[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/cities`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
};
export const deleteCity = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/api/cities/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(`Error deleting city: ${error}`);
    throw error;
  }
};
export const getCityById = async (id: string | undefined): Promise<ICity> => {
  if (!id) {
    throw new Error("City ID is required");
  }
  try {
    const response = await axios.get(`${BASE_URL}/api/cities/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching city by id: ${error}`);
    throw error;
  }
};
export const updateCity = async (
  id: string | undefined,
  updatedData: Partial<ICity>
): Promise<ICity> => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/cities/${id}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating city: ${error}`);
    throw error;
  }
};
export const addCity = async (newCity: Omit<ICity, "_id">): Promise<ICity> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/cities`, newCity, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding city: ${error}`);
    throw error;
  }
};

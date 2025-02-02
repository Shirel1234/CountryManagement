import axios from "axios";
import { ICountry } from "../types/country";
import logim from "../utils/logim";

export const fetchCountries = async (): Promise<ICountry[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/countries", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    logim.error(
      `Error fetching data: ${error instanceof Error ? error.message : error}`
    );
    throw error;
  }
};
export const deleteCountry = async (id: string): Promise<void> => {
  try {
    await axios.delete(`http://localhost:5000/api/countries/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    logim.error(
      `Error fetching country: ${
        error instanceof Error ? error.message : error
      }`
    );
    throw error;
  }
};
export const getCountryById = async (
  id: string | undefined
): Promise<ICountry> => {
  if (!id) {
    throw new Error("Country ID is required");
  }
  try {
    const response = await axios.get(
      `http://localhost:5000/api/countries/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    logim.error(
      `Error fetching country by id: ${
        error instanceof Error ? error.message : error
      }`
    );
    throw error;
  }
};
export const updateCountry = async (
  id: string | undefined,
  updatedData: Partial<ICountry>
): Promise<ICountry> => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/countries/${id}`,
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
      `Error updating country: ${
        error instanceof Error ? error.message : error
      }`
    );
    throw error;
  }
};
export const addCountry = async (
  newCountry: Omit<ICountry, "_id">
): Promise<ICountry> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/countries",
      newCountry,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    logim.error(
      `Error adding country: ${error instanceof Error ? error.message : error}`
    );
    throw error;
  }
};

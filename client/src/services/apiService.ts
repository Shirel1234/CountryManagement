import axios from "axios";
import { ICountry } from "../types/country";

export const fetchData = async (): Promise<ICountry[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/countries", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
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
    console.error("Error deleting country:", error);
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
    console.error("Error fetching country by id:", error);
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
    console.error("Error updating country:", error);
    throw error;
  }
};
export const addCountry = async (newCountry: Omit<ICountry, "_id">): Promise<ICountry> => {
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
    console.error("Error adding country:", error);
    throw error;
  }
};
import axios from "axios";
import { ICountry } from "../types/country";

export const fetchData = async (): Promise<ICountry[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/countries", {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const deleteCountry = async (id: string): Promise<void> => {
  try {
    await axios.delete(`http://localhost:5000/api/countries/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error deleting country:', error);
    throw error;
  }
};

import axios from "axios";
import { ICity } from "../types/city";
import { API_ENDPOINTS_CITY, ERROR_MESSAGES_CITY, HEADERS } from "../constants";

export const fetchCities = async (): Promise<ICity[]> => {
  try {
    const response = await axios.get(API_ENDPOINTS_CITY.CITIES, {
      headers: HEADERS.JSON,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_CITY.FETCH_CITIES_FAILED}: ${error}`);
    throw error;
  }
};
export const getCityById = async (id: string | undefined): Promise<ICity> => {
  if (!id) {
    throw new Error("City ID is required");
  }
  try {
    const response = await axios.get(API_ENDPOINTS_CITY.CITY_BY_ID(id), {
      headers: HEADERS.JSON,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_CITY.FETCH_CITY_FAILED}: ${error}`);
    throw error;
  }
};
export const addCity = async (newCity: Omit<ICity, "_id">): Promise<ICity> => {
  try {
    const response = await axios.post(API_ENDPOINTS_CITY.CITIES, newCity, {
      headers: HEADERS.JSON,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_CITY.ADD_CITY_FAILED}: ${error}`);
    throw error;
  }
};
export const updateCity = async (
  id: string | undefined,
  updatedData: Partial<ICity>
): Promise<ICity> => {
  try {
    const response = await axios.put(
      API_ENDPOINTS_CITY.CITY_BY_ID(id),
      updatedData,
      {
        headers: HEADERS.JSON,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_CITY.UPDATE_CITY_FAILED}: ${error}`);
    throw error;
  }
};
export const deleteCity = async (id: string): Promise<void> => {
  try {
    await axios.delete(API_ENDPOINTS_CITY.CITY_BY_ID(id), {
      headers: HEADERS.JSON,
      withCredentials: true,
    });
  } catch (error) {
    console.error(`${ERROR_MESSAGES_CITY.DELETE_CITY_FAILED}: ${error}`);
    throw error;
  }
};

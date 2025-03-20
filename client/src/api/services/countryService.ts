import axios from "axios";
import { ICountry } from "../types/country";
import {
  API_ENDPOINTS_COUNTRY,
  ERROR_MESSAGES_COUNTRY,
  HEADERS,
} from "../../constants";

export const fetchCountries = async (): Promise<ICountry[]> => {
  try {
    const response = await axios.get(API_ENDPOINTS_COUNTRY.COUNTRIES, {
      headers: HEADERS.JSON,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(ERROR_MESSAGES_COUNTRY.FETCH_COUNTRIES_FAILED, error);
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
    const response = await axios.get(API_ENDPOINTS_COUNTRY.COUNTRY_BY_ID(id), {
      headers: HEADERS.JSON,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(ERROR_MESSAGES_COUNTRY.FETCH_COUNTRY_FAILED, error);
    throw error;
  }
};
export const addCountry = async (
  newCountry: Omit<ICountry, "_id">
): Promise<ICountry> => {
  try {
    const response = await axios.post(
      API_ENDPOINTS_COUNTRY.COUNTRIES,
      newCountry,
      {
        headers: HEADERS.JSON,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(ERROR_MESSAGES_COUNTRY.ADD_COUNTRY_FAILED, error);
    throw error;
  }
};
export const deleteCountry = async (id: string): Promise<void> => {
  try {
    await axios.delete(API_ENDPOINTS_COUNTRY.COUNTRY_BY_ID(id), {
      headers: HEADERS.JSON,
      withCredentials: true,
    });
  } catch (error) {
    console.error(ERROR_MESSAGES_COUNTRY.DELETE_COUNTRY_FAILED, error);
    throw error;
  }
};
export const updateCountry = async (
  id: string | undefined,
  updatedData: Partial<ICountry>
): Promise<ICountry> => {
  try {
    const response = await axios.put(
      API_ENDPOINTS_COUNTRY.COUNTRY_BY_ID(id),
      updatedData,
      {
        headers: HEADERS.JSON,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(ERROR_MESSAGES_COUNTRY.UPDATE_COUNTRY_FAILED, error);
    throw error;
  }
};

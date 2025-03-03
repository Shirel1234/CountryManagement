import axios from "axios";
import Country from "../lib/models/countryModel";
import { ICountry } from "../types/country";
import logger from "../utils/logger";
import { API_URL, LOGGER_MESSAGES_COUNTRY } from "../constants";

export const fetchInitialCountries = async () => {
  try {
    const existingCountries = await Country.find({});

    if (existingCountries.length === 0) {
      logger.info(LOGGER_MESSAGES_COUNTRY.NO_COUNTRIES);
      const response = await axios.get<ICountry[]>(API_URL);
      const countries = response.data;

      // Transform the data to match the schema
      const formattedCountries = countries.map((country: any) => ({
        name: country.name.common,
        flag: country.flags?.png || "",
        population: country.population || 0,
        region: country.region || "Unknown",
        cities: country.capital || [],
      }));

      await Country.insertMany(formattedCountries);
      logger.info(LOGGER_MESSAGES_COUNTRY.COUNTRIES_ADDED);
    } else {
      logger.info(LOGGER_MESSAGES_COUNTRY.COUNTRIES_EXIST);
    }
  } catch (error) {
    logger.error(LOGGER_MESSAGES_COUNTRY.FETCH_ERROR, error);
    throw error;
  }
};
export const fetchCountries = async () => {
  try {
    const countries = await Country.find({}).populate("cities");
    return countries;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_COUNTRY.FETCH_ERROR, error);
    throw error;
  }
};
export const fetchCountryById = async (id: string) => {
  try {
    const country = await Country.findById(id).populate("cities");
    if (!country) {
      logger.warn(LOGGER_MESSAGES_COUNTRY.COUNTRY_NOT_FOUND, id);
      return null;
    }
    return country;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_COUNTRY.FETCH_ERROR, error);
    throw new Error(LOGGER_MESSAGES_COUNTRY.FETCH_ERROR);
  }
};
export const saveCountry = async (data: ICountry) => {
  try {
    const newCountry = new Country(data);
    await newCountry.save();
    logger.info(LOGGER_MESSAGES_COUNTRY.SAVE_SUCCESS);
    return newCountry;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_COUNTRY.SAVE_ERROR, error);
    throw error;
  }
};
export const modifyCountry = async (
  id: string,
  updatedData: Partial<ICountry>
) => {
  try {
    const updatedCountry = await Country.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).populate("cities");
    if (!updatedCountry) {
      logger.warn(LOGGER_MESSAGES_COUNTRY.COUNTRY_NOT_FOUND, id);
      throw new Error(LOGGER_MESSAGES_COUNTRY.COUNTRY_NOT_FOUND);
    }
    logger.info(LOGGER_MESSAGES_COUNTRY.UPDATE_SUCCESS);
    return updatedCountry;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_COUNTRY.UPDATE_ERROR, error);
    throw new Error(LOGGER_MESSAGES_COUNTRY.UPDATE_ERROR);
  }
};
export const removeCountry = async (id: string) => {
  try {
    const deletedCountry = await Country.findByIdAndDelete(id);
    if (!deletedCountry) {
      logger.warn(LOGGER_MESSAGES_COUNTRY.COUNTRY_NOT_FOUND, id);
      throw new Error(LOGGER_MESSAGES_COUNTRY.COUNTRY_NOT_FOUND);
    }
    logger.info(LOGGER_MESSAGES_COUNTRY.DELETE_SUCCESS);
    return deletedCountry;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_COUNTRY.DELETE_ERROR, error);
    throw new Error(LOGGER_MESSAGES_COUNTRY.DELETE_ERROR);
  }
};

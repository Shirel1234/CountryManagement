import axios from "axios";
import { City } from "../lib/models/cityModel";
import { ICity } from "../lib/types/city";
import logger from "../utils/logger";
import { LOGGER_MESSAGES_CITY } from "../constants";

export const fetchCities = async () => {
  try {
    const cities = await City.find({});
    return cities;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_CITY.ERROR_FETCHING_CITIES, error);
    throw error;
  }
};
export const fetchCityById = async (id: string) => {
  try {
    const city = await City.findById(id);
    if (!city) {
      logger.warn(`${LOGGER_MESSAGES_CITY.CITY_NOT_FOUND} ${id}`);
      return null;
    }
    return city;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_CITY.ERROR_FETCHING_CITY_BY_ID, error);
    throw error;
  }
};
export const saveCity = async (data: ICity) => {
  try {
    const newCity = new City(data);
    await newCity.save();
    logger.info(LOGGER_MESSAGES_CITY.CITY_ADDED_SUCCESS);
    return newCity;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_CITY.ERROR_SAVING_CITY, error);
    throw error;
  }
};
export const modifyCity = async (id: string, updatedData: Partial<ICity>) => {
  try {
    const updatedCity = await City.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedCity) {
      logger.warn(`${LOGGER_MESSAGES_CITY.CITY_NOT_FOUND} ${id}`);
      throw new Error(LOGGER_MESSAGES_CITY.CITY_NOT_FOUND);
    }
    logger.info(LOGGER_MESSAGES_CITY.CITY_UPDATED_SUCCESS);
    return updatedCity;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_CITY.ERROR_UPDATING_CITY, error);
    throw error;
  }
};
export const removeCity = async (id: string) => {
  try {
    const deletedCity = await City.findByIdAndDelete(id);
    if (!deletedCity) {
      logger.warn(`${LOGGER_MESSAGES_CITY.CITY_NOT_FOUND} ${id}`);
      throw new Error(LOGGER_MESSAGES_CITY.CITY_NOT_FOUND);
    }
    logger.info(LOGGER_MESSAGES_CITY.CITY_DELETED_SUCCESS);
    return deletedCity;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_CITY.ERROR_DELETING_CITY, error);
    throw error;
  }
};

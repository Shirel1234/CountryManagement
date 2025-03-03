import { Request, Response } from "express";
import {
  fetchCities,
  fetchCityById,
  modifyCity,
  removeCity,
  saveCity,
} from "../services/cityService";
import { handleValidationError } from "../utils/errorUtils";
import { CITY_MESSAGES, HTTP_STATUS_CODES } from "../constants";

export const getCities = async (req: Request, res: Response) => {
  try {
    const cities = await fetchCities();
    res.status(HTTP_STATUS_CODES.OK).json(cities);
  } catch (error) {
    handleValidationError(error, res, CITY_MESSAGES.ERROR_FETCHING_CITIES);
  }
};
export const getCityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const city = await fetchCityById(id);
    if (!city) {
      res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: CITY_MESSAGES.CITY_NOT_FOUND });
    } else {
      res.status(HTTP_STATUS_CODES.OK).json(city);
    }
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: CITY_MESSAGES.ERROR_FETCHING_CITIES, error });
  }
};
export const createCity = async (req: Request, res: Response) => {
  try {
    const createData = req.body;
    const city = await saveCity(createData);
    res.status(HTTP_STATUS_CODES.CREATED).json(city);
  } catch (error) {
    handleValidationError(error, res, CITY_MESSAGES.FAILED_TO_CREATE_CITY);
  }
};
export const updateCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const city = await modifyCity(id, updatedData);
    res.status(HTTP_STATUS_CODES.OK).json(city);
  } catch (error) {
    handleValidationError(error, res, CITY_MESSAGES.FAILED_TO_UPDATE_CITY);
  }
};
export const deleteCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await removeCity(id);
    if (!result) {
      res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: CITY_MESSAGES.CITY_NOT_FOUND });
    } else {
      res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
    }
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: CITY_MESSAGES.FAILED_TO_DELETE_CITY, error });
  }
};

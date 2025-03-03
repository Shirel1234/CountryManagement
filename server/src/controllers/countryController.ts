import { Request, Response } from "express";
import {
  fetchCountries,
  fetchCountryById,
  modifyCountry,
  removeCountry,
  saveCountry,
} from "../services/countryService";
import { handleValidationError } from "../utils/errorUtils";
import { COUNTRY_MESSAGES, HTTP_STATUS_CODES } from "../constants";

export const getCountries = async (req: Request, res: Response) => {
  try {
    const countries = await fetchCountries();
    res.status(HTTP_STATUS_CODES.OK).json(countries);
  } catch (error) {
    handleValidationError(error, res, COUNTRY_MESSAGES.FETCH_ERROR);
  }
};
export const getCountryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const country = await fetchCountryById(id);
    if (!country) {
      res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: COUNTRY_MESSAGES.NOT_FOUND });
    } else {
      res.status(HTTP_STATUS_CODES.OK).json(country);
    }
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: COUNTRY_MESSAGES.FETCH_BY_ID_ERROR, error });
  }
};
export const createCountry = async (req: Request, res: Response) => {
  try {
    const createData = req.body;
    const country = await saveCountry(createData);
    res.status(HTTP_STATUS_CODES.CREATED).json(country);
  } catch (error) {
    handleValidationError(error, res, COUNTRY_MESSAGES.CREATE_ERROR);
  }
};
export const updateCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const country = await modifyCountry(id, updatedData);
    res.status(HTTP_STATUS_CODES.OK).json(country);
  } catch (error) {
    handleValidationError(error, res, COUNTRY_MESSAGES.UPDATE_ERROR);
  }
};
export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await removeCountry(id);
    if (!result) {
      res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: COUNTRY_MESSAGES.NOT_FOUND });
    } else {
      res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
    }
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: COUNTRY_MESSAGES.DELETE_ERROR, error });
  }
};

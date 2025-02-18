import { Request, Response } from "express";
import {
  addCityToCountry,
  fetchCountries,
  fetchCountryById,
  modifyCountry,
  removeCityFromCountry,
  removeCountry,
  saveCountry,
} from "../services/countryService";
import { handleValidationError } from "../utils/errorUtils";

export const getCountries = async (req: Request, res: Response) => {
  try {
    const countries = await fetchCountries();
    res.status(200).json(countries);
  } catch (error) {
    handleValidationError(error, res, "Error fetching countries data.");
  }
};

export const getCountryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const country = await fetchCountryById(id);
    if (!country) {
      res.status(404).json({ error: "Country not found" });
    } else {
      res.status(200).json(country);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching country data", error });
  }
};

export const createCountry = async (req: Request, res: Response) => {
  try {
    const createData = req.body;
    const country = await saveCountry(createData);
    res.status(201).json(country);
  } catch (error) {
    handleValidationError(error, res, "Failed to create country");
  }
};

export const updateCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const country = await modifyCountry(id, updatedData);
    res.status(200).json(country);
  } catch (error) {
    handleValidationError(error, res, "Failed to update country");
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await removeCountry(id);
    if (!result) {
      res.status(404).json({ error: "Country not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete country", error });
  }
};

export const addCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { city } = req.body;
    const updatedCountry = await addCityToCountry(id, city);
    res.status(200).json(updatedCountry);
  } catch (error) {
    handleValidationError(error, res, "Failed to add city");
  }
};

export const removeCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { city } = req.body;
    const updatedCountry = await removeCityFromCountry(id, city);
    res.status(200).json(updatedCountry);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove city", error });
  }
};

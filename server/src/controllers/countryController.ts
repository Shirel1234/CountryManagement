import { Request, Response } from "express";
import {
  addCityToCountry,
  fetchCountriesData,
  fetchCountryById,
  modifyCountry,
  removeCityFromCountry,
  removeCountry,
  saveCountry,
} from "../services/countryService";
import { handleValidationError } from "../utils/errorUtils";

//Get all countries
export const getCountries = async (req: Request, res: Response) => {
  try {
    const countries = await fetchCountriesData();
    res.status(200).json(countries);
  } catch (error) {
    handleValidationError(error, res, "Error fetching countries data.");
  }
};
// Get a single country by ID
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
// Create a new country
export const createCountry = async (req: Request, res: Response) => {
  try {
    const createData = req.body;
    const country = await saveCountry(createData);
    res.status(201).json(country);
  } catch (error) {
    handleValidationError(error, res, "Failed to create country");
  }
};
// Update a country by ID
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
// Delete a country by ID
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
// Add city to country
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
// Remove city from country
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

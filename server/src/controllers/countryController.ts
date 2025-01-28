import { Request, Response } from "express";
import {
  fetchCountriesData,
  fetchCountryById,
  modifyCountry,
  removeCountry,
  saveCountry,
} from "../services/countryService";

//Get all countries
export const getCountries = async (req: Request, res: Response) => {
  try {
    const countries = await fetchCountriesData();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching countries data." });
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
    res.status(500).json({ message: "Failed to create country", error });
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
    res.status(500).json({ message: "Failed to update country", error });
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

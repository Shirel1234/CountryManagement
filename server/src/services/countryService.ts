import axios from "axios";
import Country from "../lib/models/countryModel";
import { ICountry } from "../types/country";
import logger from "../utils/logger";

const API_URL = "https://restcountries.com/v3.1/all";

// Function to fetch data and save it to MongoDB if not already present
export const fetchInitialCountries = async () => {
  try {
    const existingCountries = await Country.find({});

    if (existingCountries.length === 0) {
      logger.info("No countries in the database. Adding new data...");
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
      logger.info("Countries added to the database!");
    } else {
      logger.info("Countries data already exists in the database!");
    }
  } catch (error) {
    logger.error("Error fetching countries data:", error);
    throw error;
  }
};
//Get all countries
export const fetchCountries = async () => {
  try {
    const countries = await Country.find({});
    return countries;
  } catch (error) {
    logger.error("Error fetching countries data:");
    throw error;
  }
};
// Fetch a country by ID
export const fetchCountryById = async (id: string) => {
  try {
    const country = await Country.findById(id);
    if (!country) {
      logger.warn("Country not found with the provided ID:", id);
      return null;
    }
    return country;
  } catch (error) {
    logger.error("Error fetching country by ID:", error);
    throw new Error("Failed to fetch country by ID.");
  }
};
// Save a new country to the database
export const saveCountry = async (data: ICountry) => {
  try {
    const newCountry = new Country(data);
    await newCountry.save();
    logger.info("Country successfully added!");
    return newCountry;
  } catch (error) {
    logger.error("Error saving country to the database:", error);
    throw error;
  }
};
// Update a country by ID
export const modifyCountry = async (
  id: string,
  updatedData: Partial<ICountry>
) => {
  try {
    const updatedCountry = await Country.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedCountry) {
      logger.warn("Country not found with the provided ID:", id);
      throw new Error("Country not found with the provided ID.");
    }
    logger.info("Country updated successfully!");
    return updatedCountry;
  } catch (error) {
    logger.error("Error updating country:", error);
    throw new Error("Failed to update country.");
  }
};
// Delete a country by ID
export const removeCountry = async (id: string) => {
  try {
    const deletedCountry = await Country.findByIdAndDelete(id);
    if (!deletedCountry) {
      logger.warn("Country not found with the provided ID:", id);
      throw new Error("Country not found with the provided ID.");
    }
    logger.info("Country deleted successfully!");
    return deletedCountry;
  } catch (error) {
    logger.error("Error deleting country:", error);
    throw new Error("Failed to delete country.");
  }
};
// Add cities to a country
export const addCityToCountry = async (id: string, city: string) => {
  try {
    const country = await Country.findById(id);
    if (!country) {
      logger.warn("Country not found with the provided ID:", id);
      throw new Error("Country not found.");
    }

    country.cities.push(city); // Add the city to the cities array
    await country.save();
    logger.info("City added to the country!");
    return country;
  } catch (error) {
    logger.error("Error adding city to country:", error);
    throw new Error("Failed to add city to country.");
  }
};
// Remove city from a country
export const removeCityFromCountry = async (id: string, city: string) => {
  try {
    const country = await Country.findById(id);
    if (!country) {
      logger.warn("Country not found with the provided ID:", id);
      throw new Error("Country not found.");
    }

    const cityIndex = country.cities.indexOf(city);
    if (cityIndex > -1) {
      country.cities.splice(cityIndex, 1); // Remove the city
      await country.save();
      logger.info("City removed from the country!");
    }
    return country;
  } catch (error) {
    logger.error("Error removing city from country:", error);
    throw new Error("Failed to remove city from country.");
  }
};

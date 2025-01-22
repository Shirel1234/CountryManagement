import axios from "axios";
import Country from "../lib/models/countryModel";
import { ICountry } from "../types/country";

const API_URL = "https://restcountries.com/v3.1/all";

// Function to fetch data and save it to MongoDB if not already present
export const fetchCountriesData = async () => {
  try {
    // Check if the data already exists in the database
    const existingCountries = await Country.find({});

    if (existingCountries.length === 0) {
      console.log("No countries in the database. Adding new data...");
      const response = await axios.get<ICountry[]>(API_URL);
      const countries = response.data;

      // Transform the data to match the schema
      const formattedCountries = countries.map((country: any) => ({
        name: country.name.common,
        flag: country.flags?.png || "",
        population: country.population || 0,
        region: country.region || "Unknown",
      }));

      await Country.insertMany(formattedCountries);
      console.log("Countries added to the database!");
      return formattedCountries; // Return the inserted data instead of fetching it again
    } else {
      console.log("Countries data already exists in the database!");
      return existingCountries; // Return existing countries if data exists
    }
  } catch (error) {
    console.error("Error fetching countries data:");
    throw error;
  }
};

// Fetch a country by ID
export const fetchCountryById = async (id: string) => {
  try {
    const country = await Country.findById(id);
    if (!country) {
      console.error("Country not found with the provided ID:", id);
      throw new Error("Country not found with the provided ID.");
    }
    return country;
  } catch (error) {
    console.error("Error fetching country by ID:", error);
    throw new Error("Failed to fetch country by ID.");
  }
};

// Save a new country to the database
export const saveCountry = async (data: ICountry) => {
  try {
    const newCountry = new Country(data);
    await newCountry.save();
    console.log("Country successfully added!");
    return newCountry;
  } catch (error) {
    console.error("Error saving country to the database:", error);
    throw new Error("Failed to save country to the database");
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
      console.error("Country not found with the provided ID:", id);
      throw new Error("Country not found with the provided ID.");
    }
    console.log("Country updated successfully!");
    return updatedCountry;
  } catch (error) {
    console.error("Error updating country:", error);
    throw new Error("Failed to update country.");
  }
};

// Delete a country by ID
export const removeCountry = async (id: string) => {
  try {
    const deletedCountry = await Country.findByIdAndDelete(id);
    if (!deletedCountry) {
      console.error("Country not found with the provided ID:", id);
      throw new Error("Country not found with the provided ID.");
    }
    console.log("Country deleted successfully!");
    return deletedCountry;
  } catch (error) {
    console.error("Error deleting country:", error);
    throw new Error("Failed to delete country.");
  }
};

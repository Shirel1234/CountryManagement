import {
  saveCountry,
  fetchCountryById,
  modifyCountry,
  removeCountry,
} from "../../services/countryService";
import { describe, expect, it } from "@jest/globals";
import { ICountry } from "../../lib/types/country";
import mongoose from "mongoose";

describe("Country Service Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should save a new country", async () => {
    const countryData = {
      name: "Testland",
      flag: "https://example.com/test.png",
      population: 1000,
      region: "Test Region",
    };
    const savedCountry = await saveCountry(countryData as ICountry);
    expect(savedCountry.name).toBe("Testland");
    expect(savedCountry.flag).toBe("https://example.com/test.png");
  });

  it("should fetch a country by ID", async () => {
    const countryData = {
      name: "Testland",
      flag: "https://example.com/test.png",
      population: 1000,
      region: "Test Region",
      cities: [],
    };
    const savedCountry = await saveCountry(countryData as ICountry);
    const fetchedCountry = await fetchCountryById(savedCountry._id);
    expect(fetchedCountry?.name).toBe("Testland");
  });

  it("should throw an error when fetching a non-existent country", async () => {
    await expect(fetchCountryById("nonexistentId")).rejects.toThrowError();
  });

  it("should modify an existing country", async () => {
    const countryData = {
      name: "Oldland",
      flag: "https://example.com/old.png",
      population: 5000,
      region: "Old Region",
      cities: [],
    };
    const savedCountry = await saveCountry(countryData as ICountry);

    const updatedData = {
      name: "Newland",
      flag: "https://example.com/new.png",
      population: 7000,
      region: "New Region",
      cities: [],
    };
    const updatedCountry = await modifyCountry(
      savedCountry._id.toString(),
      updatedData
    );

    expect(updatedCountry?.name).toBe("Newland");
  });

  it("should remove an existing country", async () => {
    const countryData = {
      name: "Testland",
      flag: "https://example.com/test.png",
      population: 1000,
      region: "Test Region",
    };
    const savedCountry = await saveCountry(countryData as ICountry);

    const deletedCountry = await removeCountry(savedCountry._id.toString());
    expect(deletedCountry?.name).toBe("Testland");

    const fetchedCountry = await fetchCountryById(savedCountry._id.toString());
    expect(fetchedCountry).toBeNull();
  });
});

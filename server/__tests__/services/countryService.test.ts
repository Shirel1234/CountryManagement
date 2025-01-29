import { connectDB, clearDB, closeDB } from "../mocks/mongoose";
import {
  fetchCountriesData,
  saveCountry,
  fetchCountryById,
  modifyCountry,
  removeCountry,
} from "../../src/services/countryService";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { afterEach } from "node:test";
import { ICountry } from "../../src/types/country";

describe("Country Service Tests", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  it("should save a new country", async () => {
    const countryData = {
      name: "Testland",
      flag: "test.png",
      population: 1000,
      region: "Test Region",
    };
    const savedCountry = await saveCountry(countryData as ICountry);
    expect(savedCountry.name).toBe("Testland");
    expect(savedCountry.flag).toBe("test.png");
  });

  it("should fetch a country by ID", async () => {
    const countryData = {
      name: "Testland",
      flag: "test.png",
      population: 1000,
      region: "Test Region",
    };
    const savedCountry = await saveCountry(countryData as ICountry);

    const fetchedCountry = await fetchCountryById(savedCountry._id.toString());
    expect(fetchedCountry?.name).toBe("Testland");
  });

  it("should throw an error when fetching a non-existent country", async () => {
    await expect(fetchCountryById("nonexistentId")).rejects.toThrowError();
  });

  it("should modify an existing country", async () => {
    const countryData = {
      name: "Oldland",
      flag: "old.png",
      population: 5000,
      region: "Old Region",
    };
    const savedCountry = await saveCountry(countryData as ICountry);

    const updatedData = {
      name: "Newland",
      flag: "new.png",
      population: 7000,
      region: "New Region",
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
      flag: "test.png",
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

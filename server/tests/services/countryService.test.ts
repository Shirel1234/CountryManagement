import {
  fetchCountriesData,
  saveCountry,
  fetchCountryById,
  modifyCountry,
  removeCountry,
} from "../../src/services/countryService";
import Country from "../../src/lib/models/countryModel";
import { deleteCountry } from "../../src/controllers/countryController";
import { mockRequest, mockResponse } from "jest-mock-express";

// Mock the Country model
jest.mock("../../src/lib/models/countryModel");

describe("Country Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch countries data from the external API and save to DB if empty", async () => {
    (Country.find as jest.Mock).mockResolvedValueOnce([]);
    (Country.insertMany as jest.Mock).mockResolvedValueOnce([]);

    const countries = await fetchCountriesData();

    expect(Country.find).toHaveBeenCalledTimes(1);
    expect(Country.insertMany).toHaveBeenCalledTimes(1);
    expect(countries).toBeDefined();
  });

  it("should fetch a country by ID", async () => {
    const mockCountry = { _id: "123", name: "Test Country" };
    (Country.findById as jest.Mock).mockResolvedValueOnce(mockCountry);

    const result = await fetchCountryById("123");

    expect(Country.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockCountry);
  });

  it("should save a new country to the database", async () => {
    const mockData = { name: "Test Country" };
    const mockCountry = { _id: "123", ...mockData };

    // Mock the constructor to return the mockCountry object when a new instance is created
    const mockSave = jest.fn().mockResolvedValue(mockCountry);
    const MockedCountry = jest.fn().mockImplementation(() => ({
      save: mockSave,
      _id: mockCountry._id,
      name: mockCountry.name,
    }));

    (Country as unknown as jest.Mock) = MockedCountry;
    const result = await saveCountry(mockData as any);
    const { save, ...resultWithoutSave } = result;

    expect(resultWithoutSave).toEqual({ _id: "123", name: "Test Country" });
    expect(mockSave).toHaveBeenCalledTimes(1); // Ensure save method is called once
  });
  
});

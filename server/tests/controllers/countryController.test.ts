import request from "supertest";
import app from "../../src/app";
import Country from "../../src/lib/models/countryModel";

jest.mock("../../src/lib/models/countryModel");

describe("Country Controller Tests", () => {
  it("should get all countries", async () => {
    const mockCountries = [{ name: "Country 1" }, { name: "Country 2" }];
    (Country.find as jest.Mock).mockResolvedValueOnce(mockCountries);

    const response = await request(app).get("/api/countries");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCountries);
  });

  it("should handle errors when fetching countries", async () => {
    (Country.find as jest.Mock).mockRejectedValueOnce(
      new Error("Database error")
    );

    const response = await request(app).get("/api/countries");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Error fetching countries data.");
  });
});

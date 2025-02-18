import express from "express";
import {
  addCity,
  createCountry,
  deleteCountry,
  getCountries,
  getCountryById,
  removeCity,
  updateCountry,
} from "../controllers/countryController";
import { checkAccessLevel } from "../middleware/authorizationMiddleware";
import { authenticateToken } from "../middleware/authenticateMiddleware";
import { AccessLevel } from "../types/accessLevel";

const router = express.Router();
router.use(authenticateToken);
// Route to get and update countries data if needed
router.get("/countries",checkAccessLevel(AccessLevel.VIEWER), getCountries);
router.get("/countries/:id", checkAccessLevel(AccessLevel.VIEWER), getCountryById);
router.post("/countries", checkAccessLevel(AccessLevel.ADD), createCountry);
router.put("/countries/:id", checkAccessLevel(AccessLevel.UPDATE), updateCountry);
router.delete("/countries/:id", checkAccessLevel(AccessLevel.DELETE), deleteCountry);
router.post("/:id/cities", addCity);
router.delete("/:id/cities", removeCity); 
export default router;

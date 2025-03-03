import express from "express";
import {
  createCountry,
  deleteCountry,
  getCountries,
  getCountryById,
  updateCountry,
} from "../controllers/countryController";
import { checkAccessLevel } from "../middleware/authorizationMiddleware";
import { authenticateToken } from "../middleware/authenticateMiddleware";
import { AccessLevel } from "../types/accessLevel";
import {
  COUNTRY_ROUTES
} from "../constants";

const router = express.Router();
router.use(authenticateToken);
// Route to get and update countries data if needed
router.get(COUNTRY_ROUTES.GET_COUNTRIES,checkAccessLevel(AccessLevel.VIEWER), getCountries);
router.get(COUNTRY_ROUTES.GET_COUNTRY_BY_ID, checkAccessLevel(AccessLevel.VIEWER), getCountryById);
router.post(COUNTRY_ROUTES.CREATE_COUNTRY, checkAccessLevel(AccessLevel.ADD), createCountry);
router.put(COUNTRY_ROUTES.UPDATE_COUNTRY, checkAccessLevel(AccessLevel.UPDATE), updateCountry);
router.delete(COUNTRY_ROUTES.DELETE_COUNTRY, checkAccessLevel(AccessLevel.DELETE), deleteCountry);
 
export default router;

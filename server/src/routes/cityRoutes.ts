import express from "express";
import { checkAccessLevel } from "../middleware/authorizationMiddleware";
import { authenticateToken } from "../middleware/authenticateMiddleware";
import { AccessLevel } from "../types/accessLevel";
import {
  createCity,
  deleteCity,
  getCities,
  getCityById,
  updateCity,
} from "../controllers/cityController";
import { CITY_ROUTES } from "../constants";

const router = express.Router();

router.use(authenticateToken);
router.get(
  CITY_ROUTES.GET_CITIES,
  checkAccessLevel(AccessLevel.VIEWER),
  getCities
);
router.get(
  CITY_ROUTES.GET_CITY_BY_ID,
  checkAccessLevel(AccessLevel.VIEWER),
  getCityById
);
router.post(
  CITY_ROUTES.CREATE_CITY,
  checkAccessLevel(AccessLevel.ADD),
  createCity
);
router.put(
  CITY_ROUTES.UPDATE_CITY,
  checkAccessLevel(AccessLevel.UPDATE),
  updateCity
);
router.delete(
  CITY_ROUTES.DELETE_CITY,
  checkAccessLevel(AccessLevel.DELETE),
  deleteCity
);

export default router;

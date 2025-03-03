import express from "express";
import { checkAccessLevel } from "../middleware/authorizationMiddleware";
import { authenticateToken } from "../middleware/authenticateMiddleware";
import { AccessLevel } from "../types/accessLevel";
import {
  getRequestsByUserId,
  getRequests,
  processRequest,
  requestAccess,
} from "../controllers/requestAccessController";
import { REQUEST_ACCESS_ROUTES } from "../constants";

const router = express.Router();
router.use(authenticateToken);

router.post(REQUEST_ACCESS_ROUTES.REQUEST_ACCESS, requestAccess);
router.get(REQUEST_ACCESS_ROUTES.GET_REQUESTS, getRequests);
router.get("/request-access/:userId", getRequestsByUserId);
router.patch(
  REQUEST_ACCESS_ROUTES.PROCESS_REQUEST,
  checkAccessLevel(AccessLevel.ADMIN),
  processRequest
);

export default router;

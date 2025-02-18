import express from "express";
import {  checkAccessLevel } from "../middleware/authorizationMiddleware";
import { authenticateToken } from "../middleware/authenticateMiddleware";
import { AccessLevel } from "../types/accessLevel";
import { getRequests, processRequest, requestAccess } from "../controllers/requestAccessController";

const router = express.Router();
router.use(authenticateToken);

router.post("/request-access", requestAccess);
router.get("/request-access",checkAccessLevel(AccessLevel.ADMIN), getRequests);
router.patch("/request-access", checkAccessLevel(AccessLevel.ADMIN), processRequest);

export default router;

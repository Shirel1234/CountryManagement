import { Request, Response } from "express";
import {
  createAccessRequest,
  fetchRequests,
  fetchRequestsByUserId,
  updateRequestStatus,
} from "../services/requestAccessService";
import { HTTP_STATUS_CODES, REQUEST_ACCESS_MESSAGES } from "../constants";

export const requestAccess = async (req: Request, res: Response) => {
  try {
    const { action } = req.body;
    console.log("action", action);
    const userId = res.locals.id;

    const request = await createAccessRequest(userId, action);
    res
      .status(HTTP_STATUS_CODES.CREATED)
      .json({ message: REQUEST_ACCESS_MESSAGES.REQUEST_SUBMITTED, request });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: REQUEST_ACCESS_MESSAGES.ERROR_SUBMITTING_REQUEST });
  }
};
export const getRequests = async (req: Request, res: Response) => {
  try {
    const requests = await fetchRequests();
    res.json(requests);
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: REQUEST_ACCESS_MESSAGES.ERROR_FETCHING_REQUESTS });
  }
};
export const getRequestsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userRequests = await fetchRequestsByUserId(userId);

    if (!userRequests.length) {
      res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ message: REQUEST_ACCESS_MESSAGES.NO_REQUESTS_FOUND });
      return;
    }

    res.json(userRequests);
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: REQUEST_ACCESS_MESSAGES.ERROR_FETCHING_REQUESTS });
  }
};
export const processRequest = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const { requestId } = req.params;
    if (!["approved", "denied"].includes(status)) {
      res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ error: REQUEST_ACCESS_MESSAGES.INVALID_STATUS });
      return;
    }
    const updatedRequest = await updateRequestStatus(requestId, status);
    res.json({
      message: REQUEST_ACCESS_MESSAGES.REQUEST_UPDATED(status),
      updatedRequest,
    });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: REQUEST_ACCESS_MESSAGES.ERROR_UPDATING_REQUEST });
  }
};

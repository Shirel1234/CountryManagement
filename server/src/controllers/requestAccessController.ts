import { Request, Response } from "express";
import { createAccessRequest, getPendingRequests, updateRequestStatus } from "../services/requestAccessService";

export const requestAccess = async (req: Request, res: Response) => {
  try {
    const { action } = req.body;
    console.log("action", action)
    const userId = res.locals.id; 

    const request = await createAccessRequest(userId, action);
    res.status(201).json({ message: "Request submitted", request });
  } catch (error) {
    res.status(500).json({ error: "Error submitting request" });
  }
};

export const getRequests = async (req: Request, res: Response) => {
  try {
    const requests = await getPendingRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Error fetching requests" });
  }
};

export const processRequest = async (req: Request, res: Response) => {
  try {
    const { requestId, status } = req.body;
    if (!["approved", "denied"].includes(status)) {
       res.status(400).json({ error: "Invalid status" });
       return;
    }

    const updatedRequest = await updateRequestStatus(requestId, status);
    res.json({ message: `Request ${status}`, updatedRequest });
  } catch (error) {
    res.status(500).json({ error: "Error updating request" });
  }
};

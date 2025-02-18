import { RequestAccess } from "../lib/models/requestAccessModel";
import logger from "../utils/logger";

export const createAccessRequest = async (userId: string, action: "add" | "update" | "delete") => {
  try {
    const newRequest = new RequestAccess({ userId, action });
    await newRequest.save();
    logger.info("Request successfully added!");
    return newRequest;
  } catch (error) {
    logger.error("Error saving request to the database:", error);
    throw error;
  }
};

export const getPendingRequests = async () => {
  return await RequestAccess.find({ status: "pending" }).populate("userId", "email name");
};

export const updateRequestStatus = async (requestId: string, status: "approved" | "denied") => {
  return await RequestAccess.findByIdAndUpdate(requestId, { status }, { new: true });
};

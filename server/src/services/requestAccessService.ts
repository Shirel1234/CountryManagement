import { RequestAccess } from "../lib/models/requestAccessModel";
import logger from "../utils/logger";

export const createAccessRequest = async (
  userId: string,
  action: "add" | "update" | "delete"
) => {
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

export const fetchRequests = async () => {
  try {
    const requests = await RequestAccess.find({}).populate(
      "userId",
      "username"
    );
    if (!requests.length) {
      logger.info("No requests found.");
    } else {
      logger.info(`Fetched ${requests.length} requests.`);
    }
    return requests;
  } catch (error) {
    logger.error("Error fetching pending requests:", error);
    throw error;
  }
};

export const updateRequestStatus = async (
  requestId: string,
  status: "approved" | "denied"
) => {
  try {
    const updatedRequest = await RequestAccess.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );
    if (!updatedRequest) {
      logger.warn(`Request with ID ${requestId} not found.`);
      throw new Error("Request not found");
    }
    logger.info(`Request ${requestId} updated to status: ${status}`);
    return updatedRequest;
  } catch (error) {
    logger.error(`Error updating request status for ID ${requestId}:`, error);
    throw error;
  }
};

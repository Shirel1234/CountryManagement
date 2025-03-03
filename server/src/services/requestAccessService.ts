import { LOGGER_MESSAGES_REQUEST_ACCESS } from "../constants";
import { RequestAccess } from "../lib/models/requestAccessModel";
import logger from "../utils/logger";

export const createAccessRequest = async (
  userId: string,
  action: "add" | "update" | "delete"
) => {
  try {
    const newRequest = new RequestAccess({ userId, action });
    await newRequest.save();
    logger.info(LOGGER_MESSAGES_REQUEST_ACCESS.SUCCESS_ADD_REQUEST);
    return newRequest;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_REQUEST_ACCESS.ERROR_ADD_REQUEST, error);
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
      logger.info(LOGGER_MESSAGES_REQUEST_ACCESS.NO_REQUESTS_FOUND);
    } else {
      logger.info(
        LOGGER_MESSAGES_REQUEST_ACCESS.SUCCESS_FETCH_REQUESTS(requests.length)
      );
    }
    return requests;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_REQUEST_ACCESS.ERROR_FETCH_REQUESTS, error);
    throw error;
  }
};
export const fetchRequestsByUserId = async (userId: string) => {
  try {
    const userRequests = await RequestAccess.find({ userId }).populate(
      "userId",
      "username"
    );

    if (!userRequests.length) {
      logger.info(LOGGER_MESSAGES_REQUEST_ACCESS.NO_REQUESTS_FOUND);
    } else {
      logger.info(
        LOGGER_MESSAGES_REQUEST_ACCESS.SUCCESS_FETCH_REQUESTS(
          userRequests.length
        )
      );
    }

    return userRequests;
  } catch (error) {
    logger.error(LOGGER_MESSAGES_REQUEST_ACCESS.ERROR_FETCH_REQUESTS, error);
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
      logger.warn(LOGGER_MESSAGES_REQUEST_ACCESS.REQUEST_NOT_FOUND(requestId));
      throw new Error(
        LOGGER_MESSAGES_REQUEST_ACCESS.REQUEST_NOT_FOUND(requestId)
      );
    }
    logger.info(
      LOGGER_MESSAGES_REQUEST_ACCESS.SUCCESS_UPDATE_REQUEST(requestId, status)
    );
    return updatedRequest;
  } catch (error) {
    logger.error(
      LOGGER_MESSAGES_REQUEST_ACCESS.ERROR_UPDATE_REQUEST(requestId),
      error
    );
    throw error;
  }
};

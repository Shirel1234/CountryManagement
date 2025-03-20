import axios from "axios";
import { IRequestAccess } from "../types/requestAccess";
import {
  API_ENDPOINTS_REQUEST_ACCESS,
  ERROR_MESSAGES_REQUEST_ACCESS,
  HEADERS,
} from "../../constants";

export const fetchRequests = async (
  userId?: string
): Promise<IRequestAccess[]> => {
  try {
    const url = userId
      ? API_ENDPOINTS_REQUEST_ACCESS.BY_USER_ID(userId)
      : API_ENDPOINTS_REQUEST_ACCESS.ALL;
    const response = await axios.get(url, {
      headers: HEADERS.JSON,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_REQUEST_ACCESS.FETCH_FAILED}: ${error}`);
    throw error;
  }
};
export const fetchRequestsByUserId = async (
  userId: string
): Promise<IRequestAccess[]> => {
  try {
    const response = await axios.get(
      API_ENDPOINTS_REQUEST_ACCESS.BY_USER_ID(userId),
      {
        headers: HEADERS.JSON,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `${ERROR_MESSAGES_REQUEST_ACCESS.FETCH_BY_USER_FAILED}: ${error}`
    );
    throw error;
  }
};
export const addRequestAccess = async (newRequest: {
  action: string;
}): Promise<IRequestAccess> => {
  try {
    const response = await axios.post(
      API_ENDPOINTS_REQUEST_ACCESS.ALL,
      JSON.stringify(newRequest),
      {
        headers: HEADERS.JSON,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_REQUEST_ACCESS.ADD_FAILED}: ${error}`);
    throw error;
  }
};
export const updateRequest = async (
  id: string | null,
  updatedData: { status: string }
): Promise<IRequestAccess> => {
  try {
    const response = await axios.patch(
      API_ENDPOINTS_REQUEST_ACCESS.BY_ID(id),
      updatedData,
      {
        headers: HEADERS.JSON,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_REQUEST_ACCESS.UPDATE_FAILED}: ${error}`);
    throw error;
  }
};

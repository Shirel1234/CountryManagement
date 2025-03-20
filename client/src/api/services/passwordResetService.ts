import axios from "axios";
import {
  API_ENDPOINTS_PASSWORD_RESET,
  ERROR_MESSAGES_PASSWORD_RESET,
  HEADERS,
} from "../../constants";

export const requestPasswordResetClient = async (
  email: string
): Promise<void> => {
  try {
    await axios.post(
      API_ENDPOINTS_PASSWORD_RESET.REQUEST_PASSWORD_RESET,
      { email },
      {
        headers: HEADERS.JSON,
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(ERROR_MESSAGES_PASSWORD_RESET.REQUEST_FAILED, error);
    throw error;
  }
};
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  try {
    await axios.post(
      API_ENDPOINTS_PASSWORD_RESET.RESET_PASSWORD,
      { token, newPassword },
      {
        headers: HEADERS.JSON,
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(ERROR_MESSAGES_PASSWORD_RESET.RESET_FAILED, error);
    throw error;
  }
};

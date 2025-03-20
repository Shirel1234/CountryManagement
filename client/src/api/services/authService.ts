import axios from "axios";
import { API_ENDPOINTS_AUTH, ERROR_MESSAGES_AUTH, HEADERS } from "../../constants";

export const registerUser = async (
  formData: FormData
): Promise<{
  token: string;
  myId: string;
  myUsername: string;
  myProfileImage: string;
}> => {
  try {
    const response = await axios.post(API_ENDPOINTS_AUTH.REGISTER, formData, {
      headers: HEADERS.MULTIPART,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_AUTH.REGISTER_FAILED}: ${error}`);
    throw error;
  }
};
export const loginUser = async (
  username: string,
  password: string
): Promise<{
  token: string;
  myId: string;
  myUsername: string;
  myProfileImage: string;
}> => {
  try {
    const response = await axios.post(
      API_ENDPOINTS_AUTH.LOGIN,
      { username, password },
      {
        headers: HEADERS.JSON,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`${ERROR_MESSAGES_AUTH.LOGIN_FAILED}: ${error}`);
    throw error;
  }
};
export const logoutUser = async (): Promise<void> => {
  try {
    await axios.post(
      API_ENDPOINTS_AUTH.LOGOUT,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(`${ERROR_MESSAGES_AUTH.GENERAL_ERROR}: ${error}`);
    throw error;
  }
};

import axios from "axios";

// Use the VITE_BASE_URL environment variable
const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_BASE_URL is not defined in the environment variables");
}

export const requestPasswordResetClient = async (
  email: string
): Promise<void> => {
  try {
    await axios.post(
      `${BASE_URL}/api/request-password-reset`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(`Error requesting password reset: ${error}`);
    throw error;
  }
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  try {
    await axios.post(
      `${BASE_URL}/api/reset-password`,
      { token, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(`Error resetting password: ${error}`);
    throw error;
  }
};

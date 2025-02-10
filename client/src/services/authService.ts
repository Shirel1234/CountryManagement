import axios from "axios";

// Use the VITE_BASE_URL environment variable
const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_BASE_URL is not defined in the environment variables");
}
export const loginUser = async (
  username: string,
  password: string
): Promise<{ token: string }> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const { token, myUsername, myProfileImage } = response.data;
    localStorage.setItem(
      "userData",
      JSON.stringify({ myUsername, myProfileImage })
    );
    return { token };
  } catch (error) {
    console.error(`Error logging in: ${error}`);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  await axios.post(
    `${BASE_URL}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const registerUser = async (
  formData: FormData
): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    const { token, myUsername, myProfileImage } = response.data;
    localStorage.setItem(
      "userData",
      JSON.stringify({ myUsername, myProfileImage })
    );

    return { token };
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    throw error;
  }
};

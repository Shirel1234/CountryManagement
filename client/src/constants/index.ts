// =======================
// API BASE URL
// =======================
export const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_BASE_URL is not defined in the environment variables");
}

// =======================
// LOCAL STORAGE KEYS
// =======================
export const LOCAL_STORAGE_KEYS = {
  USER_DATA: "userData",
};

// =======================
// HEADERS
// =======================
export const HEADERS = {
  JSON: { "Content-Type": "application/json" },
  MULTIPART: { "Content-Type": "multipart/form-data" },
};
// =======================
// API CONFIGURATION
// =======================
export const API_CONFIG = {
  RETRY: 2,
  STALE_TIME: 5 * 60 * 1000,
};
// =======================
// API ENDPOINTS
// =======================
export const API_ENDPOINTS_AUTH = {
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  REGISTER: `${BASE_URL}/auth/register`,
};
export const API_ENDPOINTS_CITY = {
  CITIES: `${BASE_URL}/api/cities`,
  CITY_BY_ID: (id: string | undefined) => `${BASE_URL}/api/cities/${id}`,
};
export const API_ENDPOINTS_COUNTRY = {
  COUNTRIES: `${BASE_URL}/api/countries`,
  COUNTRY_BY_ID: (id: string | undefined) => `${BASE_URL}/api/countries/${id}`,
};
export const API_ENDPOINTS_PASSWORD_RESET = {
  REQUEST_PASSWORD_RESET: `${BASE_URL}/api/request-password-reset`,
  RESET_PASSWORD: `${BASE_URL}/api/reset-password`,
};
export const API_ENDPOINTS_REQUEST_ACCESS = {
  ALL: `${BASE_URL}/api/request-access`,
  BY_USER_ID: (userId: string) => `${BASE_URL}/api/request-access/${userId}`,
  BY_ID: (id: string | null) => `${BASE_URL}/api/request-access/${id}`,
};
export const API_ENDPOINTS_USER = {
  ALL: `${BASE_URL}/api/users`,
  BY_ID: (id: string | null) => `${BASE_URL}/api/users/${id}`,
};
// =======================
// API ERROR MESSAGES
// =======================
export const ERROR_MESSAGES_AUTH = {
  LOGIN_FAILED: "Error logging in",
  REGISTER_FAILED: "Error registering user",
  GENERAL_ERROR: "An error occurred",
};
export const ERROR_MESSAGES_CITY = {
  FETCH_CITIES_FAILED: "Error fetching cities",
  FETCH_CITY_FAILED: "Error fetching city by ID",
  DELETE_CITY_FAILED: "Error deleting city",
  UPDATE_CITY_FAILED: "Error updating city",
  ADD_CITY_FAILED: "Error adding city",
};
export const ERROR_MESSAGES_COUNTRY = {
  FETCH_COUNTRIES_FAILED: "Error fetching countries",
  FETCH_COUNTRY_FAILED: "Error fetching country by ID",
  DELETE_COUNTRY_FAILED: "Error deleting country",
  UPDATE_COUNTRY_FAILED: "Error updating country",
  ADD_COUNTRY_FAILED: "Error adding country",
};
export const ERROR_MESSAGES_PASSWORD_RESET = {
  REQUEST_FAILED: "Error requesting password reset",
  RESET_FAILED: "Error resetting password",
};
export const ERROR_MESSAGES_REQUEST_ACCESS = {
  FETCH_FAILED: "Error fetching requests access",
  FETCH_BY_USER_FAILED: "Error fetching requests for user",
  ADD_FAILED: "Error adding a request",
  UPDATE_FAILED: "Error updating request status",
};
export const ERROR_MESSAGES_USER = {
  FETCH_FAILED: "Error fetching users",
  FETCH_BY_ID_FAILED: "Error fetching user by ID",
  ADD_FAILED: "Error adding user",
  UPDATE_FAILED: "Error updating user",
  DELETE_FAILED: "Error deleting user",
};
// =======================
// QUERY KEYS
// =======================
export const QUERY_KEYS = {
  CITIES: "cities",
  COUNTRIES: "countries",
  REQUESTS: "requests",
  USERS: "users",
};
// =======================
// MUTATION MESSAGES
// =======================
export const CITY_MUTATION_MESSAGES = {
  CITY_DELETED: "City deleted successfully!",
  CITY_ADDED: "City added successfully!",
  CITY_UPDATED: "City updated successfully!",
  DELETE_CITY_FAILED: "Failed to delete city.",
  ADD_CITY_FAILED: "Failed to add city.",
  UPDATE_CITY_FAILED: "Failed to update the city.",
};
export const COUNTRY_MUTATION_MESSAGES = {
  COUNTRY_DELETED: "Country deleted successfully!",
  COUNTRY_ADDED: "Country added successfully!",
  COUNTRY_UPDATED: "Country updated successfully!",
  DELETE_COUNTRY_FAILED: "Failed to delete country.",
  ADD_COUNTRY_FAILED: "Failed to add country.",
  UPDATE_COUNTRY_FAILED: "Failed to update the country.",
};
export const REQUEST_ACCESS_MUTATION_MESSAGES = {
  REQUEST_SENT: "Request sent to the admin!",
  REQUEST_UPDATED: "Request updated successfully!",
  REQUEST_FAILED: "Failed to send request.",
  UPDATE_FAILED: "Failed to update the request.",
};
export const USER_MUTATION_MESSAGES = {
  USER_ADDED: "User added successfully!",
  USER_REGISTERED: "User registered successfully!",
  USER_UPDATED: "User updated successfully!",
  USER_DELETED: "User deleted successfully!",
  ADD_USER_FAILED: "Failed to add User.",
  REGISTER_USER_FAILED: "Error registering user",
  UPDATE_USER_FAILED: "Failed to update the User.",
  DELETE_USER_FAILED: "Failed to delete user.",
};
// =======================
// VALIDATION MESSAGES
// =======================
export const VALIDATION_MESSAGES_CITY = {
  REQUIRED: "City name is required",
  MIN_LENGTH: "Name should have at least 3 characters.",
  NO_NUMBERS: "Name must not contain numbers.",
  ID_REQUIRED: "City ID is required",
};
export const VALIDATION_MESSAGES_COUNTRY = {
  NAME_REQUIRED: "Country name is required",
  NAME_MIN_LENGTH: "Name should have at least 3 characters.",
  NAME_NO_NUMBERS: "Name must not contain numbers.",
  FLAG_REQUIRED: "Flag is required",
  FLAG_INVALID: "Flag should be a valid image URL (jpg, jpeg, png, gif).",
  POPULATION_REQUIRED: "Population is required",
  POPULATION_MIN: "Population cannot be a negative number",
  REGION_REQUIRED: "Region is required",
  REGION_NO_NUMBERS: "Region must not contain numbers.",
};
export const VALIDATION_MESSAGES_USER = {
  FIRST_NAME_REQUIRED: "First Name is required",
  FIRST_NAME_MIN_LENGTH: "First name must have at least 2 characters",
  LAST_NAME_REQUIRED: "Last Name is required",
  LAST_NAME_MIN_LENGTH: "Last name must have at least 2 characters",
  USERNAME_REQUIRED: "Username is required",
  USERNAME_INVALID:
    "Username can only contain letters, numbers, and underscores.",
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Invalid email format",
  PHONE_REQUIRED: "Phone is required",
  PHONE_INVALID: "Invalid phone number",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN_LENGTH: "Password must have at least 6 characters",
};
// =======================
// TOAST MESSAGES
// =======================
export const TOAST_MESSAGES_LOGIN = {
  LOGIN_SUCCESS: "Login successful! Welcome back!",
  LOGIN_FAILURE: "Failed to log in. Please try again.",
};
export const TOAST_MESSAGES_FORGOT_PASSWORD = {
  RESET_LINK_SUCCESS: "Reset link sent! Check your email.",
  RESET_LINK_FAILURE: "Failed to send reset link. Try again.",
};
export const TOAST_MESSAGES_DATA_LIST = {
  LOAD_DATA_SUCCESS: "Data loaded successfully!",
  LOAD_DATA_FAILURE: "Failed to load data.",
};
// =======================
// CONSOLE MESSAGES
// =======================
export const CITY_ERROR_MESSAGES="Error in adding city";
export const NAVBAR_ERROR_MESSAGES="Error logging out:";
export const BOUNDARY_ERROR_MESSAGES="Uncaught error:";
// =======================
// ROUTES
// =======================
export const ROUTES = {
  LANDING_PAGE: "/",
  HOME: "/home",
  MANAGE_COUNTRIES: "/manage-countries",
  EDIT_COUNTRY: (id: string) => `/edit-country/${id}`,
  MANAGE_USERS: "/manage-users",
  EDIT_USER: (id: string) => `/edit-user/${id}`,
  UPDATE_PROFILE: (id: string | undefined) => `/update-profile/${id}`,
  MANAGE_REQUESTS: "/manage-requests",
  REQUEST_ACCESS: (id: string | undefined) => `/request-access/${id}`,
  SIGN_UP: "/sign-up",
  LOGIN: "/login",
  RESET_PASSWORD: "/reset-password",
  ADMIN: "/admin",
};

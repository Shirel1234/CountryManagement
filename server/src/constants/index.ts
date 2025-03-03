import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

// =======================
// SERVER CONFIGURATION
// =======================
export const PORT = process.env.PORT || 5000;
export const UPLOADS_DIR = path.join(__dirname, "../../public/uploads");

// =======================
// DATABASE CONFIG
// =======================
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mydb";

// =======================
// EMAIL CONFIG
// =======================
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const FRONTEND_URL = process.env.FRONTEND_URL;

// =======================
// TRANSPORTER CONFIG
// =======================
export const TRANSPORTER = {
  service: "Gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
};
// =======================
// SECURITY CONFIG
// =======================
export const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
];
export const ALLOWED_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];
export const ALLOWED_HEADERS = ["Content-Type", "Authorization"];

// =======================
// API ROUTES
// =======================
export const API_URL = "https://restcountries.com/v3.1/all";
export const API_PREFIX = "/api";
export const AUTH_PREFIX = "/auth";
export const COUNTRY_PREFIX = "/countries";
export const CITY_PREFIX = "/cities";
export const USER_PREFIX = "/users";
export const REQUEST_ACCESS_PREFIX = "/request-access";
//export const PASSWORD_RESET_PREFIX = "/password-reset";

export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
};
export const COUNTRY_ROUTES = {
  GET_COUNTRIES: `${COUNTRY_PREFIX}`,
  GET_COUNTRY_BY_ID: `${COUNTRY_PREFIX}/:id`,
  CREATE_COUNTRY: `${COUNTRY_PREFIX}`,
  UPDATE_COUNTRY: `${COUNTRY_PREFIX}/:id`,
  DELETE_COUNTRY: `${COUNTRY_PREFIX}/:id`,
};
export const CITY_ROUTES = {
  GET_CITIES: `${CITY_PREFIX}`,
  GET_CITY_BY_ID: `${CITY_PREFIX}/:id`,
  CREATE_CITY: `${CITY_PREFIX}`,
  UPDATE_CITY: `${CITY_PREFIX}/:id`,
  DELETE_CITY: `${CITY_PREFIX}/:id`,
};
export const USER_ROUTES = {
  GET_USERS: `${USER_PREFIX}`,
  GET_USER_BY_ID: `${USER_PREFIX}/:id`,
  CREATE_USER: `${USER_PREFIX}`,
  UPDATE_USER: `${USER_PREFIX}/:id`,
  DELETE_USER: `${USER_PREFIX}/:id`,
};
export const REQUEST_ACCESS_ROUTES = {
  REQUEST_ACCESS: `${REQUEST_ACCESS_PREFIX}`,
  GET_REQUESTS: `${REQUEST_ACCESS_PREFIX}`,
  PROCESS_REQUEST: `${REQUEST_ACCESS_PREFIX}/:requestId`,
};
export const PASSWORD_RESET_ROUTES = {
  REQUEST_PASSWORD_RESET: "/request-password-reset",
  RESET_PASSWORD: "/reset-password",
};

// =======================
// CONTROLLER MESSAGES
// =======================
export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
export const AUTH_MESSAGES = {
  USERNAME_PASSWORD_REQUIRED: "Username and password are required.",
  INVALID_USERNAME_PASSWORD: "Invalid username or password.",
  LOGIN_SUCCESSFUL: "Login successful.",
  MISSING_REQUIRED_FIELDS: "Missing required fields.",
  REGISTRATION_SUCCESSFUL: "Registration successful.",
  LOGOUT_SUCCESSFUL: "Logout successful.",
  INTERNAL_SERVER_ERROR: "Internal server error.",
};
export const CITY_MESSAGES = {
  ERROR_FETCHING_CITIES: "Error fetching cities data.",
  CITY_NOT_FOUND: "City not found",
  ERROR_FETCHING_CITY: "Error fetching city data",
  FAILED_TO_CREATE_CITY: "Failed to create city",
  FAILED_TO_UPDATE_CITY: "Failed to update city",
  FAILED_TO_DELETE_CITY: "Failed to delete city",
};
export const COUNTRY_MESSAGES = {
  FETCH_ERROR: "Error fetching countries data.",
  NOT_FOUND: "Country not found",
  FETCH_BY_ID_ERROR: "Error fetching country data",
  CREATE_ERROR: "Failed to create country",
  UPDATE_ERROR: "Failed to update country",
  DELETE_ERROR: "Failed to delete country",
};
export const PASSWORD_RESET_MESSAGES = {
  EMAIL_REQUIRED: "Email is required.",
  EMAIL_SENT: "Password reset email sent.",
  INTERNAL_SERVER_ERROR: "Internal server error.",
  TOKEN_PASSWORD_REQUIRED: "Token and new password are required.",
  PASSWORD_RESET_SUCCESS: "Password successfully reset.",
};
export const REQUEST_ACCESS_MESSAGES = {
  REQUEST_SUBMITTED: "Request submitted",
  ERROR_SUBMITTING_REQUEST: "Error submitting request",
  ERROR_FETCHING_REQUESTS: "Error fetching requests",
  NO_REQUESTS_FOUND: "No requests found for this user.",
  INVALID_STATUS: "Invalid status",
  REQUEST_UPDATED: (status: string) => `Request ${status}`,
  ERROR_UPDATING_REQUEST: "Error updating request",
};
export const USER_MESSAGES = {
  ERROR_FETCHING_USERS: "Error fetching users data.",
  USER_NOT_FOUND: "User not found.",
  ERROR_FETCHING_USER: "Error fetching user data",
  FAILED_CREATE_USER: "Failed to create user",
  INVALID_ACCESS_LEVEL: "Invalid access level.",
  FAILED_UPDATE_USER: "Failed to update user",
  FAILED_DELETE_USER: "Failed to delete user",
};

// =======================
// SERVICE LOGGER
// =======================
export const LOGGER_MESSAGES_AUTH = {
  USER_NOT_FOUND: "User not found with the provided username:",
  INVALID_CREDENTIALS: "Invalid username or password.",
  AUTH_ERROR: "Error authenticating user:",
  REGISTER_SUCCESS: "User successfully registered!",
  REGISTER_ERROR: "Error saving user to the database:",
};
export const LOGGER_MESSAGES_CITY = {
  ERROR_FETCHING_CITIES: "Error fetching cities data.",
  CITY_NOT_FOUND: "City not found with the provided ID:",
  ERROR_FETCHING_CITY_BY_ID: "Error fetching City by ID.",
  ERROR_SAVING_CITY: "Error saving City to the database:",
  CITY_ADDED_SUCCESS: "City successfully added!",
  ERROR_UPDATING_CITY: "Error updating city:",
  CITY_UPDATED_SUCCESS: "City updated successfully!",
  ERROR_DELETING_CITY: "Error deleting city:",
  CITY_DELETED_SUCCESS: "City deleted successfully!",
};
export const LOGGER_MESSAGES_COUNTRY = {
  NO_COUNTRIES: "No countries in the database. Adding new data...",
  COUNTRIES_ADDED: "Countries added to the database!",
  COUNTRIES_EXIST: "Countries data already exists in the database!",
  FETCH_ERROR: "Error fetching countries data:",
  COUNTRY_NOT_FOUND: "Country not found with the provided ID:",
  SAVE_SUCCESS: "Country successfully added!",
  SAVE_ERROR: "Error saving country to the database:",
  UPDATE_SUCCESS: "Country updated successfully!",
  UPDATE_ERROR: "Error updating country:",
  DELETE_SUCCESS: "Country deleted successfully!",
  DELETE_ERROR: "Error deleting country:",
};
export const LOGGER_MESSAGES_PASSWORD_RESET = {
  USER_NOT_FOUND: "User not found for email: ",
  RESET_EMAIL_SENT: "Password reset email sent to ",
  ERROR_SENDING_RESET_EMAIL: "Error sending password reset email: ",
  ERROR_CREATING_RESET_ENTRY: "Error creating password reset entry for user: ",
  RESET_SUCCESSFUL: "Password reset successful for user ",
  INVALID_OR_EXPIRED_TOKEN: "Invalid or expired password reset token",
  ERROR_RESETTING_PASSWORD: "Error resetting password: ",
  USER_NOT_FOUND_FOR_RESET_TOKEN: "User not found for reset token: ",
};
export const LOGGER_MESSAGES_REQUEST_ACCESS = {
  SUCCESS_ADD_REQUEST: "Request successfully added!",
  ERROR_ADD_REQUEST: "Error saving request to the database:",
  NO_REQUESTS_FOUND: "No requests found.",
  SUCCESS_FETCH_REQUESTS: (count: number) => `Fetched ${count} requests.`,
  ERROR_FETCH_REQUESTS: "Error fetching pending requests:",
  REQUEST_NOT_FOUND: (requestId: string) =>
    `Request with ID ${requestId} not found.`,
  SUCCESS_UPDATE_REQUEST: (requestId: string, status: string) =>
    `Request ${requestId} updated to status: ${status}`,
  ERROR_UPDATE_REQUEST: (requestId: string) =>
    `Error updating request status for ID ${requestId}:`,
};
export const LOGGER_MESSAGES_USER = {
  ERROR_FETCH_USERS: "Error fetching Users data:",
  ERROR_FETCH_USER_BY_ID: "Error fetching user by ID:",
  USER_NOT_FOUND_BY_ID: (id: string) =>
    `User not found with the provided ID: ${id}`,
  SUCCESS_ADD_USER: "User successfully added!",
  ERROR_SAVE_USER: "Error saving user to the database:",
  SUCCESS_UPDATE_USER: "User updated successfully!",
  ERROR_UPDATE_USER: "Error updating User:",
  ERROR_DELETE_USER: "Error deleting user:",
  SUCCESS_DELETE_USER: "User deleted successfully!",
};

// =======================
// LOGGING CONFIG
// =======================
export const LOG_LEVEL = process.env.LOG_LEVEL || "info";

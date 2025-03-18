import express from "express";
import countryRoutes from "./routes/countryRoutes";
import cityRoutes from "./routes/cityRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import passwordResetRoutes from "./routes/passwordResetRoutes";
import requestAccessRoutes from "./routes/requestAccessRoutes";
import connect from "./lib/db/mongodb";
import cors from "cors";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import logger from "./utils/logger";
import cookieParser from "cookie-parser";
import {
  PORT,
  ALLOWED_ORIGINS,
  ALLOWED_METHODS,
  ALLOWED_HEADERS,
  API_PREFIX,
  AUTH_PREFIX,
  UPLOADS_DIR,
  LOGGER_MESSAGES,
  COUNTRY_PREFIX,
  CITY_PREFIX,
  USER_PREFIX,
  REQUEST_ACCESS_PREFIX,
} from "../src/constants";

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    methods: ALLOWED_METHODS,
    allowedHeaders: ALLOWED_HEADERS,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
// Use SQL Injection Middleware
app.use(mongoSanitize());
// XSS Protection Middleware
app.use(xssClean());

app.use("/uploads", express.static(UPLOADS_DIR));

app.use(`${API_PREFIX}${COUNTRY_PREFIX}`, countryRoutes);
app.use(`${API_PREFIX}${CITY_PREFIX}`, cityRoutes);
app.use(`${API_PREFIX}${USER_PREFIX}`, userRoutes);
app.use(AUTH_PREFIX, authRoutes);
app.use(API_PREFIX, passwordResetRoutes);
app.use(`${API_PREFIX}${REQUEST_ACCESS_PREFIX}`, requestAccessRoutes);

const startServer = async () => {
  try {
    await connect();
    console.log("listennnnnn")
    app.listen(PORT, () => {
      logger.info(LOGGER_MESSAGES.SERVER_START(PORT));
    });
  } catch (error) {
    logger.error(LOGGER_MESSAGES.SERVER_ERROR, error);
    throw new Error(LOGGER_MESSAGES.SERVER_ERROR);
  }
};

  // startServer();

  export { app, startServer };

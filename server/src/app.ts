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

app.use(API_PREFIX, countryRoutes);
app.use(API_PREFIX, cityRoutes);
app.use(API_PREFIX, userRoutes);
app.use(AUTH_PREFIX, authRoutes);
app.use(API_PREFIX, passwordResetRoutes);
app.use(API_PREFIX, requestAccessRoutes);

// Start the server only if this file is run directly
const startServer = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();

export default app;

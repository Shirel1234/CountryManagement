import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import countryRoutes from "./routes/countryRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import passwordResetRoutes from "./routes/passwordResetRoutes";
import requestAccessRoutes from "./routes/requestAccessRoutes";
import connect from "./lib/db/mongodb";
import path from "path";
import cors from "cors";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import logger from "./utils/logger";
import cookieParser from "cookie-parser";

dotenv.config({ path: path.resolve(__dirname, "../src/config/.env") });

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

// Use SQL Injection Middleware
app.use(mongoSanitize());

// XSS Protection Middleware
app.use(xssClean());


app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use("/api", countryRoutes);
app.use("/api", userRoutes);
app.use("/auth", authRoutes);
app.use("/api", passwordResetRoutes);
app.use("/api", requestAccessRoutes);

// Start the server only if this file is run directly
const startServer = async () => {
  try {
    await connect();
    const PORT = process.env.PORT || 5000;
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

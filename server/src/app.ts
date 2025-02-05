import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import countryRoutes from "./routes/countryRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import connect from "./lib/db/mongodb";
import path from "path";
import cors from "cors";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import logger from "./utils/logger";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../src/config/.env") });

// Initialize the Express app
const app = express();

// Middleware for CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware for parsing JSON bodies
app.use(express.json());

// Use SQL Injection Middleware
app.use(mongoSanitize());

// XSS Protection Middleware
app.use(xssClean());

// Use country routes
app.use("/api", countryRoutes);
// Use user routes
app.use("/api", userRoutes);
// Use auth routes
app.use("/auth", authRoutes);

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

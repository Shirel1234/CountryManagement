import mongoose from "mongoose";
import logger from "../../utils/logger";
import { fetchInitialCountries } from "../../services/countryService";
import "../models/cityModel";

let isConnected = false;
const connect = async () => {
  logger.info("Connecting to MongoDB...");
  if (isConnected) {
    logger.info("Already connected to MongoDB");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connection.readyState === 1;
    logger.info("Mongodb connection saccessfull !!!");

    // Fetch initial countries data after connection
    await fetchInitialCountries();
    logger.info("Initial country data fetched and stored.");
  } catch (error) {
    logger.error("Error in connection to mongodb" + error);
    throw new Error("Error in connection to mongodb" + error);
  }
};

export default connect;

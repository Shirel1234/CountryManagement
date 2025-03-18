import mongoose from "mongoose";
import logger from "../../utils/logger";
import { fetchInitialCountries } from "../../services/countryService";
import "../models/cityModel";
import { LOGGER_MESSAGES_DB } from "../../constants";

let isConnected = false;
const connect = async () => {
  logger.info(LOGGER_MESSAGES_DB.CONNECTING);
  if (isConnected) {
    logger.info(LOGGER_MESSAGES_DB.ALREADY_CONNECTED);
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connection.readyState === 1;
    logger.info(LOGGER_MESSAGES_DB.CONNECTION_SUCCESS);

    // Fetch initial countries data after connection
    await fetchInitialCountries();
    logger.info(LOGGER_MESSAGES_DB.INITIAL_COUNTRIES_FETCHED);
  } catch (error) {
    logger.error(LOGGER_MESSAGES_DB.CONNECTION_ERROR + error);
    throw new Error(LOGGER_MESSAGES_DB.CONNECTION_ERROR + error);
  }
};

export default connect;

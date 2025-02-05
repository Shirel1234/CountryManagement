import mongoose from "mongoose";
import logger from "../../utils/logger";

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
    //קריאה לנתונים
  } catch (error) {
    logger.error("Error in connection to mongodb" + error);
    throw new Error("Error in connection to mongodb" + error);
  }
};

export default connect;

import mongoose from "mongoose";

let isConnected = false;
const connect = async () => {
  console.log("mongo", process.env.MONGODB_URI);
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connection.readyState === 1;
    console.log("Mongodb connection saccessfull !!!");
    //קריאה לנתונים
  } catch (error) {
    throw new Error("Error in connection to mongodb" + error);
  }
};

export default connect;

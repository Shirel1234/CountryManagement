import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../__tests__/.env_test" });

const generateMockToken = (userData?: { username: string; accessLevel: number; }) => {
  const payload = {
    id: "67d8232ef1b71b74c7c0a285",
    username: userData?.username || "admin", 
    accessLevel: userData?.accessLevel || 5,  
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

export default generateMockToken;

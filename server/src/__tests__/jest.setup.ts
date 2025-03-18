import dotenv from "dotenv";
import "../lib/models/cityModel";

// Load test environment variables
dotenv.config({ path: "./__tests__/.env_test" });

console.log("Loaded .env_test for testing environment.");
console.log(process.env.MONGODB_URI);

import mongoose from "mongoose";
import { createClient } from "redis";

// MongoDB Connection
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit if DB connection fails
  }
};

// Redis Connection
export const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Connected");
  } catch (error) {
    console.error("Redis Connection Error:", error);
  }
};

import mongoose from "mongoose";
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();
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
export const redisClient = createClient({
  username:"default",
  password: process.env.PASSWORD,
  socket: {
    host: process.env.REDIS_URL!,
    port:15122,
  },
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));

export const connectRedis = async () => {
  try {
    console.log(process.env.PASSWORD,process.env.USERNAME)
    await redisClient.connect();
    console.log("Redis Connected");
  } catch (error) {
    console.error("Redis Connection Error:", error);
  }
};

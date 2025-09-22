
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not set.");
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      autoIndex: true, // optional
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

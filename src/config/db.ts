
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not set.");
}


export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      autoIndex: true, // optional: automatically build indexes
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // exit the app if DB connection fails
  }
};

// Optional: export the mongoose instance if needed
export default mongoose;


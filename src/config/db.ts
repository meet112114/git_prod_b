import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) throw new Error("no url available");

  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

export default connectDB;

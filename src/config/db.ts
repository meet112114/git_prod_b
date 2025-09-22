import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI_PROD;
  if (!MONGO_URI) throw new Error("no url available");

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      autoIndex: true, // optional, useful in prod
    });
    console.log(`✅ DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ DB connection error:", error);
    process.exit(1); // exit the app if DB connection fails
  }
};

export default connectDB;

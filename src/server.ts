import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes"


const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,               
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/products",  productRoutes);


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

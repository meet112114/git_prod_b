import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const register = async (req: Request, res: Response) => {
  try {
    const { name ,email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { name: user.name,
              id: user._id, 
              email: user.email, 
              role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const login = async (req: Request, res: Response) => {
  
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    console.log("token:", token);

res.cookie("token", token, {
  httpOnly: true,
  secure: false,  
  sameSite: "lax",
  maxAge: 24*60*60*1000,
  path: "/",
});

    res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email, role: user.role , token:token }, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = user; 
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

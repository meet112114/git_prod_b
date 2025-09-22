import { Request, Response } from "express";
import Product from "../models/Product";

export const addProduct = async (req: Request, res: Response) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: " admins only" });
    }

    const { productName, productDesc, productPrice, productImageLink } = req.body;

    if (!productName || !productDesc || !productPrice) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const product = await Product.create({
      productName,
      productDesc,
      productPrice,
      productImageLink,
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req:Request, res:Response) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "admins only." });
    }

    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


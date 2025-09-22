import { Request, Response } from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";
import { Types } from "mongoose";


const calculateTotal = async (cart: any) => {
  let total = 0;
  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.productPrice * item.quantity;
    }
  }
  return total;
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id as Types.ObjectId;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
        totalPrice: product.productPrice * quantity,
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

  if (itemIndex > -1) {
  cart.items[itemIndex].quantity += quantity;
  if (cart.items[itemIndex].quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  }
} else {
  if (quantity > 0) {
    cart.items.push({ product: productId, quantity });
  }
}
    cart.totalPrice = await calculateTotal(cart);
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id as Types.ObjectId;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    }

    cart.totalPrice = await calculateTotal(cart);

    await cart.save();

   
    const updatedCart = await Cart.findById(cart._id).populate("items.product");

    res.status(200).json({ message: "Cart updated", cart: updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id as Types.ObjectId;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(200).json({ cart: { items: [], totalPrice: 0 } });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id as Types.ObjectId;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

      if (!cart.items.length) {
  return res.status(200).json({ message: "Cart is empty", cart });
}

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

  

    cart.totalPrice = await calculateTotal(cart);
    await cart.save();

    res.status(200).json({ message: "Product removed", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

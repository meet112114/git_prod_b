import { Router } from "express";
import { addToCart } from "../controllers/cartController";
import { getCart } from "../controllers/cartController";
import { removeFromCart } from "../controllers/cartController";
import { authenticateUser  } from "../middleware/authMiddleware"; 
import { updateCartItem } from "../controllers/cartController";
const router = Router();


router.post("/add", authenticateUser, addToCart);

router.get("/", authenticateUser, getCart);

router.delete("/remove", authenticateUser, removeFromCart);

router.post("/update", authenticateUser, updateCartItem); 

export default router;

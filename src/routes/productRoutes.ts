import { Router } from "express";
import { authenticateAdmin} from "../middleware/authMiddleware";
import { addProduct , getAllProducts , deleteProduct } from "../controllers/productController";

const router = Router();

router.post("/add" , authenticateAdmin , addProduct);

router.get("/", getAllProducts);

router.delete("/delete/:id", authenticateAdmin, deleteProduct);


export default router;

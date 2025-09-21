import { Router } from "express";
import { authenticateAdmin} from "../middleware/authMiddleware";
import { addProduct , getAllProducts  } from "../controllers/productController";

const router = Router();

router.post("/add" , addProduct);

router.get("/", getAllProducts);



export default router;

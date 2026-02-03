import express from "express";
import {
    createProduct,
    getAllProducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { sellerOnly } from "../middleware/roleMiddleware.js";


const router = express.Router();

router.get("/", getAllProducts);
router.post("/", protect, sellerOnly, createProduct);

export default router;
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { sellerOnly } from "../middleware/roleMiddleware.js";
import { getSellerOrders } from "../controllers/sellerOrderController.js";

const router = express.Router();

router.get("/orders", protect, sellerOnly, getSellerOrders);

export default router;

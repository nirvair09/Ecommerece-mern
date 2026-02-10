import express from "express";
import { cancelOrder, getMyOrders, placeOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.post("/cancel", protect, cancelOrder);
export default router;
import express from "express";
import { cancelOrder, getMyOrders, placeOrder } from "../controllers/orderController";
import { protect } from "../middleware/authMiddleware";

const route = express.Router();

route.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.port("/cancel", protect, cancelOrder)
export default route;
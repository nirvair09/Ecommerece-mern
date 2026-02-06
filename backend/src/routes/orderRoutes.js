import express from "express";
import { getMyOrders, placeOrder } from "../controllers/orderController";
import { protect } from "../middleware/authMiddleware";

const route = express.Router();

route.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);

export default route;
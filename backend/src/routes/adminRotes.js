import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/orders", protect, adminOnly, getAllOrders);
router.post("/toggle-user-active-status", protect, adminOnly, toggleUserActiveStatus);
router.post("/toggle-product-approval", protect, adminOnly, toggleProductApproval);
export default router;

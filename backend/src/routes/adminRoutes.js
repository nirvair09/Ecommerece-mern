import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { getAllOrders } from "../controllers/orderController.js";
import { loginAdmin, toggleProductApproval, toggleUserActiveStatus } from "../controllers/adminController.js";

const router = express.Router();
router.post("/login", loginAdmin);
router.get("/orders", protect, adminOnly, getAllOrders);
router.post("/toggle-user-active-status", protect, adminOnly, toggleUserActiveStatus);
router.post("/toggle-product-approval", protect, adminOnly, toggleProductApproval);
export default router;

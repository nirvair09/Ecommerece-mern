import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protectedRoute, (req, res) => {
    res.json(req.user);
})

export default router;
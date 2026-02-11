import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";

// get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching users" });
    }
}

export const toggleUserActiveStatus = async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    user.isActive = !user.isActive;
    await user.save();
    res.json({ success: true, message: "User active status toggled" });
}

export const toggleProductApproval = async (req, res) => {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    product.isApproved = !product.isApproved;
    await product.save();
    res.json({ success: true, message: "Product approval toggled" });
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};


export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.role !== "admin") {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    res.json(
        { token: generateToken(user._id) }
    );
}
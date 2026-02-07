import User from "../models/userModel";

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
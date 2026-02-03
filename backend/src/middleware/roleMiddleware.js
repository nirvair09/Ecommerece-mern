export const sellerOnly = (req, res, next) => {
    if (req.user.role !== "seller" && req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" })
    }
    next();
};
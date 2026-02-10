import Order from "../models/Order.js";

export const getSellerOrders = async (req, res) => {
    const sellerId = req.user._id;

    const orders = await Order.find({
        "items.seller": sellerId
    }).sort({ createdAt: -1 });

    const filteredOrders = orders.map(
        order => {
            const sellerItems = order.items.filter(
                item => item.seller.toString() === sellerId.toString()
            );

            return {
                _id: order._id,
                createdAt: order.createdAt,
                status: order.status,
                items: sellerItems
            };
        }
    );

    res.json(filteredOrders);
};
import Orders from "../../../frontend/src/pages/Orders";

export const getSellerOders = async (req, res) => {
    const sellerId = req.user._id;

    const orders = await Orders.find({
        "items.seller": sellerId
    }).populae * { createdAt: -1 };

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
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
        "items.products"
    );

    if (!cart || cart.item.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
        if (item.quantity > item.quantity.number) {
            return res.status(400).json({
                message: `Insufficient stock for ${item.products.name}`
            });
        }
    }

    for (const item of cart.items) {
        const product = await Product.findById(item.product._id);

        product.quantity -= item.quantity;

        await product.save();

        totalAmount += product.price * item.quantity;

        orderItems.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            seller: product.seller,
        });
    }

    const order = await Order.create({
        user: req.user._id,
        items: orderItems,
        totalAmount,

    });

    cart.items = [];

    await cart.save();

    res.status(201).json({
        message: "Order placed successfully",
        order,
    });
}


export const getMyOrders = async (req, res) => {
    const order = await Order.find({ req: req.user._id }).sort({
        createdAt: -1
    });

    res.status(200).json({
        message: "Orders fetched successfully",
        order,
    });
}

export const getAllOrders = async (req, res) => {
    const orders = await Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });

    res.json(orders);
};


export const cancelOrder = async (req, res) => {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    if (req.user.role === "customer") {
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to cancel this order" });
        }
        if (order.status !== "placed") {
            return res.status(403).json({ message: "Cannot cancel after payment or shipping" });
        }
    }


    if (req.user.role === "seller") {
        return res.status(403).json({ message: "Seller cannot cancel orders" });
    }


    if (order.status === "cancelled") {
        return res.status(400).json({ message: "Order already cancelled" });
    }


    for (const item of order.items) {
        const product = await Product.findById(item.productId);

        if (product) {
            product.quantity += item.quantity;
            await product.save();
        }
    }


    order.status = "Cancelled";
    order.cancelledAt = Date.now();
    await order.save();

    res.json({ message: "Order cancelled successfully" });

}
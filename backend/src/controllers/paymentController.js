

import Order from "../models/Order.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const getRazorpay = () => {
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
};

export const createOrder = async (req, res) => {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    const options = {
        amount: order.totalAmount * 100,
        currency: "INR",
        receipt: order._id.toString(),
    }

    const razorpayOrder = await getRazorpay().orders.create(options);

    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.json({
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
    })
};

export const verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body;

    const generateSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (generateSignature !== razorpay_signature) {
        return res.status(400).json({ message: "Payment verification failed" });
    }

    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    order.status = "paid";
    order.paymentId = razorpay_payment_id;
    await order.save();

    res.json({ message: "Payment verified successfully" });
};

export const getPaymentDetails = async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
};
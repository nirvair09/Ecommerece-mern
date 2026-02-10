import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    name: String,
    price: Number,
    quantity: Number,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
    { _id: false });


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["placed", "paid", "shipped", "delivered", "cancelled"],
        default: "placed"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    cancelledAt: {
        type: Date,
    },
    paymentId: String,
    razorpayOrderId: String,
});


export default mongoose.model("Order", orderSchema);
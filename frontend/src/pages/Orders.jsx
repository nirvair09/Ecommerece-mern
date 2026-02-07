import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");

    const handlePayment = async (orderId) => {
        const token = localStorage.getItem("token");
        const res = await api.post("/payment/create-order", { orderId }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const options = {
            key: res.data.key,
            amount: res.data.amount,
            currency: "INR",
            orderId: res.data.razorpayOrderId,
            handler: async function (response) {
                await api.post("/payment/verify",
                    response,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                alert("Payment successful");
                window.location.reload();
            },
        }

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleCancel = async (orderId) => {
        const token = localStorage.getItem("token");
        await api.post("/orders/cancel", { orderId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert("Order cancelled successfully");
        window.location.reload();
    }

    useEffect(() => {
        api
            .get("/orders/my", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setOrders(res.data));
    }, []);

    return (
        <div>
            <h2>My Orders</h2>

            {orders.map((order) => (
                <div key={order._id}>
                    <p>Total: ₹{order.totalAmount}</p>
                    <p>Status: {order.status}</p>

                    {order.items.map((item, idx) => (
                        <div key={idx}>
                            {item.name} × {item.quantity}
                        </div>
                    ))}
                    {order.status === "placed" && (
                        <>
                            <button onClick={() => handlePayment(order._id)}>
                                Pay Now
                            </button>

                            <button onClick={() => handleCancel(order._id)}>
                                Cancel Order
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

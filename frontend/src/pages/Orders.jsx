import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");

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
                <div key={order._id} style={{ border: "1px solid #ccc", margin: "10px" }}>
                    <p>Total: ₹{order.totalAmount}</p>
                    <p>Status: {order.status}</p>

                    {order.items.map((item, idx) => (
                        <div key={idx}>
                            {item.name} × {item.quantity}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

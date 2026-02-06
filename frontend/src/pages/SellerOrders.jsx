import { useEffect, useState } from "react";
import api from "../api/axios";

export default function SellerOrders() {
    const [order, setOrder] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        api.get("/seller/orders", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setOrder(res.data));
    }, []);

    return (
        <div>
            <h2>Seller Orders</h2>
            {order.map(o => (
                <div>
                    <p>{o._id}</p>
                    <p>{o.createdAt}</p>
                    <p>{o.status}</p>
                    <p>{o.totalAmount}</p>
                </div>
            ))}
        </div>
    )
}
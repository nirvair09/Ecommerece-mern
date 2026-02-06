import { useEffect } from "react";
import api from "../api/axios";

export default function AdminOrders() {
    const [order, setOrder] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        api.get("/admin/orders", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setOrder(res.data))
    }, []);

    return (
        <div>
            <h2>Admin Orders</h2>

            {order.map((o) => {
                return (
                    <div>
                        <p>{o._id}</p>
                        <p>{o.createdAt}</p>
                        <p>{o.status}</p>
                        <p>{o.totalAmount}</p>
                    </div>
                )
            })}
        </div>
    )
}
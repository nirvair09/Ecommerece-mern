import { useState, useEffect } from "react";
import api from "../api/axios";
export default function AdminProducts() {

    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token");

    const fetchProducts = async () => {
        const res = await api.get("/admin/products", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleToggle = async (id) => {
        const res = await api.post("/admin/toggle-product-active-status", { productId: id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.status == 200) {
            fetchProducts();
        }
    }


    return (
        <div>
            <h2>Products</h2>
            {products.map(p => (
                <div key={p._id}>
                    {p.name}-{p.price}-{p.quantity}-{p.isApproved}
                    <button onClick={() => handleToggle(p._id)}>
                        toggle
                    </button>
                </div>
            ))}
        </div>
    )

}
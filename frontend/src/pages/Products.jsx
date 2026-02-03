import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
export default function Products() {
    const [products, setProducts] = useState([]);

    const { user } = useAuth();

    useEffect(() => {
        api.get("products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, []);


    return (
        <div>
            <h1>Products</h1>

            {products.map(p => (
                <div>
                    <h2>{p.name}</h2>
                    <p>{p.description}</p>
                    <p>{p.price}</p>
                    <p>{p.quantity}</p>
                    <p>{p.seller}</p>

                    {user && user.role === "customer" && (
                        <button
                            onClick={async () => {
                                const token = localStorage.getItem("token");

                                await api.post(
                                    "/cart/add",
                                    { productId: p._id, quantity: 1 },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`
                                        }
                                    }
                                )
                            }}

                        >Add to Cart</button>
                    )}
                </div>
            ))}
        </div>
    );
}
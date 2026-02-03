import { useEffect } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);

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
                </div>
            ))}
        </div>
    );
}
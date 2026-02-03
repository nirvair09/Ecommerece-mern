import api from "../api/axios";


export default function Cart() {
    const [cart, setCart] = useState(null);
    const token = localStorage.getItem("token");

    const fetchCart = async () => {
        try {
            const res = await api.get("/cart", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCart(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    if (!cart) return <h3>Loading...</h3>

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.items.length === 0 && <p>Empty Cart</p>}

            {cart.items.map((item) => (
                <div key={item.product._id}>
                    <p>{item.product.name}</p>
                    <p>Price: ${item.product.price}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
        </div>
    );
}
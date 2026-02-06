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

    const handleCheckOut = async () => {

        const token = localStorage.getItem("token"); try {
            const res = await api.post("/orders", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Order Placed Successfully");
            window.location.href = "/orders";
        } catch (error) {
            console.log(error);
        }
    }

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

            <button onClick={handleCheckOut}>CheckOut</button>
        </div>
    );
}
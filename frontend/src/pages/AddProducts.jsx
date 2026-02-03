import { useAuth } from "../context/AuthContext";

export default function AddProducts() {
    const { user } = useAuth();
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
    });

    if (user.role !== "seller") {
        return <h3>Not Authorized to Add Products</h3>
    }

    const submitHandle = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        await api.post("/products", form, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        alert("Product Created");
    };

    return (
        <form onSubmit={submitHandle}>
            <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <input type="text" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <input type="text" placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />

            <button type="submit">Add Product</button>
        </form>
    );
}
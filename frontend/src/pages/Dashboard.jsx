import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     const data = api.get("/auth/me", {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(res => console.log(res.data))
    //         .catch(err => console.log(err));
    //     console.log(data);
    // }, []);

    const handleLogOut = async () => {
        logout();
        navigate("/");
    }
    return <div>
        <h2>Dashboard</h2>

        <p>my name: {user.name}</p>
        <p>my email: {user.email}</p>
        <p>my role: {user.role}</p>

        <button type="submit" onClick={handleLogOut} >Logout</button>

        {user && user.role === "seller" && <button type="submit" onClick={() => navigate("/add-product")} >Add Product</button>}
    </div>;
}

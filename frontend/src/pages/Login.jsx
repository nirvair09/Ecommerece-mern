import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await api.post("/auth/login", { email, password });
            login(res.data.token);
            navigate("/dashboard");
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div>

            <form onSubmit={submitHandler}>
                <h2>Login</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                <button type="submit">Login</button>
            </form>
            <p>Don't have an accoount?<a href="/register">Register Now</a></p>
        </div>
    );
}

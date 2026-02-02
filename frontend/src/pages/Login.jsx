import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await api.post("/auth/login", { email, password });
        login(res.data.token);
        navigate("/dashboard");
    };

    return (
        <form onSubmit={submitHandler}>
            <h2>Login</h2>

            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

            <button type="submit">Login</button>
        </form>
    );
}

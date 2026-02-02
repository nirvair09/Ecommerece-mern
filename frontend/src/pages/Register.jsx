import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const res = await api.post("/auth/register", form);
        login(res.data.token);
        navigate("/dashboard");
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <h2>Register Form</h2>
            <input placeholder="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

            <input placeholder="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

            <input placeholder="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />

            <button type="submit" >Register</button>

        </form>
    );

}

export default Register;
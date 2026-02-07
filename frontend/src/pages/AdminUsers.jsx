import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
        const res = await api.get("/admin/users", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggle = async (id) => {
        const token = localStorage.getItem("token");
        const res = await api.post("/admin/toggle-user-active-status", { userId: id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.status == 200) {
            fetchUsers();
        }
    };

    return (
        <div>
            <h2>Users</h2>
            {users.map(u => (
                <div key={u._id}>
                    {u.email}-{u.isActive ? "Active" : "Inactive"}
                    <button onClick={() => handleToggle(u._id)}>
                        toggle
                    </button>
                </div>
            ))}
        </div>
    )
}
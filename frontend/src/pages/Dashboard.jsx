import { useEffect } from "react";
import api from "../api/axios";

export default function Dashboard() {
    useEffect(() => {
        api.get("/")
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    }, []);

    return <h2>Dashboard</h2>;
}

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import SellerOrders from "./pages/SellerOrders";
import AdminOrders from "./pages/AdminOrders";
export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (

    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/products" element={<Products />} />
      <Route path="/add-product" element={<AddProducts />} />
      <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
      <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
      <Route
        path="/seller/orders"
        element={user?.role === "seller" ? <SellerOrders /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin/orders"
        element={user?.role === "admin" ? <AdminOrders /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};
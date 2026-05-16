import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Welcome from "./pages/Welcome.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import Categories from "./pages/Categories.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import LowStock from "./pages/LowStock.jsx";
import Contact from "./pages/Contact.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;
  return children;
};

function App() {
  const location = useLocation();
  const isWelcome = location.pathname === "/";

  return (
    <div style={{ display: "flex" }}>
      {!isWelcome && <Sidebar />}
      <div style={{
        marginLeft: isWelcome ? "0" : "250px",
        padding: isWelcome ? "0" : "30px",
        width: "100%",
        minHeight: "100vh",
      }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
          <Route path="/low-stock" element={<ProtectedRoute><LowStock /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
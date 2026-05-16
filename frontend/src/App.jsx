import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar.jsx";
import Welcome from "./pages/Welcome.jsx";
import Setup from "./pages/Setup.jsx";
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
  const isSetup = location.pathname === "/setup";
  const [setupRequired, setSetupRequired] = useState(null);

  useEffect(() => {
    const checkSetup = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/auth/check-setup");
        setSetupRequired(res.data.setupRequired);
      } catch (err) {
        console.error(err);
      }
    };
    checkSetup();
  }, []);

  // Redirect to setup if no admin exists
  if (setupRequired === true && location.pathname !== "/setup") {
    return <Navigate to="/setup" />;
  }

  return (
    <div style={{ display: "flex" }}>
      {!isWelcome && !isSetup && <Sidebar />}
      <div style={{
        marginLeft: isWelcome || isSetup ? "0" : "250px",
        padding: isWelcome || isSetup ? "0" : "30px",
        width: "100%",
        minHeight: "100vh",
      }}>
        <Routes>
          <Route path="/setup" element={<Setup />} />
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
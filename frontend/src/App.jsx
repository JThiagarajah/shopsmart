import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Welcome from "./pages/Welcome.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import Categories from "./pages/Categories.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import LowStock from "./pages/LowStock.jsx";
import Contact from "./pages/Contact.jsx";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/low-stock" element={<LowStock />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
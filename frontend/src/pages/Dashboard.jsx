import { useEffect, useState } from "react";
import API from "../utils/axios.js";

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    suppliers: 0,
    lowStock: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, categories, suppliers, lowStock] = await Promise.all([
          API.get("/products"),
          API.get("/categories"),
          API.get("/suppliers"),
          API.get("/products/low-stock"),
        ]);
        setStats({
          products: products.data.length,
          categories: categories.data.length,
          suppliers: suppliers.data.length,
          lowStock: lowStock.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Products", value: stats.products, color: "#c8955e", icon: "📦" },
    { label: "Categories", value: stats.categories, color: "#8d7b5e", icon: "🗂️" },
    { label: "Suppliers", value: stats.suppliers, color: "#7a8c6e", icon: "🚚" },
    { label: "Low Stock Alerts", value: stats.lowStock, color: "#9e6b4a", icon: "⚠️" },
  ];

  return (
    <div>
      <h1 style={{ color: "#dcb490", letterSpacing: "2px", marginBottom: "8px" }}>
        🏠 Dashboard
      </h1>
      <div style={{
        width: "50px",
        height: "3px",
        backgroundColor: "#dcb490",
        borderRadius: "2px",
        marginBottom: "32px",
      }} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
      }}>
        {cards.map((card) => (
          <div key={card.label} style={{
            background: "rgba(220,180,144,0.1)",
            border: "1px solid rgba(220,180,144,0.3)",
            borderRadius: "16px",
            padding: "28px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            backdropFilter: "blur(8px)",
          }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>{card.icon}</div>
            <h2 style={{ fontSize: "36px", margin: "10px 0", color: "#dcb490" }}>
              {card.value}
            </h2>
            <p style={{ color: "#cab6a5", fontWeight: "bold", fontSize: "13px", letterSpacing: "0.5px" }}>
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
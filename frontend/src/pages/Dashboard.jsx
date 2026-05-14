import { useEffect, useState } from "react";
import axios from "axios";

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
          axios.get("http://localhost:8000/api/products"),
          axios.get("http://localhost:8000/api/categories"),
          axios.get("http://localhost:8000/api/suppliers"),
          axios.get("http://localhost:8000/api/products/low-stock"),
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
    { label: "Total Products", value: stats.products, color: "#89b4fa", icon: "📦" },
    { label: "Categories", value: stats.categories, color: "#a6e3a1", icon: "🗂️" },
    { label: "Suppliers", value: stats.suppliers, color: "#fab387", icon: "🚚" },
    { label: "Low Stock Alerts", value: stats.lowStock, color: "#f38ba8", icon: "⚠️" },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "30px", color: "#1e1e2e" }}>
        Dashboard
      </h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
      }}>
        {cards.map((card) => (
          <div key={card.label} style={{
            backgroundColor: card.color,
            borderRadius: "12px",
            padding: "24px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}>
            <div style={{ fontSize: "40px" }}>{card.icon}</div>
            <h2 style={{ fontSize: "36px", margin: "10px 0", color: "#1e1e2e" }}>
              {card.value}
            </h2>
            <p style={{ color: "#1e1e2e", fontWeight: "bold" }}>{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
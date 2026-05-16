import { useEffect, useState } from "react";
import API from "../utils/axios.js";

function LowStock() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLowStock = async () => {
      const res = await API.get("/products/low-stock");
      setProducts(res.data);
    };
    fetchLowStock();
  }, []);

  return (
    <div>
      <h1 style={{ color: "#dcb490", letterSpacing: "2px", marginBottom: "8px" }}>
        ⚠️ Low Stock Alerts
      </h1>
      <div style={{ width: "50px", height: "3px", backgroundColor: "#dcb490", borderRadius: "2px", marginBottom: "8px" }} />
      <p style={{ color: "#cab6a5", marginBottom: "32px", fontSize: "14px" }}>
        Products below their minimum stock level
      </p>

      {products.length === 0 ? (
        <div style={{
          background: "rgba(166,227,161,0.1)",
          border: "1px solid rgba(166,227,161,0.3)",
          padding: "32px",
          borderRadius: "16px",
          textAlign: "center",
          color: "#a6e3a1",
          fontWeight: "bold",
          fontSize: "16px",
        }}>
          ✅ All products are well stocked!
        </div>
      ) : (
        <div style={{ background: "rgba(220,180,144,0.05)", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(220,180,144,0.2)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "rgba(158,58,58,0.5)" }}>
              <tr>
                {["Product", "Category", "Supplier", "Quantity", "Min Level", "Status"].map((h) => (
                  <th key={h} style={{ padding: "14px", textAlign: "left", color: "#dcb490", letterSpacing: "1px", fontSize: "13px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} style={{ borderBottom: "1px solid rgba(220,180,144,0.1)" }}>
                  <td style={{ padding: "14px", color: "#ffffff" }}>{product.name}</td>
                  <td style={{ padding: "14px", color: "#cab6a5" }}>{product.category?.name}</td>
                  <td style={{ padding: "14px", color: "#cab6a5" }}>{product.supplier?.name}</td>
                  <td style={{ padding: "14px", color: "#f38ba8", fontWeight: "bold" }}>{product.quantity}</td>
                  <td style={{ padding: "14px", color: "#cab6a5" }}>{product.minStockLevel}</td>
                  <td style={{ padding: "14px" }}>
                    <span style={{
                      backgroundColor: "rgba(243,139,168,0.2)",
                      border: "1px solid #f38ba8",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#f38ba8",
                    }}>
                      ⚠️ Low Stock
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LowStock;
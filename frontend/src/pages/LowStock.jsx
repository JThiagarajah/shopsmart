import { useEffect, useState } from "react";
import axios from "axios";

function LowStock() {
  const [products, setProducts] = useState([]);

  const fetchLowStock = async () => {
    const res = await axios.get("http://localhost:8000/api/products/low-stock");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ color: "#1e1e2e" }}>⚠️ Low Stock Alerts</h1>
        <p style={{ color: "#666" }}>
          Products below their minimum stock level
        </p>
      </div>

      {products.length === 0 ? (
        <div style={{
          backgroundColor: "#a6e3a1",
          padding: "24px",
          borderRadius: "12px",
          textAlign: "center",
          fontWeight: "bold",
          color: "#1e1e2e",
        }}>
          ✅ All products are well stocked!
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <thead style={{ backgroundColor: "#f38ba8" }}>
            <tr>
              <th style={{ padding: "14px", textAlign: "left" }}>Product</th>
              <th style={{ padding: "14px", textAlign: "left" }}>Category</th>
              <th style={{ padding: "14px", textAlign: "left" }}>Supplier</th>
              <th style={{ padding: "14px", textAlign: "left" }}>Quantity</th>
              <th style={{ padding: "14px", textAlign: "left" }}>Min Level</th>
              <th style={{ padding: "14px", textAlign: "left" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "14px" }}>{product.name}</td>
                <td style={{ padding: "14px" }}>{product.category?.name}</td>
                <td style={{ padding: "14px" }}>{product.supplier?.name}</td>
                <td style={{ padding: "14px", color: "#e64553", fontWeight: "bold" }}>
                  {product.quantity}
                </td>
                <td style={{ padding: "14px" }}>{product.minStockLevel}</td>
                <td style={{ padding: "14px" }}>
                  <span style={{
                    backgroundColor: "#f38ba8",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#1e1e2e",
                  }}>
                    ⚠️ Low Stock
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LowStock;
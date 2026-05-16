import { useEffect, useState } from "react";
import API from "../utils/axios.js";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "",
    quantity: "", minStockLevel: "", category: "", supplier: "",
  });

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const fetchDropdowns = async () => {
    const [cat, sup] = await Promise.all([
      API.get("/categories"),
      API.get("/suppliers"),
    ]);
    setCategories(cat.data);
    setSuppliers(sup.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchDropdowns();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editProduct) {
        await API.put(`/products/${editProduct._id}`, form);
      } else {
        await API.post("/products", form);
      }
      setShowForm(false);
      setEditProduct(null);
      setForm({ name: "", description: "", price: "", quantity: "", minStockLevel: "", category: "", supplier: "" });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong!");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      minStockLevel: product.minStockLevel,
      category: product.category._id,
      supplier: product.supplier._id,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await API.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid rgba(220,180,144,0.3)",
    fontSize: "14px",
    backgroundColor: "rgba(220,180,144,0.1)",
    color: "white",
    fontFamily: "'Georgia', serif",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <h1 style={{ color: "#dcb490", letterSpacing: "2px" }}>📦 Products</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditProduct(null); setForm({ name: "", description: "", price: "", quantity: "", minStockLevel: "", category: "", supplier: "" }); }}
          style={{ backgroundColor: "#dcb490", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", color: "#4c311c", fontFamily: "'Georgia', serif" }}
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>
      <div style={{ width: "50px", height: "3px", backgroundColor: "#dcb490", borderRadius: "2px", marginBottom: "32px" }} />

      {showForm && (
        <div style={{ background: "rgba(220,180,144,0.1)", border: "1px solid rgba(220,180,144,0.3)", padding: "24px", borderRadius: "16px", marginBottom: "24px", backdropFilter: "blur(8px)" }}>
          <h3 style={{ color: "#dcb490", marginBottom: "16px" }}>{editProduct ? "Edit Product" : "Add New Product"}</h3>
          <input style={inputStyle} placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input style={inputStyle} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input style={inputStyle} placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input style={inputStyle} placeholder="Quantity" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
          <input style={inputStyle} placeholder="Min Stock Level" type="number" value={form.minStockLevel} onChange={(e) => setForm({ ...form, minStockLevel: e.target.value })} />
          <select style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="">Select Category</option>
            {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
          <select style={inputStyle} value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })}>
            <option value="">Select Supplier</option>
            {suppliers.map((sup) => <option key={sup._id} value={sup._id}>{sup.name}</option>)}
          </select>
          <button onClick={handleSubmit} style={{ backgroundColor: "#dcb490", border: "none", padding: "10px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", color: "#4c311c", fontFamily: "'Georgia', serif" }}>
            {editProduct ? "Update Product" : "Save Product"}
          </button>
        </div>
      )}

      <div style={{ background: "rgba(220,180,144,0.05)", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(220,180,144,0.2)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "rgba(76,49,28,0.8)" }}>
            <tr>
              {["Name", "Category", "Supplier", "Price", "Quantity", "Actions"].map((h) => (
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
                <td style={{ padding: "14px", color: "#dcb490" }}>Rs. {product.price}</td>
                <td style={{ padding: "14px", color: product.quantity <= product.minStockLevel ? "#f38ba8" : "#a6e3a1", fontWeight: "bold" }}>{product.quantity}</td>
                <td style={{ padding: "14px" }}>
                  <button onClick={() => handleEdit(product)} style={{ backgroundColor: "#8d7b5e", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", marginRight: "8px", color: "white", fontFamily: "'Georgia', serif" }}>✏️ Edit</button>
                  <button onClick={() => handleDelete(product._id)} style={{ backgroundColor: "#9e3a3a", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", color: "white", fontFamily: "'Georgia', serif" }}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
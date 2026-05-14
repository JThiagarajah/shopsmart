import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    minStockLevel: "",
    category: "",
    supplier: "",
  });

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:8000/api/products");
    setProducts(res.data);
  };

  const fetchDropdowns = async () => {
    const [cat, sup] = await Promise.all([
      axios.get("http://localhost:8000/api/categories"),
      axios.get("http://localhost:8000/api/suppliers"),
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
        await axios.put(`http://localhost:8000/api/products/${editProduct._id}`, form);
      } else {
        await axios.post("http://localhost:8000/api/products", form);
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
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      fetchProducts();
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #cdd6f4",
    fontSize: "14px",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ color: "#1e1e2e" }}>📦 Products</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditProduct(null); setForm({ name: "", description: "", price: "", quantity: "", minStockLevel: "", category: "", supplier: "" }); }}
          style={{ backgroundColor: "#89b4fa", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: "#f5f5f5", padding: "24px", borderRadius: "12px", marginBottom: "24px" }}>
          <h3>{editProduct ? "Edit Product" : "Add New Product"}</h3>
          <input style={inputStyle} placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input style={inputStyle} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input style={inputStyle} placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input style={inputStyle} placeholder="Quantity" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
          <input style={inputStyle} placeholder="Min Stock Level" type="number" value={form.minStockLevel} onChange={(e) => setForm({ ...form, minStockLevel: e.target.value })} />
          <select style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <select style={inputStyle} value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })}>
            <option value="">Select Supplier</option>
            {suppliers.map((sup) => (
              <option key={sup._id} value={sup._id}>{sup.name}</option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: "#a6e3a1", border: "none", padding: "10px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
          >
            {editProduct ? "Update Product" : "Save Product"}
          </button>
        </div>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <thead style={{ backgroundColor: "#1e1e2e", color: "white" }}>
          <tr>
            <th style={{ padding: "14px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Category</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Supplier</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Price</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Quantity</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "14px" }}>{product.name}</td>
              <td style={{ padding: "14px" }}>{product.category?.name}</td>
              <td style={{ padding: "14px" }}>{product.supplier?.name}</td>
              <td style={{ padding: "14px" }}>Rs. {product.price}</td>
              <td style={{ padding: "14px" }}>{product.quantity}</td>
              <td style={{ padding: "14px" }}>
                <button
                  onClick={() => handleEdit(product)}
                  style={{ backgroundColor: "#89b4fa", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", marginRight: "8px" }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  style={{ backgroundColor: "#f38ba8", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
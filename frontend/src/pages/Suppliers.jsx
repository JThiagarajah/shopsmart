import { useEffect, useState } from "react";
import axios from "axios";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const fetchSuppliers = async () => {
    const res = await axios.get("http://localhost:8000/api/suppliers");
    setSuppliers(res.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editSupplier) {
        await axios.put(`http://localhost:8000/api/suppliers/${editSupplier._id}`, form);
      } else {
        await axios.post("http://localhost:8000/api/suppliers", form);
      }
      setShowForm(false);
      setEditSupplier(null);
      setForm({ name: "", email: "", phone: "", address: "" });
      fetchSuppliers();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong!");
    }
  };

  const handleEdit = (supplier) => {
    setEditSupplier(supplier);
    setForm({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      await axios.delete(`http://localhost:8000/api/suppliers/${id}`);
      fetchSuppliers();
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
        <h1 style={{ color: "#1e1e2e" }}>🚚 Suppliers</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditSupplier(null); setForm({ name: "", email: "", phone: "", address: "" }); }}
          style={{ backgroundColor: "#89b4fa", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          {showForm ? "Cancel" : "+ Add Supplier"}
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: "#f5f5f5", padding: "24px", borderRadius: "12px", marginBottom: "24px" }}>
          <h3>{editSupplier ? "Edit Supplier" : "Add New Supplier"}</h3>
          <input
            style={inputStyle}
            placeholder="Supplier Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: "#a6e3a1", border: "none", padding: "10px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
          >
            {editSupplier ? "Update Supplier" : "Save Supplier"}
          </button>
        </div>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <thead style={{ backgroundColor: "#1e1e2e", color: "white" }}>
          <tr>
            <th style={{ padding: "14px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Phone</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Address</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier._id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "14px" }}>{supplier.name}</td>
              <td style={{ padding: "14px" }}>{supplier.email}</td>
              <td style={{ padding: "14px" }}>{supplier.phone}</td>
              <td style={{ padding: "14px" }}>{supplier.address}</td>
              <td style={{ padding: "14px" }}>
                <button
                  onClick={() => handleEdit(supplier)}
                  style={{ backgroundColor: "#89b4fa", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", marginRight: "8px" }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(supplier._id)}
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

export default Suppliers;
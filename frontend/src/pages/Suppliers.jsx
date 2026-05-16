import { useEffect, useState } from "react";
import API from "../utils/axios.js";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const fetchSuppliers = async () => {
    const res = await API.get("/suppliers");
    setSuppliers(res.data);
  };

  useEffect(() => { fetchSuppliers(); }, []);

  const handleSubmit = async () => {
    try {
      if (editSupplier) {
        await API.put(`/suppliers/${editSupplier._id}`, form);
      } else {
        await API.post("/suppliers", form);
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
    setForm({ name: supplier.name, email: supplier.email, phone: supplier.phone, address: supplier.address });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      await API.delete(`/suppliers/${id}`);
      fetchSuppliers();
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px", marginBottom: "12px",
    borderRadius: "8px", border: "1px solid rgba(220,180,144,0.3)",
    fontSize: "14px", backgroundColor: "rgba(220,180,144,0.1)",
    color: "white", fontFamily: "'Georgia', serif",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <h1 style={{ color: "#dcb490", letterSpacing: "2px" }}>🚚 Suppliers</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditSupplier(null); setForm({ name: "", email: "", phone: "", address: "" }); }}
          style={{ backgroundColor: "#dcb490", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", color: "#4c311c", fontFamily: "'Georgia', serif" }}
        >
          {showForm ? "Cancel" : "+ Add Supplier"}
        </button>
      </div>
      <div style={{ width: "50px", height: "3px", backgroundColor: "#dcb490", borderRadius: "2px", marginBottom: "32px" }} />

      {showForm && (
        <div style={{ background: "rgba(220,180,144,0.1)", border: "1px solid rgba(220,180,144,0.3)", padding: "24px", borderRadius: "16px", marginBottom: "24px", backdropFilter: "blur(8px)" }}>
          <h3 style={{ color: "#dcb490", marginBottom: "16px" }}>{editSupplier ? "Edit Supplier" : "Add New Supplier"}</h3>
          <input style={inputStyle} placeholder="Supplier Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input style={inputStyle} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input style={inputStyle} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input style={inputStyle} placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <button onClick={handleSubmit} style={{ backgroundColor: "#dcb490", border: "none", padding: "10px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", color: "#4c311c", fontFamily: "'Georgia', serif" }}>
            {editSupplier ? "Update Supplier" : "Save Supplier"}
          </button>
        </div>
      )}

      <div style={{ background: "rgba(220,180,144,0.05)", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(220,180,144,0.2)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "rgba(76,49,28,0.8)" }}>
            <tr>
              {["Name", "Email", "Phone", "Address", "Actions"].map((h) => (
                <th key={h} style={{ padding: "14px", textAlign: "left", color: "#dcb490", letterSpacing: "1px", fontSize: "13px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id} style={{ borderBottom: "1px solid rgba(220,180,144,0.1)" }}>
                <td style={{ padding: "14px", color: "#ffffff" }}>{supplier.name}</td>
                <td style={{ padding: "14px", color: "#cab6a5" }}>{supplier.email}</td>
                <td style={{ padding: "14px", color: "#cab6a5" }}>{supplier.phone}</td>
                <td style={{ padding: "14px", color: "#cab6a5" }}>{supplier.address}</td>
                <td style={{ padding: "14px" }}>
                  <button onClick={() => handleEdit(supplier)} style={{ backgroundColor: "#8d7b5e", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", marginRight: "8px", color: "white", fontFamily: "'Georgia', serif" }}>✏️ Edit</button>
                  <button onClick={() => handleDelete(supplier._id)} style={{ backgroundColor: "#9e3a3a", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", color: "white", fontFamily: "'Georgia', serif" }}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Suppliers;
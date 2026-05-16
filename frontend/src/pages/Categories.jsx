import { useEffect, useState } from "react";
import API from "../utils/axios.js";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async () => {
    try {
      if (editCategory) {
        await API.put(`/categories/${editCategory._id}`, form);
      } else {
        await API.post("/categories", form);
      }
      setShowForm(false);
      setEditCategory(null);
      setForm({ name: "", description: "" });
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong!");
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setForm({ name: category.name, description: category.description });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await API.delete(`/categories/${id}`);
      fetchCategories();
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
        <h1 style={{ color: "#dcb490", letterSpacing: "2px" }}>🗂️ Categories</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditCategory(null); setForm({ name: "", description: "" }); }}
          style={{ backgroundColor: "#dcb490", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", color: "#4c311c", fontFamily: "'Georgia', serif" }}
        >
          {showForm ? "Cancel" : "+ Add Category"}
        </button>
      </div>
      <div style={{ width: "50px", height: "3px", backgroundColor: "#dcb490", borderRadius: "2px", marginBottom: "32px" }} />

      {showForm && (
        <div style={{ background: "rgba(220,180,144,0.1)", border: "1px solid rgba(220,180,144,0.3)", padding: "24px", borderRadius: "16px", marginBottom: "24px", backdropFilter: "blur(8px)" }}>
          <h3 style={{ color: "#dcb490", marginBottom: "16px" }}>{editCategory ? "Edit Category" : "Add New Category"}</h3>
          <input style={inputStyle} placeholder="Category Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input style={inputStyle} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button onClick={handleSubmit} style={{ backgroundColor: "#dcb490", border: "none", padding: "10px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", color: "#4c311c", fontFamily: "'Georgia', serif" }}>
            {editCategory ? "Update Category" : "Save Category"}
          </button>
        </div>
      )}

      <div style={{ background: "rgba(220,180,144,0.05)", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(220,180,144,0.2)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "rgba(76,49,28,0.8)" }}>
            <tr>
              {["Name", "Description", "Created At", "Actions"].map((h) => (
                <th key={h} style={{ padding: "14px", textAlign: "left", color: "#dcb490", letterSpacing: "1px", fontSize: "13px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} style={{ borderBottom: "1px solid rgba(220,180,144,0.1)" }}>
                <td style={{ padding: "14px", color: "#ffffff" }}>{category.name}</td>
                <td style={{ padding: "14px", color: "#cab6a5" }}>{category.description}</td>
                <td style={{ padding: "14px", color: "#cab6a5" }}>{new Date(category.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: "14px" }}>
                  <button onClick={() => handleEdit(category)} style={{ backgroundColor: "#8d7b5e", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", marginRight: "8px", color: "white", fontFamily: "'Georgia', serif" }}>✏️ Edit</button>
                  <button onClick={() => handleDelete(category._id)} style={{ backgroundColor: "#9e3a3a", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", color: "white", fontFamily: "'Georgia', serif" }}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
import { useEffect, useState } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:8000/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editCategory) {
        await axios.put(`http://localhost:8000/api/categories/${editCategory._id}`, form);
      } else {
        await axios.post("http://localhost:8000/api/categories", form);
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
      await axios.delete(`http://localhost:8000/api/categories/${id}`);
      fetchCategories();
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
        <h1 style={{ color: "#1e1e2e" }}>🗂️ Categories</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditCategory(null); setForm({ name: "", description: "" }); }}
          style={{ backgroundColor: "#89b4fa", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          {showForm ? "Cancel" : "+ Add Category"}
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: "#f5f5f5", padding: "24px", borderRadius: "12px", marginBottom: "24px" }}>
          <h3>{editCategory ? "Edit Category" : "Add New Category"}</h3>
          <input
            style={inputStyle}
            placeholder="Category Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: "#a6e3a1", border: "none", padding: "10px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
          >
            {editCategory ? "Update Category" : "Save Category"}
          </button>
        </div>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <thead style={{ backgroundColor: "#1e1e2e", color: "white" }}>
          <tr>
            <th style={{ padding: "14px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Description</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Created At</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "14px" }}>{category.name}</td>
              <td style={{ padding: "14px" }}>{category.description}</td>
              <td style={{ padding: "14px" }}>{new Date(category.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: "14px" }}>
                <button
                  onClick={() => handleEdit(category)}
                  style={{ backgroundColor: "#89b4fa", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", marginRight: "8px" }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
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

export default Categories;
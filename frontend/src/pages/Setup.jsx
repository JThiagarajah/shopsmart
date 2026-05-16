import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Setup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if setup is already done
    const checkSetup = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/auth/check-setup");
        if (!res.data.setupRequired) {
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkSetup();
  }, []);

  const handleSetup = async () => {
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirm) {
      return setError("All fields are required!");
    }

    if (form.password !== form.confirm) {
      return setError("Passwords do not match!");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters!");
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Setup failed!");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "rgba(220,180,144,0.1)",
    border: "1px solid rgba(220,180,144,0.3)",
    borderRadius: "10px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    fontFamily: "'Georgia', serif",
    boxSizing: "border-box",
    marginBottom: "16px",
  };

  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(135deg, #4c311c 0%, #8e6844 60%, #484d38 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', serif",
      padding: "20px",
    }}>
      <div style={{
        background: "linear-gradient(145deg, #4c311c, #6b4423)",
        border: "1px solid rgba(220,180,144,0.4)",
        borderRadius: "20px",
        padding: "48px",
        width: "100%",
        maxWidth: "460px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "70px",
            height: "70px",
            backgroundColor: "#dcb490",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            margin: "0 auto 16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}>🛒</div>
          <h1 style={{ color: "#dcb490", fontSize: "24px", letterSpacing: "2px", marginBottom: "6px" }}>
            Welcome to ShopSmart!
          </h1>
          <p style={{ color: "#cab6a5", fontSize: "13px" }}>
            Create your admin account to get started
          </p>
          {/* Divider */}
          <div style={{
            width: "50px",
            height: "2px",
            backgroundColor: "#dcb490",
            margin: "16px auto 0",
            borderRadius: "2px",
          }} />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: "rgba(220,50,50,0.2)",
            border: "1px solid rgba(220,50,50,0.4)",
            borderRadius: "10px",
            padding: "12px",
            color: "#ff6b6b",
            fontSize: "13px",
            marginBottom: "20px",
            textAlign: "center",
          }}>
            ❌ {error}
          </div>
        )}

        {/* Form */}
        <div>
          <label style={{ color: "#cab6a5", fontSize: "11px", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>
            FULL NAME
          </label>
          <input
            style={inputStyle}
            placeholder="Joshua"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label style={{ color: "#cab6a5", fontSize: "11px", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>
            EMAIL
          </label>
          <input
            style={inputStyle}
            type="email"
            placeholder="joshua@shopsmart.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label style={{ color: "#cab6a5", fontSize: "11px", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>
            PASSWORD
          </label>
          <input
            style={inputStyle}
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <label style={{ color: "#cab6a5", fontSize: "11px", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>
            CONFIRM PASSWORD
          </label>
          <input
            style={inputStyle}
            type="password"
            placeholder="••••••••"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleSetup()}
          />
        </div>

        <button
          onClick={handleSetup}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#dcb490",
            color: "#4c311c",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            letterSpacing: "1px",
            fontFamily: "'Georgia', serif",
            opacity: loading ? 0.7 : 1,
            marginTop: "8px",
          }}
        >
          {loading ? "Setting up..." : "🚀 Create Admin Account"}
        </button>

        <p style={{
          color: "#6b5a45",
          fontSize: "11px",
          textAlign: "center",
          marginTop: "24px",
          lineHeight: "1.6",
        }}>
          ⚠️ This setup page is only available once.<br />
          After setup, only the admin can access ShopSmart.
        </p>
      </div>
    </div>
  );
}

export default Setup;
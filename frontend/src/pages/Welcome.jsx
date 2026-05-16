import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Welcome() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setShowLogin(false);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(135deg, #4c311c 0%, #8e6844 60%, #484d38 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "20px",
      fontFamily: "'Georgia', serif",
      position: "relative",
    }}>

      {/* Logo */}
      <div style={{
        width: "90px",
        height: "90px",
        backgroundColor: "#dcb490",
        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "48px",
        marginBottom: "24px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}>🛒</div>

      {/* Title */}
      <h1 style={{
        fontSize: "52px",
        fontWeight: "bold",
        marginBottom: "12px",
        letterSpacing: "4px",
        color: "#ffffff",
        textShadow: "0 2px 8px rgba(0,0,0,0.5)",
      }}>
        ShopSmart
      </h1>

      {/* Divider */}
      <div style={{
        width: "60px",
        height: "3px",
        backgroundColor: "#dcb490",
        borderRadius: "2px",
        marginBottom: "16px",
      }} />

      {/* Subtitle */}
      <p style={{
        fontSize: "15px",
        color: "#f5ede3",
        marginBottom: "48px",
        maxWidth: "420px",
        lineHeight: "1.8",
        letterSpacing: "0.8px",
      }}>
        A smart inventory management system for retail shops and supermarkets
      </p>

      {/* Feature Cards */}
      <div style={{
        display: "flex",
        gap: "14px",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: "48px",
      }}>
        {[
          { icon: "📦", label: "Products", color: "#c8955e" },
          { icon: "🗂️", label: "Categories", color: "#8d7b5e" },
          { icon: "🚚", label: "Suppliers", color: "#7a8c6e" },
          { icon: "⚠️", label: "Low Stock", color: "#9e6b4a" },
        ].map((item) => (
          <div key={item.label} style={{
            backgroundColor: item.color,
            padding: "22px 26px",
            borderRadius: "16px",
            fontSize: "13px",
            color: "#ffffff",
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            minWidth: "100px",
          }}>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>{item.icon}</div>
            <div style={{ fontWeight: "bold", letterSpacing: "1px" }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Get Started Button */}
      <button
        onClick={() => setShowLogin(true)}
        style={{
          background: "#dcb490",
          color: "#4c311c",
          border: "none",
          padding: "16px 56px",
          borderRadius: "50px",
          fontSize: "17px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          letterSpacing: "1.5px",
          marginBottom: "48px",
          fontFamily: "'Georgia', serif",
        }}
      >
        🚀 Get Started
      </button>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid rgba(220,180,144,0.3)",
        paddingTop: "20px",
        fontSize: "13px",
        color: "#dcb490",
        letterSpacing: "0.5px",
      }}>
        <p style={{ marginBottom: "6px" }}>
          Developed by <span style={{ fontWeight: "bold", fontSize: "15px", color: "#ffffff" }}>Joshua</span>
        </p>
        <p>Registration No: <span style={{ fontWeight: "bold", color: "#ffffff" }}>2022ICT85</span></p>
      </div>

      {/* Login Popup */}
      {showLogin && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            background: "linear-gradient(145deg, #4c311c, #6b4423)",
            border: "1px solid rgba(220,180,144,0.4)",
            borderRadius: "20px",
            padding: "48px",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
            position: "relative",
          }}>

            {/* Close Button */}
            <button
              onClick={() => { setShowLogin(false); setError(""); }}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                backgroundColor: "transparent",
                border: "none",
                color: "#cab6a5",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >✕</button>

            {/* Popup Logo */}
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#dcb490",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                margin: "0 auto 12px",
              }}>🛒</div>
              <h2 style={{ color: "#dcb490", fontSize: "22px", letterSpacing: "2px", marginBottom: "4px" }}>
                Welcome Back!
              </h2>
              <p style={{ color: "#cab6a5", fontSize: "12px" }}>Sign in to continue</p>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                backgroundColor: "rgba(220,50,50,0.2)",
                border: "1px solid rgba(220,50,50,0.4)",
                borderRadius: "10px",
                padding: "10px",
                color: "#ff6b6b",
                fontSize: "13px",
                marginBottom: "16px",
                textAlign: "center",
              }}>
                ❌ {error}
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                color: "#cab6a5",
                fontSize: "11px",
                letterSpacing: "1px",
                display: "block",
                marginBottom: "6px",
              }}>EMAIL</label>
              <input
                type="email"
                placeholder="joshua@shopsmart.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{
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
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                color: "#cab6a5",
                fontSize: "11px",
                letterSpacing: "1px",
                display: "block",
                marginBottom: "6px",
              }}>PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{
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
                }}
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "#dcb490",
                color: "#4c311c",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: "pointer",
                letterSpacing: "1px",
                fontFamily: "'Georgia', serif",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Signing in..." : "🔐 Sign In"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Welcome;
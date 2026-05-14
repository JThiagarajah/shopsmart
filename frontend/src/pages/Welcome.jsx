import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

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
      }}/>

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
            <div style={{
              fontWeight: "bold",
              letterSpacing: "1px",
              fontSize: "13px",
            }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Get Started Button */}
      <button
        onClick={() => navigate("/dashboard")}
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
        <p>
          Registration No: <span style={{ fontWeight: "bold", color: "#ffffff" }}>2022ICT85</span>
        </p>
      </div>

    </div>
  );
}

export default Welcome;
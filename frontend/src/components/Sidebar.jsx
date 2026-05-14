import { Link, useLocation, useNavigate } from "react-router-dom";

const links = [
  { path: "/dashboard", label: "🏠 Dashboard" },
  { path: "/products", label: "📦 Products" },
  { path: "/categories", label: "🗂️ Categories" },
  { path: "/suppliers", label: "🚚 Suppliers" },
  { path: "/low-stock", label: "⚠️ Low Stock" },
  { path: "/contact", label: "📞 Contact" },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{
      width: "250px",
      height: "100vh",
      background: "linear-gradient(180deg, #4c311c 0%, #3a2510 100%)",
      color: "white",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "4px 0 20px rgba(0,0,0,0.4)",
    }}>

      {/* Top Section */}
      <div style={{ padding: "24px 16px" }}>

        {/* Logo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "32px",
          paddingBottom: "20px",
          borderBottom: "1px solid rgba(220,180,144,0.3)",
        }}>
          <div style={{
            backgroundColor: "#dcb490",
            borderRadius: "10px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
          }}>🛒</div>
          <h2 style={{
            color: "#dcb490",
            fontSize: "20px",
            letterSpacing: "2px",
          }}>ShopSmart</h2>
        </div>

        {/* Nav Links */}
        <nav>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: "block",
                padding: "12px 16px",
                marginBottom: "6px",
                borderRadius: "10px",
                textDecoration: "none",
                color: location.pathname === link.path ? "#4c311c" : "#cab6a5",
                backgroundColor: location.pathname === link.path ? "#dcb490" : "transparent",
                fontWeight: location.pathname === link.path ? "bold" : "normal",
                letterSpacing: "0.5px",
                fontSize: "14px",
                transition: "all 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div style={{
        padding: "16px",
        borderTop: "1px solid rgba(220,180,144,0.3)",
      }}>
        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#dcb490",
            color: "#4c311c",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
            letterSpacing: "0.5px",
            marginBottom: "16px",
            fontFamily: "'Georgia', serif",
          }}
        >
          🏠 Return to Home
        </button>

        {/* Copyright */}
        <p style={{
          color: "#8d7b5e",
          fontSize: "11px",
          textAlign: "center",
          lineHeight: "1.6",
        }}>
          © 2024 ShopSmart<br />
          Developed by <span style={{ color: "#dcb490" }}>Joshua</span><br />
          <span style={{ color: "#6b5a45" }}>2022ICT85</span>
        </p>
      </div>

    </div>
  );
}

export default Sidebar;
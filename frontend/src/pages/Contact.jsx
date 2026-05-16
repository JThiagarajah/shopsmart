function Contact() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>

      {/* Header */}
      <h1 style={{ color: "#dcb490", letterSpacing: "2px", marginBottom: "8px" }}>
        📞 Contact
      </h1>
      <div style={{ width: "50px", height: "3px", backgroundColor: "#dcb490", borderRadius: "2px", marginBottom: "40px" }} />

      {/* Hero Card */}
      <div style={{
        background: "linear-gradient(135deg, rgba(76,49,28,0.9), rgba(72,77,56,0.9))",
        border: "1px solid rgba(220,180,144,0.3)",
        borderRadius: "24px",
        padding: "40px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        gap: "40px",
        backdropFilter: "blur(8px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}>
        {/* Avatar */}
        <div style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #dcb490, #8e6844)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "52px",
          fontWeight: "bold",
          color: "#4c311c",
          flexShrink: 0,
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          border: "3px solid rgba(220,180,144,0.5)",
        }}>
          J
        </div>

        {/* Info */}
        <div>
          <p style={{ color: "#dcb490", fontSize: "13px", letterSpacing: "2px", marginBottom: "6px" }}>DEVELOPER</p>
          <h2 style={{ color: "#ffffff", fontSize: "36px", fontWeight: "bold", marginBottom: "8px", letterSpacing: "1px" }}>
            Joshua
          </h2>
          <div style={{
            display: "inline-block",
            backgroundColor: "rgba(220,180,144,0.2)",
            border: "1px solid rgba(220,180,144,0.4)",
            borderRadius: "20px",
            padding: "4px 16px",
            color: "#dcb490",
            fontSize: "13px",
            marginBottom: "12px",
          }}>
            2022ICT85
          </div>
          <p style={{ color: "#cab6a5", fontSize: "14px", lineHeight: "1.6" }}>
            2nd Year IT Student — Web Services & Technology (IT2234)<br />
            Built ShopSmart as part of ICA-03 Project Assignment
          </p>
        </div>
      </div>

      {/* Contact Cards Row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginBottom: "24px",
      }}>
        {[
          { icon: "📧", label: "Email", value: "joshuat@gmail.com", color: "#c8955e" },
          { icon: "📱", label: "Phone", value: "+94 71 510 8000", color: "#7a8c6e" },
          { icon: "🌍", label: "Location", value: "Vavuniya, Sri Lanka", color: "#8d7b5e" },
          { icon: "🎓", label: "Institute", value: "University of Vavuniya", color: "#9e6b4a" },
        ].map((item) => (

          <div key={item.label} style={{
            background: "rgba(220,180,144,0.08)",
            border: "1px solid rgba(220,180,144,0.2)",
            borderRadius: "16px",
            padding: "24px",
            backdropFilter: "blur(8px)",
            textAlign: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          }}>
            <div style={{
              width: "52px",
              height: "52px",
              backgroundColor: item.color,
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              margin: "0 auto 14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}>
              {item.icon}
            </div>
            <p style={{ color: "#ffffff", fontSize: "11px", letterSpacing: "1px", marginBottom: "6px" }}>
              {item.label.toUpperCase()}
            </p>
            <p style={{ color: "#ffffff", fontSize: "13px", fontWeight: "bold" }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

    

      {/* Footer Copyright */}
      <div style={{
        background: "linear-gradient(135deg, rgba(76,49,28,0.8), rgba(58,37,16,0.8))",
        border: "1px solid rgba(220,180,144,0.2)",
        borderRadius: "16px",
        padding: "24px",
        textAlign: "center",
        backdropFilter: "blur(8px)",
      }}>
        <p style={{ fontSize: "28px", marginBottom: "8px" }}>🛒</p>
        <p style={{ color: "#dcb490", fontSize: "18px", fontWeight: "bold", letterSpacing: "2px", marginBottom: "6px" }}>
          ShopSmart
        </p>
        <p style={{ color: "#cab6a5", fontSize: "13px", marginBottom: "4px" }}>
          © 2024 All Rights Reserved
        </p>
        <p style={{ color: "#8d7b5e", fontSize: "12px" }}>
          Designed & Developed by{" "}
          <span style={{ color: "#dcb490", fontWeight: "bold" }}>Joshua</span>
          {" "}— 2022ICT85
        </p>
      </div>

    </div>
  );
}

export default Contact;
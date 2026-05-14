function Contact() {
  return (
    <div>
      <h1 style={{ color: "#dcb490", letterSpacing: "2px", marginBottom: "8px" }}>
        📞 Contact
      </h1>
      <div style={{
        width: "50px",
        height: "3px",
        backgroundColor: "#dcb490",
        borderRadius: "2px",
        marginBottom: "32px",
      }} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        marginBottom: "32px",
      }}>
        {/* Developer Card */}
        <div style={{
          background: "rgba(220,180,144,0.1)",
          border: "1px solid rgba(220,180,144,0.3)",
          borderRadius: "16px",
          padding: "32px",
          backdropFilter: "blur(8px)",
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#dcb490",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            marginBottom: "16px",
          }}>👨‍💻</div>
          <h2 style={{ color: "#ffffff", marginBottom: "8px", fontSize: "22px" }}>Joshua</h2>
          <p style={{ color: "#dcb490", marginBottom: "4px", fontSize: "14px" }}>Registration No: 2022ICT85</p>
          <p style={{ color: "#cab6a5", fontSize: "13px" }}>2nd Year IT Student</p>
        </div>

        {/* Contact Details Card */}
        <div style={{
          background: "rgba(220,180,144,0.1)",
          border: "1px solid rgba(220,180,144,0.3)",
          borderRadius: "16px",
          padding: "32px",
          backdropFilter: "blur(8px)",
        }}>
          <h3 style={{ color: "#dcb490", marginBottom: "24px", letterSpacing: "1px" }}>
            Get In Touch
          </h3>
          {[
            { icon: "📧", label: "Email", value: "joshua@example.com" },
            { icon: "📱", label: "Phone", value: "+94 77 123 4567" },
            { icon: "🌍", label: "Location", value: "Colombo, Sri Lanka" },
            { icon: "🎓", label: "Institute", value: "IT Faculty" },
          ].map((item) => (
            <div key={item.label} style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
              padding: "12px",
              backgroundColor: "rgba(220,180,144,0.08)",
              borderRadius: "10px",
            }}>
              <span style={{ fontSize: "20px" }}>{item.icon}</span>
              <div>
                <p style={{ color: "#8d7b5e", fontSize: "11px", marginBottom: "2px" }}>{item.label}</p>
                <p style={{ color: "#ffffff", fontSize: "14px" }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Copyright */}
      <div style={{
        background: "rgba(220,180,144,0.1)",
        border: "1px solid rgba(220,180,144,0.2)",
        borderRadius: "16px",
        padding: "24px",
        textAlign: "center",
        backdropFilter: "blur(8px)",
      }}>
        <p style={{ color: "#dcb490", fontSize: "20px", marginBottom: "8px" }}>🛒 ShopSmart</p>
        <p style={{ color: "#cab6a5", fontSize: "13px", marginBottom: "4px" }}>
          © 2024 All Rights Reserved
        </p>
        <p style={{ color: "#8d7b5e", fontSize: "12px" }}>
          Designed & Developed by <span style={{ color: "#dcb490", fontWeight: "bold" }}>Joshua</span> — 2022ICT85
        </p>
      </div>
    </div>
  );
}

export default Contact;
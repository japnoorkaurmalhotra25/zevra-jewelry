function About() {
  return (
    <div
      style={{
        backgroundColor: "#f5efe6",
        minHeight: "100vh",
        padding: "70px 20px"
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center",
          marginBottom: "70px"
        }}
      >
        <h1
          style={{
            fontSize: "44px",
            fontFamily: "serif",
            color: "#2c3e50",
            marginBottom: "16px"
          }}
        >
          About ZEVRA
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#777",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.7"
          }}
        >
          Jewelry that captures elegance, emotion, and timeless beauty —
          designed to be cherished forever.
        </p>
      </div>

      {/* Content Card */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "22px",
          padding: "50px",
          boxShadow: "0 18px 40px rgba(0,0,0,0.08)"
        }}
      >
        <p style={paragraphStyle}>
          ZEVRA was founded with a singular vision — to create jewelry that feels
          personal, luxurious, and everlasting. Every piece is thoughtfully
          designed to reflect grace, confidence, and individuality.
        </p>

        <p style={paragraphStyle}>
          Our collections blend traditional craftsmanship with modern design,
          using premium metals and ethically sourced materials. From everyday
          elegance to statement pieces, ZEVRA is crafted to complement every
          chapter of your story.
        </p>

        <p style={paragraphStyle}>
          Jewelry is more than adornment — it’s emotion, memory, and meaning.
          That belief guides everything we create.
        </p>

        {/* Why ZEVRA */}
        <div style={{ marginTop: "60px" }}>
          <h2
            style={{
              textAlign: "center",
              fontFamily: "serif",
              fontSize: "30px",
              color: "#2c3e50",
              marginBottom: "40px"
            }}
          >
            Why Choose ZEVRA
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "25px"
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  backgroundColor: "#fafafa",
                  padding: "30px",
                  borderRadius: "18px",
                  textAlign: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "default"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "30px", marginBottom: "14px" }}>
                  {f.icon}
                </div>
                <h4
                  style={{
                    fontSize: "18px",
                    marginBottom: "10px",
                    color: "#2c3e50"
                  }}
                >
                  {f.title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.6"
                  }}
                >
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div
          style={{
            marginTop: "70px",
            textAlign: "center"
          }}
        >
          <p
            style={{
              fontFamily: "serif",
              fontSize: "20px",
              color: "#d4af37"
            }}
          >
            Crafted with love. Designed to last ✨
          </p>
        </div>
      </div>
    </div>
  );
}

const paragraphStyle = {
  fontSize: "16px",
  lineHeight: "1.8",
  color: "#555",
  marginBottom: "22px"
};

const features = [
  {
    icon: "💎",
    title: "Premium Quality",
    text: "Carefully crafted using high-quality metals and finishes."
  },
  {
    icon: "✨",
    title: "Timeless Design",
    text: "Elegant pieces that never go out of style."
  },
  {
    icon: "🤍",
    title: "Ethical Craft",
    text: "Responsibly sourced materials and mindful craftsmanship."
  },
  {
    icon: "🎁",
    title: "Perfect for Gifting",
    text: "Designed to mark life’s most meaningful moments."
  }
];

export default About;

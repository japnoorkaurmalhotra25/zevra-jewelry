import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        padding: "0",
        position: "relative",
        overflow: "hidden",
        width: "100vw",
        boxSizing: "border-box"
      }}
    >
      {/* BACKGROUND IMAGE - Full coverage */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}
      >
        <img
          src="/hero-ring2.png"
          alt="Luxury diamond ring"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
        {/* Subtle overlay for text contrast */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 40%, transparent 65%)"
          }}
        />
      </div>

      <div
        style={{
          width: "100%",
          position: "relative",
          zIndex: 1,
          paddingLeft: "120px"
        }}
      >
        {/* LEFT CONTENT */}
        <div style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "600px"
        }}>
          <h1
            style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: "70px",
              fontWeight: 400,
              lineHeight: "1.2",
              color: "#343131",
              marginBottom: "48px",
              letterSpacing: "0px",
              textShadow: "0 1px 4px rgba(0,0,0,0.08)"
            }}
          >
            Crafted for moments
            <br />
            <span style={{ 
              fontStyle: "italic"
            }}>
              that last forever
            </span>
          </h1>

          <div style={{ display: "flex", gap: "16px" }}>
            <button
              onClick={() => navigate("/createOwn")}
              onMouseEnter={(e) => {
                e.target.style.background = "#b8924a";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 28px rgba(184, 146, 74, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#a68547";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 6px 20px rgba(166, 133, 71, 0.35)";
              }}
              style={{
                padding: "16px 38px",
                background: "#a68547",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "'Montserrat', sans-serif",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(166, 133, 71, 0.35)",
                letterSpacing: "0.5px",
                transition: "all 0.3s ease"
              }}
            >
              Create Your Jewelry
            </button>

            <button
              onClick={() => navigate("/products")}
              onMouseEnter={(e) => {
                e.target.style.background = "#a68547";
                e.target.style.color = "#ffffff";
                e.target.style.borderColor = "#a68547";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 28px rgba(166, 133, 71, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#343131";
                e.target.style.borderColor = "#343131";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
              }}
              style={{
                padding: "16px 38px",
                background: "transparent",
                color: "#343131",
                border: "1px solid #343131",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "'Montserrat', sans-serif",
                cursor: "pointer",
                letterSpacing: "0.5px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)"
              }}
            >
              Explore Collections
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
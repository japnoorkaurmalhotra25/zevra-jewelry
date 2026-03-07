import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize";

function About() {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useWindowSize();

  return (
    <div style={{ backgroundColor: "#f5f0eb", minHeight: "100vh", fontFamily: "'Montserrat', system-ui, sans-serif" }}>

      {/* HERO */}
      <div
        style={{
          position: "relative",
          height: isMobile ? "260px" : "420px",
          overflow: "hidden"
        }}
      >
        <img
          src="/about-hero.jpeg"
          alt="About"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "85% center"
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(245,240,235,0.85) 30%, rgba(245,240,235,0.3) 60%, transparent)"
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: isMobile ? "50px" : "150px"
          }}
        >
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: isMobile ? "38px" : "58px",
              fontWeight: "400",
              margin: 0,
              color: "#3c3737"
            }}
          >
            About Us
          </h1>
        </div>
      </div>

      {/* INTRO */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: isMobile ? "40px 20px" : "70px 40px"
        }}
      >
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: isMobile ? "24px" : "36px",
            fontWeight: "400",
            marginBottom: "20px",
            color: "#2c2c2c"
          }}
        >
          Creating Timeless Jewelry of Exceptional Beauty
        </h2>

        <p
          style={{
            color: "#6b6b6b",
            lineHeight: "1.9",
            maxWidth: "900px"
          }}
        >
          ZEVRA is a premium jewelry brand dedicated to exceptional
          craftsmanship, quality, and elegance.
        </p>

        <p
          style={{
            color: "#6b6b6b",
            lineHeight: "1.9",
            maxWidth: "900px"
          }}
        >
         Our passion lies in creating exquisite, timeless jewelry, meticulously crafted to bring you joy at life's happiest moments, pairing luxurious artistry with conflict-free diamonds, precious gemstones, and high-quality metals that are as rare as they are one of a kind.
        </p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "#e6dfd6",
            margin: "40px 0"
          }}
        />

        {/* CRAFT SECTION */}
        <div
          style={{
            background: "#f8f5f1",
            padding: isMobile ? "25px" : "40px",
            borderRadius: "10px"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "40px",
              alignItems: "center"
            }}
          >
            {/* IMAGE */}
            <img
              src="/about-craft.jpg"
              alt="Craft"
              style={{
                width: "100%",
                borderRadius: "6px",
                objectFit: "cover"
              }}
            />

            {/* TEXT */}
            <div>
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "28px",
                  fontWeight: "400",
                  marginBottom: "15px"
                }}
              >
                Crafting Perfection
              </h3>

              <p style={{ color: "#6b6b6b", lineHeight: "1.8" }}>
                ZEVRA is dedicated to exceptional craftsmanship, quality, and
                elegance. Our passion is in creating exquisite, timeless
                jewelry, meticulously crafted to bring joy at the happiest
                moments using the finest materials.
              </p>

              {/* FEATURES */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                  marginTop: "25px"
                }}
              >
                {[
                  "Superior Craftsmanship",
                  "Certified Conflict-Free Diamonds",
                  "Trusted & Reliable",
                  "Trusted & Reliable"
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "#555",
                      fontSize: "14px"
                    }}
                  >
                    <span style={{ color: "#b89a5d" }}>◆</span>
                    {item}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/products")}
                style={{
                  marginTop: "30px",
                  padding: "12px 40px",
                  background: "#a68547",
                  border: "none",
                  color: "#fff",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM FEATURES */}
        <div
          style={{
            marginTop: "50px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "40px"
          }}
        >
          {[
            "Superior Craftsmanship",
            "Certified Conflict-Free Diamonds",
            "Trusted & Reliable",
            "Trusted & Reliable"
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#5f5f5f"
              }}
            >
              <span style={{ color: "#b89a5d" }}>◆</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        const res = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } else {
        await API.post("/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setMode("login");
        setError("Account created! Please log in.");
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isLogin = mode === "login";

  return (
    <div style={page}>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root {
          height: 100%;
          margin: 0;
          overflow: hidden;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .auth-form {
          animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .auth-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 10px;
          border: 1.5px solid rgba(212,175,55,0.4);
          font-size: 15px;
          color: #333;
          outline: none;
          font-family: inherit;
          background: rgba(255,255,255,0.75);
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
          box-sizing: border-box;
        }
        .auth-input:focus {
          border-color: #d4af37;
          box-shadow: 0 0 0 4px rgba(212,175,55,0.15);
          transform: translateY(-1px);
          background: rgba(255,255,255,0.95);
        }
        .shimmer-btn {
          width: 100%;
          padding: 15px;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.5px;
          font-family: inherit;
          background: linear-gradient(90deg,#c9a227 0%,#f0d060 40%,#d4af37 60%,#c9a227 100%);
          background-size: 200% auto;
          transition: background-position 0.5s, transform 0.15s, box-shadow 0.25s;
        }
        .shimmer-btn:hover:not(:disabled) {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,175,55,0.5);
        }
        .shimmer-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .tab-btn {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 10px;
          background: transparent;
          color: #999;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }
        .tab-btn.active {
          background: rgba(255,255,255,0.9);
          color: #333;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        @media (max-width: 480px) {
          .auth-form {
            padding: 32px 24px !important;
          }
        }
      `}</style>

      <div style={bgOverlay} />

      <div className="auth-form" style={card}>
        <div style={logoWrap}>
          <span style={logo}>ZEVRA</span>
          <span style={tagline}>Crafted for the Extraordinary</span>
        </div>

        <div style={tabs}>
          <button
            className={`tab-btn ${isLogin ? "active" : ""}`}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Sign In
          </button>
          <button
            className={`tab-btn ${!isLogin ? "active" : ""}`}
            onClick={() => { setMode("signup"); setError(""); }}
          >
            Create Account
          </button>
        </div>

        <div style={formBox}>
          {!isLogin && (
            <div style={fieldWrap}>
              <label style={label}>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="auth-input"
              />
            </div>
          )}

          <div style={fieldWrap}>
            <label style={label}>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="auth-input"
            />
          </div>

          <div style={fieldWrap}>
            <label style={label}>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="auth-input"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          {error && (
            <p style={{
              fontSize: "13px",
              margin: 0,
              textAlign: "center",
              color: error.includes("created") ? "#4caf50" : "#c0392b",
            }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="shimmer-btn"
            style={{ marginTop: "6px" }}
          >
            {loading ? "Please wait…" : isLogin ? "Sign In" : "Create Account"}
          </button>
        </div>

        <p style={footerText}>
          {isLogin ? "New to ZEVRA? " : "Already have an account? "}
          <span
            style={toggleLink}
            onClick={() => { setMode(isLogin ? "signup" : "login"); setError(""); }}
          >
            {isLogin ? "Create an account" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}

const page = {
  height: "calc(100vh - 68px)",
  backgroundImage: "url('/login.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
};

const bgOverlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.15)",
  zIndex: 0,
};

const card = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "24px",
  padding: "44px 48px",
  width: "90%",
  maxWidth: "460px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
  border: "1px solid rgba(212,175,55,0.3)",
  position: "relative",
  zIndex: 1,
};

const logoWrap = {
  textAlign: "center",
  marginBottom: "28px",
};

const logo = {
  display: "block",
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "34px",
  fontWeight: "700",
  color: "#d4af37",
  letterSpacing: "6px",
  textShadow: "0 2px 10px rgba(212,175,55,0.3)",
};

const tagline = {
  display: "block",
  fontSize: "11px",
  color: "#8a6f45",
  letterSpacing: "2px",
  marginTop: "5px",
  fontStyle: "italic",
};

const tabs = {
  display: "flex",
  background: "rgba(248,244,238,0.8)",
  borderRadius: "12px",
  padding: "4px",
  marginBottom: "28px",
  gap: "4px",
  border: "1px solid rgba(212,175,55,0.15)",
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const fieldWrap = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const label = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#7a5c30",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
};

const footerText = {
  textAlign: "center",
  fontSize: "13px",
  color: "#8a6f45",
  marginTop: "22px",
  marginBottom: "0",
};

const toggleLink = {
  color: "#090909",
  fontWeight: "600",
  cursor: "pointer",
  textDecoration: "underline",
};

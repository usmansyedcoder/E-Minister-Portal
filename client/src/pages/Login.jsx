import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate("/minister-dashboard");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #01411C 0%, #1a6b3a 50%, #01411C 100%)",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background Elements */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(249, 168, 38, 0.08)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(249, 168, 38, 0.05)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249, 168, 38, 0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main Login Card */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "clamp(30px, 5vw, 50px)",
          maxWidth: "480px",
          width: "100%",
          boxShadow:
            "0 20px 80px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: 1,
          animation: "fadeInUp 0.6s ease-out",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Top Decorative Line */}
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(90deg, #F9A826, #01411C)",
            borderRadius: "2px",
            margin: "0 auto 25px auto",
          }}
        />

        {/* Logo Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #01411C, #1a6b3a)",
              padding: "15px",
              borderRadius: "50%",
              marginBottom: "15px",
              boxShadow: "0 8px 25px rgba(1, 65, 28, 0.3)",
            }}
          >
            <span
              style={{
                fontSize: "36px",
                display: "block",
              }}
            >
              🌾
            </span>
          </div>
          <h2
            style={{
              color: "#01411C",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: "700",
              margin: "10px 0 5px 0",
              letterSpacing: "1px",
            }}
          >
            E-Minister Portal
          </h2>
          <p
            style={{
              color: "#F9A826",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              fontWeight: "600",
              margin: "0",
              letterSpacing: "2px",
            }}
          >
            Khyber Pakhtunkhwa
          </p>
          <div
            style={{
              width: "60px",
              height: "2px",
              background: "linear-gradient(90deg, #F9A826, transparent)",
              margin: "12px auto 0 auto",
            }}
          />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#333",
                fontSize: "clamp(13px, 1vw, 14px)",
                fontWeight: "600",
                marginBottom: "8px",
                letterSpacing: "0.5px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              style={{
                width: "100%",
                padding: "14px 18px",
                border: "2px solid #e0e0e0",
                borderRadius: "12px",
                fontSize: "clamp(14px, 1vw, 15px)",
                transition: "all 0.3s ease",
                background: "#f8f9fa",
                outline: "none",
                color: "#333",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#F9A826";
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.boxShadow =
                  "0 0 0 4px rgba(249, 168, 38, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e0e0e0";
                e.currentTarget.style.background = "#f8f9fa";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                color: "#333",
                fontSize: "clamp(13px, 1vw, 14px)",
                fontWeight: "600",
                marginBottom: "8px",
                letterSpacing: "0.5px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              style={{
                width: "100%",
                padding: "14px 18px",
                border: "2px solid #e0e0e0",
                borderRadius: "12px",
                fontSize: "clamp(14px, 1vw, 15px)",
                transition: "all 0.3s ease",
                background: "#f8f9fa",
                outline: "none",
                color: "#333",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#F9A826";
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.boxShadow =
                  "0 0 0 4px rgba(249, 168, 38, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e0e0e0";
                e.currentTarget.style.background = "#f8f9fa";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #F9A826, #f5a623)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "clamp(16px, 1.2vw, 18px)",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(249, 168, 38, 0.4)",
              letterSpacing: "1px",
              textTransform: "uppercase",
              position: "relative",
              overflow: "hidden",
            }}
            disabled={loading}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 35px rgba(249, 168, 38, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(249, 168, 38, 0.4)";
            }}
          >
            {loading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    border: "3px solid rgba(255,255,255,0.3)",
                    borderTop: "3px solid #fff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Logging in...
              </span>
            ) : (
              "Minister Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            fontSize: "clamp(11px, 0.8vw, 12px)",
            color: "#999",
            margin: "25px 0 0 0",
          }}
        >
          Only authorized personnel can access this portal
        </p>

        {/* Back to Home Link */}
        <Link
          to="/"
          style={{
            display: "block",
            textAlign: "center",
            color: "#01411C",
            fontSize: "clamp(13px, 1vw, 14px)",
            fontWeight: "600",
            textDecoration: "none",
            marginTop: "15px",
            transition: "all 0.3s ease",
            padding: "8px",
            borderRadius: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#F9A826";
            e.currentTarget.style.background = "rgba(249, 168, 38, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#01411C";
            e.currentTarget.style.background = "transparent";
          }}
        >
          ← Back to Home
        </Link>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Smooth hover for inputs */
        input:hover {
          border-color: #F9A826 !important;
        }
      `}</style>
    </div>
  );
};

export default Login;

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      {/* Banner Section - Image Banner */}
      <div
        className="banner"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "clamp(25px, 4vw, 40px)",
          boxShadow: "0 8px 32px rgba(1, 65, 28, 0.2)",
          transition: "all 0.3s ease",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 12px 48px rgba(1, 65, 28, 0.3)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(1, 65, 28, 0.2)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <img
          src="/whatsapp-image-banner.jpeg"
          alt="Agriculture Department KP - E-Minister Portal"
          style={{
            width: "100%",
            height: "50%",
            display: "block",
            objectFit: "cover",
          }}
        />

        {/* Optional: Overlay with quick action buttons */}
        {/* <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/submit-complaint"
            style={{
              background: "rgba(249, 168, 38, 0.9)",
              color: "#fff",
              padding: "8px 20px",
              borderRadius: "25px",
              textDecoration: "none",
              fontSize: "clamp(12px, 1vw, 14px)",
              fontWeight: "600",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(249, 168, 38, 1)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(249, 168, 38, 0.9)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            File Complaint
          </Link>
          <Link
            to="/submit-suggestion"
            style={{
              background: "rgba(1, 65, 28, 0.85)",
              color: "#fff",
              padding: "8px 20px",
              borderRadius: "25px",
              textDecoration: "none",
              fontSize: "clamp(12px, 1vw, 14px)",
              fontWeight: "600",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(1, 65, 28, 1)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(1, 65, 28, 0.85)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Give Suggestion
          </Link>
        </div> */}
      </div>

      {/* Hero Section */}
      <div className="hero">
        <h1>
          Welcome To <span className="highlight">E-Minister Portal</span>
        </h1>
        <p>
          Your voice matters! Submit complaints and suggestions directly to the
          Minister of Khyber Pakhtunkhwa. Help us build a better Pakistan
          together.
        </p>
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Link
            to="/submit-complaint"
            className="btn btn-gold"
            style={{
              minWidth: "200px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              backgroundColor: "white",
              color: "var(--pakistan-green)",
              border: "2px solid var(--pakistan-green)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(249, 168, 38, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(249, 168, 38, 0.3)";
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>
              File a Complaint
            </span>
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "0",
                height: "0",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                transition: "width 0.6s, height 0.6s",
                pointerEvents: "none",
              }}
              className="ripple-effect"
            />
          </Link>

          <Link
            to="/submit-suggestion"
            className="btn btn-primary"
            style={{
              minWidth: "200px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              backgroundColor: "white",
              color: "var(--pakistan-green)",
              border: "2px solid var(--pakistan-green)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(249, 168, 38, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(249, 168, 38, 0.4)";
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>
              Give a Suggestion
            </span>
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "0",
                height: "0",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                transition: "width 0.6s, height 0.6s",
                pointerEvents: "none",
              }}
              className="ripple-effect"
            />
          </Link>
        </div>
      </div>

      {/* Feature Cards - Responsive Grid */}
      <div className="feature-grid">
        <Link to="/submit-complaint" style={{ textDecoration: "none" }}>
          <div
            className="feature-card"
            style={{
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(1, 65, 28, 0.15)";
              e.currentTarget.style.borderColor = "var(--pakistan-gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "var(--shadow-light)";
              e.currentTarget.style.borderColor = "rgba(1, 65, 28, 0.08)";
            }}
          >
            <div
              className="icon"
              style={{
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.2) rotate(-10deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) rotate(0)";
              }}
            >
              📋
            </div>
            <h3>File a Complaint</h3>
            <p>
              Report issues in your area. From healthcare to infrastructure,
              we're here to listen.
            </p>
            <span
              style={{
                display: "inline-block",
                marginTop: "15px",
                color: "var(--pakistan-gold)",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s ease",
              }}
              className="learn-more"
            >
              Learn More →
            </span>
          </div>
        </Link>

        <Link to="/submit-suggestion" style={{ textDecoration: "none" }}>
          <div
            className="feature-card"
            style={{
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(1, 65, 28, 0.15)";
              e.currentTarget.style.borderColor = "var(--pakistan-gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "var(--shadow-light)";
              e.currentTarget.style.borderColor = "rgba(1, 65, 28, 0.08)";
            }}
          >
            <div
              className="icon"
              style={{
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.2) rotate(10deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) rotate(0)";
              }}
            >
              💡
            </div>
            <h3>Give a Suggestion</h3>
            <p>
              Share innovative ideas for KP's development. Your suggestions can
              shape the future.
            </p>
            <span
              style={{
                display: "inline-block",
                marginTop: "15px",
                color: "var(--pakistan-green)",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s ease",
              }}
              className="learn-more"
            >
              Learn More →
            </span>
          </div>
        </Link>

        <div
          className="feature-card"
          style={{
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
            e.currentTarget.style.boxShadow =
              "0 12px 40px rgba(1, 65, 28, 0.15)";
            e.currentTarget.style.borderColor = "var(--pakistan-gold)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "var(--shadow-light)";
            e.currentTarget.style.borderColor = "rgba(1, 65, 28, 0.08)";
          }}
        >
          <div
            className="icon"
            style={{
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            🤝
          </div>
          <h3>Transparent Governance</h3>
          <p>
            All complaints and suggestions are reviewed by the Minister's office
            with full transparency.
          </p>
          <span
            style={{
              display: "inline-block",
              marginTop: "15px",
              color: "var(--pakistan-gold)",
              fontWeight: "600",
              fontSize: "14px",
              transition: "all 0.3s ease",
            }}
            className="learn-more"
          >
            Learn More →
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <div
        className="card"
        style={{
          textAlign: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%)",
          padding: "clamp(20px, 3vw, 30px)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(1, 65, 28, 0.1)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-light)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <h3
          style={{
            color: "var(--pakistan-green)",
            marginBottom: "10px",
            fontSize: "clamp(18px, 2vw, 24px)",
          }}
        >
          🇵🇰 Building a Better Khyber Pakhtunkhwa
        </h3>
        <p
          style={{
            color: "#666",
            maxWidth: "600px",
            margin: "0 auto",
            fontSize: "clamp(14px, 1.2vw, 16px)",
          }}
        >
          Your participation in governance helps create a stronger, more
          responsive government that serves the people of Pakistan.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(15px, 3vw, 30px)",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              transition: "all 0.3s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            <span style={{ fontSize: "clamp(28px, 4vw, 32px)" }}>🏛️</span>
            <p
              style={{
                fontSize: "clamp(12px, 1vw, 14px)",
                color: "#888",
                marginTop: "5px",
              }}
            >
              Transparent
            </p>
          </div>
          <div
            style={{
              transition: "all 0.3s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            <span style={{ fontSize: "clamp(28px, 4vw, 32px)" }}>⚖️</span>
            <p
              style={{
                fontSize: "clamp(12px, 1vw, 14px)",
                color: "#888",
                marginTop: "5px",
              }}
            >
              Accountable
            </p>
          </div>
          <div
            style={{
              transition: "all 0.3s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            <span style={{ fontSize: "clamp(28px, 4vw, 32px)" }}>🤝</span>
            <p
              style={{
                fontSize: "clamp(12px, 1vw, 14px)",
                color: "#888",
                marginTop: "5px",
              }}
            >
              Responsive
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

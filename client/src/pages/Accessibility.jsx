import React from "react";
import { Link } from "react-router-dom";

const Accessibility = () => {
  const accessibilityFeatures = [
    {
      icon: "♿",
      title: "Keyboard Navigation",
      description:
        "All features of this portal can be accessed using keyboard navigation. Use the Tab key to navigate through interactive elements and Enter to activate buttons and links.",
    },
    {
      icon: "🔊",
      title: "Screen Reader Compatible",
      description:
        "Our portal is fully compatible with screen readers. All content is properly structured with semantic HTML elements, ARIA labels, and descriptive alt text for images.",
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description:
        "The portal is fully responsive and works seamlessly on all devices including desktops, tablets, and mobile phones. Content adapts to different screen sizes for optimal readability.",
    },
    {
      icon: "🔍",
      title: "Text Resize & Zoom",
      description:
        "You can resize text using your browser's zoom functionality (Ctrl + + / Ctrl + -). All text remains readable and content stays properly formatted at different zoom levels.",
    },
    {
      icon: "🎨",
      title: "High Contrast Mode",
      description:
        "The portal uses high contrast colors for better readability. Text and background colors are carefully chosen to ensure clear visibility for users with visual impairments.",
    },
    {
      icon: "📝",
      title: "Clear Language",
      description:
        "Content is written in clear, simple language. Technical terms are explained, and instructions are provided in an easy-to-understand format.",
    },
    {
      icon: "🖱️",
      title: "Large Click Targets",
      description:
        "All buttons, links, and interactive elements have large click/tap targets (minimum 44px) to accommodate users with motor impairments or those using touch devices.",
    },
    {
      icon: "⏱️",
      title: "Timeout Management",
      description:
        "Sessions have reasonable timeouts with warnings before expiry. Users are given ample time to complete tasks without being automatically logged out.",
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="bg-decor top-right"></div>
      <div className="bg-decor bottom-left"></div>

      <div className="page-container">
        <Link to="/" className="back-btn">
          ← Back to Home
        </Link>

        <div className="page-card">
          <div className="page-header">
            <div className="icon-wrapper">
              <span>♿</span>
            </div>
            <h1>Accessibility</h1>
            <p>We are committed to making our portal accessible to everyone</p>
            <div className="divider-line"></div>
          </div>

          <div className="accessibility-grid">
            {accessibilityFeatures.map((feature, index) => (
              <div key={index} className="accessibility-card">
                <span className="acc-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "30px",
              padding: "clamp(20px, 2.5vw, 30px)",
              background: "linear-gradient(135deg, #01411C, #1a6b3a)",
              borderRadius: "16px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                margin: 0,
              }}
            >
              📧 Need assistance? Contact our accessibility team at{" "}
              <strong style={{ color: "#F9A826" }}>
                sabahat_ghaznavi@yahoo.com
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;

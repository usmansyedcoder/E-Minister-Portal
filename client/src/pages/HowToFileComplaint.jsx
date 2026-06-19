import React from "react";
import { Link } from "react-router-dom";

const HowToFileComplaint = () => {
  const steps = [
    {
      number: "01",
      title: "Fill the Complaint Form",
      description:
        "Click on 'File a Complaint' button and fill in all required details including your name, contact information, and complaint details.",
      icon: "📝",
    },
    {
      number: "02",
      title: "Select Category & District",
      description:
        "Choose the appropriate category for your complaint (Healthcare, Education, Infrastructure, etc.) and select your district.",
      icon: "📋",
    },
    {
      number: "03",
      title: "Provide Detailed Description",
      description:
        "Write a clear and detailed description of your complaint. Include relevant dates, locations, and any supporting information.",
      icon: "✍️",
    },
    {
      number: "04",
      title: "Submit Your Complaint",
      description:
        "Review your information and submit the complaint. You will receive a confirmation with a tracking reference number.",
      icon: "✅",
    },
    {
      number: "05",
      title: "Track Your Complaint",
      description:
        "Use your tracking reference number to check the status of your complaint anytime through the portal.",
      icon: "🔍",
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
              <span>📋</span>
            </div>
            <h1>How to File a Complaint</h1>
            <p>
              Follow these simple steps to submit your complaint to the
              Minister's office
            </p>
            <div className="divider-line"></div>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.number} className="step-item">
                <div className="step-number">
                  <span className="step-icon">{step.icon}</span>
                  <span className="step-num">{step.number}</span>
                </div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
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
              💡 Have questions? Visit our{" "}
              <Link
                to="/faq"
                style={{
                  color: "#F9A826",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                FAQ page
              </Link>{" "}
              or contact us at 0312-9425477
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToFileComplaint;

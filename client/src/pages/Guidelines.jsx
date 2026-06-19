import React from "react";
import { Link } from "react-router-dom";

const Guidelines = () => {
  const guidelines = [
    {
      category: "📋 General Guidelines",
      items: [
        "Provide accurate and complete information in your complaint or suggestion",
        "Be respectful and professional in your communication",
        "Include relevant details such as dates, locations, and supporting documents",
        "Submit only genuine complaints and constructive suggestions",
        "Avoid using offensive or inappropriate language",
      ],
    },
    {
      category: "📝 Complaint Guidelines",
      items: [
        "Clearly describe the issue you are facing",
        "Specify the department or authority responsible",
        "Include any previous attempts to resolve the issue",
        "Attach supporting evidence if available (photos, documents, etc.)",
        "Provide your contact information for follow-up",
      ],
    },
    {
      category: "💡 Suggestion Guidelines",
      items: [
        "Focus on constructive and actionable ideas",
        "Explain the benefits of your suggestion",
        "Provide practical implementation steps if possible",
        "Suggest improvements for specific departments or services",
        "Share innovative solutions that can benefit the community",
      ],
    },
    {
      category: "🔒 Privacy & Security",
      items: [
        "Your personal information will be kept confidential",
        "Only authorized personnel will have access to your data",
        "Your complaint/suggestion will be handled with discretion",
        "You will receive updates via email or phone",
        "Data is stored securely and in compliance with privacy laws",
      ],
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
              <span>📖</span>
            </div>
            <h1>Guidelines</h1>
            <p>
              Follow these guidelines to ensure your complaint or suggestion is
              processed effectively
            </p>
            <div className="divider-line"></div>
          </div>

          <div className="guidelines-grid">
            {guidelines.map((section, index) => (
              <div key={index} className="guideline-section">
                <h3>{section.category}</h3>
                <ul>
                  {section.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="status-info-box">
            <p>
              📧 For more information, contact us at{" "}
              <strong style={{ color: "#01411C" }}>
                sabahat_ghaznavi@yahoo.com
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;

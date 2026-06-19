import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
              <span>🔒</span>
            </div>
            <h1>Privacy Policy</h1>
            <p>
              Your privacy is important to us. Learn how we protect your
              personal information
            </p>
            <div className="divider-line"></div>
          </div>

          <div className="terms-content">
            <div className="terms-section">
              <h3>1. Information We Collect</h3>
              <p>
                We collect personal information that you voluntarily provide
                when submitting a complaint or suggestion, including:
              </p>
              <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>CNIC number</li>
                <li>Address and district</li>
                <li>Complaint or suggestion details</li>
              </ul>
            </div>

            <div className="terms-section">
              <h3>2. How We Use Your Information</h3>
              <p>Your information is used to:</p>
              <ul>
                <li>Process and resolve your complaint or suggestion</li>
                <li>Communicate with you regarding updates</li>
                <li>Maintain records for transparency and accountability</li>
                <li>Improve government services and governance</li>
              </ul>
            </div>

            <div className="terms-section">
              <h3>3. Information Security</h3>
              <p>
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction. Your data is stored on secure
                servers with restricted access.
              </p>
            </div>

            <div className="terms-section">
              <h3>4. Data Retention</h3>
              <p>
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this privacy policy, unless a
                longer retention period is required or permitted by law.
              </p>
            </div>

            <div className="terms-section">
              <h3>5. Your Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>
                  Request deletion of your information (subject to legal
                  requirements)
                </li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </div>

            <div className="terms-section">
              <h3>6. Contact Us</h3>
              <p>
                If you have any questions or concerns about this Privacy Policy,
                please contact us:
              </p>
              <ul>
                <li>Phone: 0312-9425477</li>
                <li>Email: sabahat_ghaznavi@yahoo.com</li>
                <li>
                  Address: Agriculture Department, Peshawar, Khyber Pakhtunkhwa
                </li>
              </ul>
            </div>
          </div>

          <div className="terms-footer">
            <p>Last updated: December 18, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

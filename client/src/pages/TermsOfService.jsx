import React from "react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
              <span>📜</span>
            </div>
            <h1>Terms of Service</h1>
            <p>
              Please read these terms carefully before using the E-Minister
              Portal
            </p>
            <div className="divider-line"></div>
          </div>

          <div className="terms-content">
            <div className="terms-section">
              <h3>1. Acceptance of Terms</h3>
              <p>
                By using the E-Minister Portal, you agree to comply with and be
                bound by these Terms of Service. If you do not agree to these
                terms, please do not use the portal.
              </p>
            </div>

            <div className="terms-section">
              <h3>2. User Responsibilities</h3>
              <p>As a user of this portal, you agree to:</p>
              <ul>
                <li>Provide accurate and truthful information</li>
                <li>Submit genuine complaints and constructive suggestions</li>
                <li>
                  Not misuse the portal for fraudulent or malicious purposes
                </li>
                <li>Respect the privacy of others</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>

            <div className="terms-section">
              <h3>3. Content Guidelines</h3>
              <p>
                When submitting complaints or suggestions, you agree not to:
              </p>
              <ul>
                <li>Submit false, misleading, or inaccurate information</li>
                <li>Use offensive, abusive, or threatening language</li>
                <li>
                  Include personal information of others without their consent
                </li>
                <li>Submit content that violates any law or regulation</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </div>

            <div className="terms-section">
              <h3>4. Intellectual Property</h3>
              <p>
                All content on this portal, including text, graphics, logos, and
                software, is the property of the Government of Khyber
                Pakhtunkhwa and is protected by intellectual property laws. You
                may not reproduce, distribute, or create derivative works
                without explicit permission.
              </p>
            </div>

            <div className="terms-section">
              <h3>5. Limitation of Liability</h3>
              <p>
                The E-Minister Portal is provided "as is" without warranties of
                any kind. The Government of Khyber Pakhtunkhwa is not liable for
                any damages arising from the use of this portal.
              </p>
            </div>

            <div className="terms-section">
              <h3>6. Modifications to Terms</h3>
              <p>
                We reserve the right to modify these terms at any time. Changes
                will be effective immediately upon posting. Continued use of the
                portal constitutes acceptance of the modified terms.
              </p>
            </div>

            <div className="terms-section">
              <h3>7. Governing Law</h3>
              <p>
                These terms are governed by the laws of Pakistan and the
                Province of Khyber Pakhtunkhwa. Any disputes shall be resolved
                in the courts of Peshawar.
              </p>
            </div>

            <div className="terms-section">
              <h3>8. Contact Information</h3>
              <p>For questions about these terms, please contact:</p>
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

export default TermsOfService;

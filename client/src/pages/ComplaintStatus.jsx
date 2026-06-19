import React, { useState } from "react";
import { Link } from "react-router-dom";

const ComplaintStatus = () => {
  const [trackingId, setTrackingId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      setSubmitted(true);
    }
  };

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
              <span>🔍</span>
            </div>
            <h1>Track Complaint Status</h1>
            <p>
              Enter your complaint tracking number to check the current status
            </p>
            <div className="divider-line"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="track-form">
              <input
                type="text"
                className="track-input"
                placeholder="Enter tracking number (e.g., CMP-2024-001)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                required
              />
              <button type="submit" className="track-btn">
                Track Now
              </button>
            </div>
          </form>

          {submitted && (
            <div className="status-result">
              <div className="status-header">
                <div className="status-icon">✅</div>
                <div className="status-info">
                  <h4>Status: Under Review</h4>
                  <p>
                    Tracking ID: <strong>{trackingId}</strong> • Submitted on:
                    December 18, 2024
                  </p>
                </div>
                <div className="status-badge">In Progress</div>
              </div>
              <div className="status-details">
                <div className="detail-row">
                  <span>📅 Estimated resolution: 5-7 business days</span>
                  <span>📞 Need help? Call 0312-9425477</span>
                </div>
              </div>
            </div>
          )}

          <div className="status-info-box">
            <p>
              💡 You will receive a tracking number after submitting your
              complaint via email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintStatus;

import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";

import { toast } from "react-toastify";

const ComplaintStatus = () => {
  const [searchParams] = useSearchParams();
  const initialTracking = searchParams.get("tracking") || "";

  const [trackingId, setTrackingId] = useState(initialTracking);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Auto-search if tracking ID is provided in URL
  useEffect(() => {
    if (initialTracking) {
      // Small delay to ensure component is mounted
      const timer = setTimeout(() => {
        handleSubmit(new Event("submit"));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      toast.warning("Please enter a tracking ID");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.get(
        `${API_BASE_URL}/track?id=${trackingId.trim()}`,
      );

      if (response.data.success) {
        setResult({
          type: response.data.type,
          data: response.data.data,
        });
        toast.success(`${response.data.type} found!`);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("No complaint or suggestion found with this tracking ID");
        toast.error("Tracking ID not found");
      } else {
        setError("Error fetching status. Please try again.");
        toast.error("Error fetching status");
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: "⏳ Pending", color: "#f39c12" },
      approved: { label: "✅ Approved", color: "#27ae60" },
      rejected: { label: "❌ Rejected", color: "#e74c3c" },
    };
    return statusMap[status] || { label: status, color: "#95a5a6" };
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyTrackingId = (trackingId) => {
    navigator.clipboard
      .writeText(trackingId)
      .then(() => {
        toast.success("Tracking ID copied to clipboard!");
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = trackingId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Tracking ID copied to clipboard!");
      });
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
            <h1>Track Complaint / Suggestion Status</h1>
            <p>Enter your tracking number to check the current status</p>
            <div className="divider-line"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="track-form">
              <input
                type="text"
                className="track-input"
                placeholder="Enter tracking number (e.g., CMP-XXXX-XXXX or SUG-XXXX-XXXX)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                required
                disabled={loading}
              />
              <button type="submit" className="track-btn" disabled={loading}>
                {loading ? "Searching..." : "Track Now"}
              </button>
            </div>
          </form>

          {error && (
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                background: "#fde8e8",
                borderRadius: "12px",
                border: "1px solid #f5c6c6",
                textAlign: "center",
              }}
            >
              <p style={{ color: "#c0392b", margin: 0, fontWeight: "500" }}>
                {error}
              </p>
              <p style={{ color: "#666", fontSize: "14px", marginTop: "8px" }}>
                💡 Please check your tracking ID and try again
              </p>
            </div>
          )}

          {result && (
            <div className="status-result">
              <div className="status-header">
                <div className="status-icon">
                  {result.type === "complaint" ? "📋" : "💡"}
                </div>
                <div className="status-info">
                  <h4>
                    {result.type === "complaint" ? "Complaint" : "Suggestion"}{" "}
                    Status
                  </h4>
                  <p>
                    Tracking ID: <strong>{result.data.trackingId}</strong>
                    <button
                      onClick={() => copyTrackingId(result.data.trackingId)}
                      style={{
                        marginLeft: "10px",
                        padding: "2px 10px",
                        fontSize: "12px",
                        background: "none",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f0f0f0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                      }}
                    >
                      📋 Copy
                    </button>
                  </p>
                </div>
                <div
                  className="status-badge"
                  style={{
                    background: getStatusBadge(result.data.status).color,
                  }}
                >
                  {getStatusBadge(result.data.status).label}
                </div>
              </div>

              <div className="status-details">
                <div className="detail-row">
                  <span>
                    👤 <strong>Name:</strong> {result.data.citizenName}
                  </span>
                  <span>
                    📂 <strong>Category:</strong> {result.data.category}
                  </span>
                </div>
                <div className="detail-row" style={{ marginTop: "8px" }}>
                  <span>
                    📝 <strong>Subject:</strong> {result.data.subject}
                  </span>
                </div>
                {result.data.ministerRemarks && (
                  <div className="detail-row" style={{ marginTop: "8px" }}>
                    <span>
                      💬 <strong>Remarks:</strong> {result.data.ministerRemarks}
                    </span>
                  </div>
                )}
                <div className="detail-row" style={{ marginTop: "8px" }}>
                  <span>
                    📅 <strong>Submitted:</strong>{" "}
                    {formatDate(result.data.createdAt)}
                  </span>
                  <span>
                    🔄 <strong>Last Updated:</strong>{" "}
                    {formatDate(result.data.updatedAt)}
                  </span>
                </div>
                {result.data.resolvedDate && (
                  <div className="detail-row" style={{ marginTop: "8px" }}>
                    <span>
                      ✅ <strong>Resolved:</strong>{" "}
                      {formatDate(result.data.resolvedDate)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="status-info-box">
            <p>
              💡 You will receive a tracking number in your email after
              submitting a complaint or suggestion
            </p>
            <p style={{ marginTop: "8px", fontSize: "13px" }}>
              📧 Check your spam folder if you don't see the confirmation email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintStatus;

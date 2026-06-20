import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const API_URL = "/api";
  const [formData, setFormData] = useState({
    citizenName: "",
    email: "",
    phone: "",
    cnic: "",
    district: "",
    address: "",
    subject: "",
    description: "",
    category: "Other",
  });

  const [loading, setLoading] = useState(false);

  const districts = [
    "Abbottabad",
    "Bannu",
    "Battagram",
    "Buner",
    "Charsadda",
    "Dera Ismail Khan",
    "Hangu",
    "Haripur",
    "Karak",
    "Kohat",
    "Kohistan",
    "Lakki Marwat",
    "Lower Dir",
    "Malakand",
    "Mansehra",
    "Mardan",
    "Nowshera",
    "Peshawar",
    "Shangla",
    "Swabi",
    "Swat",
    "Tank",
    "Tor Ghar",
    "Upper Dir",
  ];

  const categories = [
    "Healthcare",
    "Education",
    "Infrastructure",
    "Agriculture",
    "Electricity",
    "Water",
    "Roads",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update the handleSubmit function in SubmitComplaint.jsx
  // Remove or comment out the API_URL variable
  // const API_URL = import.meta.env.VITE_API_URL || "/api";

  // In handleSubmit, use just '/api' for the path
  // In your handleSubmit function, use relative URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use absolute URL in production, relative in development
      const apiUrl = import.meta.env.PROD
        ? "https://e-minister-portal.vercel.app/api/complaints" // Your production URL
        : "/api/complaints";

      const response = await axios.post(apiUrl, formData);
      const trackingId = response.data.data.trackingId;

      toast.success(`✅ Complaint submitted successfully!`);
      toast.info(`📋 Your Tracking ID: ${trackingId}`);

      navigate(`/complaint-status?tracking=${trackingId}`);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit complaint",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "clamp(20px, 4vh, 40px) clamp(15px, 3vw, 30px)",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%)",
        position: "relative",
      }}
    >
      {/* Decorative Elements */}
      <div
        style={{
          position: "fixed",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(1, 65, 28, 0.05)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(249, 168, 38, 0.05)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Back Button */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#01411C",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "clamp(14px, 1vw, 16px)",
            marginBottom: "20px",
            padding: "8px 16px",
            borderRadius: "10px",
            transition: "all 0.3s ease",
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(249, 168, 38, 0.2)";
            e.currentTarget.style.transform = "translateX(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.8)";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          ← Back to Home
        </Link>

        {/* Main Card */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "clamp(25px, 4vw, 45px)",
            boxShadow:
              "0 20px 80px rgba(0, 0, 0, 0.08), 0 8px 32px rgba(0, 0, 0, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            animation: "fadeInUp 0.6s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(25px, 4vw, 35px)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #01411C, #1a6b3a)",
                padding: "15px",
                borderRadius: "50%",
                marginBottom: "15px",
                boxShadow: "0 8px 25px rgba(1, 65, 28, 0.2)",
              }}
            >
              <span
                style={{ fontSize: "clamp(32px, 4vw, 40px)", display: "block" }}
              >
                📋
              </span>
            </div>
            <h2
              style={{
                color: "#01411C",
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: "700",
                margin: "10px 0 5px 0",
              }}
            >
              File a Complaint
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              Submit your complaint directly to the Minister of Khyber
              Pakhtunkhwa
            </p>
            <div
              style={{
                width: "60px",
                height: "3px",
                background: "linear-gradient(90deg, #F9A826, #01411C)",
                margin: "12px auto 0 auto",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: "clamp(15px, 2vw, 20px)",
              }}
            >
              <div className="form-group">
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "6px",
                    color: "#01411C",
                    fontSize: "clamp(13px, 1vw, 14px)",
                  }}
                >
                  Full Name <span style={{ color: "#F9A826" }}>*</span>
                </label>
                <input
                  type="text"
                  name="citizenName"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.citizenName}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "clamp(14px, 1vw, 15px)",
                    transition: "all 0.3s ease",
                    background: "#f8f9fa",
                    outline: "none",
                    color: "#333",
                  }}
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

              <div className="form-group">
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "6px",
                    color: "#01411C",
                    fontSize: "clamp(13px, 1vw, 14px)",
                  }}
                >
                  Email <span style={{ color: "#F9A826" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "clamp(14px, 1vw, 15px)",
                    transition: "all 0.3s ease",
                    background: "#f8f9fa",
                    outline: "none",
                    color: "#333",
                  }}
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

              <div className="form-group">
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "6px",
                    color: "#01411C",
                    fontSize: "clamp(13px, 1vw, 14px)",
                  }}
                >
                  Phone Number <span style={{ color: "#F9A826" }}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="03XX-XXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "clamp(14px, 1vw, 15px)",
                    transition: "all 0.3s ease",
                    background: "#f8f9fa",
                    outline: "none",
                    color: "#333",
                  }}
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

              <div className="form-group">
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "6px",
                    color: "#01411C",
                    fontSize: "clamp(13px, 1vw, 14px)",
                  }}
                >
                  CNIC Number <span style={{ color: "#F9A826" }}>*</span>
                </label>
                <input
                  type="text"
                  name="cnic"
                  className="form-control"
                  placeholder="XXXXX-XXXXXXX-X"
                  value={formData.cnic}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "clamp(14px, 1vw, 15px)",
                    transition: "all 0.3s ease",
                    background: "#f8f9fa",
                    outline: "none",
                    color: "#333",
                  }}
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

              <div className="form-group">
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "6px",
                    color: "#01411C",
                    fontSize: "clamp(13px, 1vw, 14px)",
                  }}
                >
                  District <span style={{ color: "#F9A826" }}>*</span>
                </label>
                <select
                  name="district"
                  className="form-control"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "clamp(14px, 1vw, 15px)",
                    transition: "all 0.3s ease",
                    background: "#f8f9fa",
                    outline: "none",
                    color: "#333",
                    cursor: "pointer",
                  }}
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
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "6px",
                    color: "#01411C",
                    fontSize: "clamp(13px, 1vw, 14px)",
                  }}
                >
                  Category <span style={{ color: "#F9A826" }}>*</span>
                </label>
                <select
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "clamp(14px, 1vw, 15px)",
                    transition: "all 0.3s ease",
                    background: "#f8f9fa",
                    outline: "none",
                    color: "#333",
                    cursor: "pointer",
                  }}
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
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "5px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "6px",
                  color: "#01411C",
                  fontSize: "clamp(13px, 1vw, 14px)",
                }}
              >
                Address <span style={{ color: "#F9A826" }}>*</span>
              </label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Your complete address"
                value={formData.address}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "10px",
                  fontSize: "clamp(14px, 1vw, 15px)",
                  transition: "all 0.3s ease",
                  background: "#f8f9fa",
                  outline: "none",
                  color: "#333",
                }}
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

            <div className="form-group">
              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "6px",
                  color: "#01411C",
                  fontSize: "clamp(13px, 1vw, 14px)",
                }}
              >
                Subject <span style={{ color: "#F9A826" }}>*</span>
              </label>
              <input
                type="text"
                name="subject"
                className="form-control"
                placeholder="Brief subject of complaint"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "10px",
                  fontSize: "clamp(14px, 1vw, 15px)",
                  transition: "all 0.3s ease",
                  background: "#f8f9fa",
                  outline: "none",
                  color: "#333",
                }}
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

            <div className="form-group">
              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "6px",
                  color: "#01411C",
                  fontSize: "clamp(13px, 1vw, 14px)",
                }}
              >
                Description <span style={{ color: "#F9A826" }}>*</span>
              </label>
              <textarea
                name="description"
                className="form-control"
                rows={6}
                placeholder="Please describe your complaint in detail..."
                value={formData.description}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "10px",
                  fontSize: "clamp(14px, 1vw, 15px)",
                  transition: "all 0.3s ease",
                  background: "#f8f9fa",
                  outline: "none",
                  color: "#333",
                  resize: "vertical",
                  minHeight: "120px",
                  fontFamily: "inherit",
                }}
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

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "clamp(14px, 1.5vw, 18px)",
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
                marginTop: "10px",
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
                  Submitting...
                </span>
              ) : (
                "Submit Complaint"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
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
        
        input:hover, select:hover, textarea:hover {
          border-color: #F9A826 !important;
        }
      `}</style>
    </div>
  );
};

export default SubmitComplaint;

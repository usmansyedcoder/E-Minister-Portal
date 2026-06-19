import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const MinisterDashboard = () => {
  const { user } = useAuth();
  const API_URL = "/api";

  return (
    <div className="container">
      <div className="card card-green-border">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(12px, 2vw, 15px)",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "clamp(32px, 5vw, 40px)" }}>🏛️</span>
          <div>
            <h2
              style={{
                color: "var(--pakistan-green)",
                fontSize: "clamp(20px, 3vw, 28px)",
              }}
            >
              Minister Dashboard
            </h2>
            <p style={{ color: "#666", fontSize: "clamp(14px, 1.2vw, 16px)" }}>
              Welcome, <strong>{user?.name}</strong>! Manage complaints and
              suggestions from the citizens of KP.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "clamp(10px, 1.5vw, 15px)",
            marginBottom: "30px",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Link
            to="/minister-dashboard/complaints"
            className="btn btn-primary"
            style={{ flex: "1 1 auto", minWidth: "150px" }}
          >
            📝 View Complaints
          </Link>
          <Link
            to="/minister-dashboard/suggestions"
            className="btn btn-gold"
            style={{ flex: "1 1 auto", minWidth: "150px" }}
          >
            💡 View Suggestions
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<DashboardOverview API_URL={API_URL} />} />
          <Route
            path="/complaints"
            element={<ComplaintsList API_URL={API_URL} />}
          />
          <Route
            path="/suggestions"
            element={<SuggestionsList API_URL={API_URL} />}
          />
        </Routes>
      </div>
    </div>
  );
};

const DashboardOverview = ({ API_URL }) => {
  const [stats, setStats] = useState({ complaints: 0, suggestions: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [complaintsRes, suggestionsRes] = await Promise.all([
          axios.get(`${API_URL}/complaints/minister`),
          axios.get(`${API_URL}/suggestions/minister`),
        ]);

        setStats({
          complaints: complaintsRes.data.count,
          suggestions: suggestionsRes.data.count,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [API_URL]);

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <h3>Total Complaints</h3>
          <div className="number">{stats.complaints}</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-icon">💡</div>
          <h3>Total Suggestions</h3>
          <div className="number">{stats.suggestions}</div>
        </div>
      </div>
      <p style={{ textAlign: "center", color: "#888" }}>
        Select an option above to manage complaints or suggestions
      </p>
    </div>
  );
};

const ComplaintsList = ({ API_URL }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${API_URL}/complaints/minister`);
      setComplaints(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status, remarks = "") => {
    try {
      await axios.put(`${API_URL}/complaints/${id}/status`, {
        status,
        ministerRemarks: remarks || "Reviewed by Minister",
      });
      toast.success(`✅ Complaint ${status} successfully`);
      fetchComplaints();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", padding: "20px" }}>
        Loading complaints...
      </p>
    );

  return (
    <div>
      <h3
        style={{
          marginBottom: "20px",
          color: "var(--pakistan-green)",
          fontSize: "clamp(18px, 2vw, 22px)",
        }}
      >
        📝 Complaints
      </h3>
      {complaints.length === 0 ? (
        <p>No complaints submitted yet</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>District</th>
                <th>Category</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr key={complaint._id}>
                  <td>{index + 1}</td>
                  <td>{complaint.citizenName}</td>
                  <td>{complaint.district}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.subject}</td>
                  <td>
                    <span className={`badge badge-${complaint.status}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td>
                    {complaint.status === "pending" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            handleStatusUpdate(complaint._id, "approved")
                          }
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            const remarks = prompt(
                              "Enter remarks for rejection:",
                            );
                            if (remarks !== null) {
                              handleStatusUpdate(
                                complaint._id,
                                "rejected",
                                remarks,
                              );
                            }
                          }}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                    {complaint.status !== "pending" && (
                      <span style={{ fontSize: "12px", color: "#888" }}>
                        {complaint.ministerRemarks}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const SuggestionsList = ({ API_URL }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const res = await axios.get(`${API_URL}/suggestions/minister`);
      setSuggestions(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch suggestions");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status, remarks = "") => {
    try {
      await axios.put(`${API_URL}/suggestions/${id}/status`, {
        status,
        ministerRemarks: remarks || "Reviewed by Minister",
      });
      toast.success(`✅ Suggestion ${status} successfully`);
      fetchSuggestions();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", padding: "20px" }}>
        Loading suggestions...
      </p>
    );

  return (
    <div>
      <h3
        style={{
          marginBottom: "20px",
          color: "var(--pakistan-gold)",
          fontSize: "clamp(18px, 2vw, 22px)",
        }}
      >
        💡 Suggestions
      </h3>
      {suggestions.length === 0 ? (
        <p>No suggestions submitted yet</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>District</th>
                <th>Category</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.map((suggestion, index) => (
                <tr key={suggestion._id}>
                  <td>{index + 1}</td>
                  <td>{suggestion.citizenName}</td>
                  <td>{suggestion.district}</td>
                  <td>{suggestion.category}</td>
                  <td>{suggestion.subject}</td>
                  <td>
                    <span className={`badge badge-${suggestion.status}`}>
                      {suggestion.status}
                    </span>
                  </td>
                  <td>
                    {suggestion.status === "pending" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            handleStatusUpdate(suggestion._id, "approved")
                          }
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            const remarks = prompt(
                              "Enter remarks for rejection:",
                            );
                            if (remarks !== null) {
                              handleStatusUpdate(
                                suggestion._id,
                                "rejected",
                                remarks,
                              );
                            }
                          }}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                    {suggestion.status !== "pending" && (
                      <span style={{ fontSize: "12px", color: "#888" }}>
                        {suggestion.ministerRemarks}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MinisterDashboard;

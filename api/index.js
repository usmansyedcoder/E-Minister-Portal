const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ CORS - Must be first
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Handle OPTIONS preflight
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection with caching
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    console.log("📦 Using cached connection");
    return cachedDb;
  }

  try {
    console.log("🔄 Connecting to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    cachedDb = conn;
    console.log("✅ MongoDB connected");
    return conn;
  } catch (error) {
    console.error("❌ MongoDB error:", error);
    throw error;
  }
}

// ✅ Simple in-memory models if MongoDB fails
let inMemoryComplaints = [];
let inMemorySuggestions = [];

// Generate tracking ID
const generateTrackingId = (prefix) => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// ============================================
// COMPLAINT ROUTES
// ============================================

app.post("/api/complaints", async (req, res) => {
  try {
    console.log("📥 Creating complaint:", req.body);

    // Try MongoDB first
    try {
      await connectToDatabase();
      const Complaint = require("../models/Complaint");
      const complaint = await Complaint.create(req.body);
      console.log("✅ Complaint created in MongoDB:", complaint.trackingId);
      return res.status(201).json({ success: true, data: complaint });
    } catch (dbError) {
      console.log("⚠️ MongoDB failed, using in-memory storage");
      // Fallback to in-memory
      const complaint = {
        ...req.body,
        trackingId: generateTrackingId("CMP"),
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryComplaints.push(complaint);
      console.log("✅ Complaint created in memory:", complaint.trackingId);
      return res.status(201).json({ success: true, data: complaint });
    }
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit complaint",
    });
  }
});

app.get("/api/complaints", async (req, res) => {
  try {
    try {
      await connectToDatabase();
      const Complaint = require("../models/Complaint");
      const complaints = await Complaint.find().sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: complaints.length,
        data: complaints,
      });
    } catch (dbError) {
      return res.json({
        success: true,
        count: inMemoryComplaints.length,
        data: inMemoryComplaints,
      });
    }
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/complaints/track/:trackingId", async (req, res) => {
  try {
    const trackingId = req.params.trackingId.toUpperCase();

    try {
      await connectToDatabase();
      const Complaint = require("../models/Complaint");
      const complaint = await Complaint.findOne({ trackingId });
      if (complaint) {
        return res.json({ success: true, data: complaint });
      }
    } catch (dbError) {
      // Check in-memory
      const complaint = inMemoryComplaints.find(
        (c) => c.trackingId === trackingId,
      );
      if (complaint) {
        return res.json({ success: true, data: complaint });
      }
    }

    return res
      .status(404)
      .json({ success: false, message: "Complaint not found" });
  } catch (error) {
    console.error("Error tracking complaint:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ============================================
// SUGGESTION ROUTES
// ============================================

app.post("/api/suggestions", async (req, res) => {
  try {
    console.log("📥 Creating suggestion:", req.body);

    try {
      await connectToDatabase();
      const Suggestion = require("../models/Suggestion");
      const suggestion = await Suggestion.create(req.body);
      console.log("✅ Suggestion created in MongoDB:", suggestion.trackingId);
      return res.status(201).json({ success: true, data: suggestion });
    } catch (dbError) {
      console.log("⚠️ MongoDB failed, using in-memory storage");
      const suggestion = {
        ...req.body,
        trackingId: generateTrackingId("SUG"),
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemorySuggestions.push(suggestion);
      console.log("✅ Suggestion created in memory:", suggestion.trackingId);
      return res.status(201).json({ success: true, data: suggestion });
    }
  } catch (error) {
    console.error("Error creating suggestion:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit suggestion",
    });
  }
});

app.get("/api/suggestions", async (req, res) => {
  try {
    try {
      await connectToDatabase();
      const Suggestion = require("../models/Suggestion");
      const suggestions = await Suggestion.find().sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: suggestions.length,
        data: suggestions,
      });
    } catch (dbError) {
      return res.json({
        success: true,
        count: inMemorySuggestions.length,
        data: inMemorySuggestions,
      });
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/suggestions/track/:trackingId", async (req, res) => {
  try {
    const trackingId = req.params.trackingId.toUpperCase();

    try {
      await connectToDatabase();
      const Suggestion = require("../models/Suggestion");
      const suggestion = await Suggestion.findOne({ trackingId });
      if (suggestion) {
        return res.json({ success: true, data: suggestion });
      }
    } catch (dbError) {
      const suggestion = inMemorySuggestions.find(
        (s) => s.trackingId === trackingId,
      );
      if (suggestion) {
        return res.json({ success: true, data: suggestion });
      }
    }

    return res
      .status(404)
      .json({ success: false, message: "Suggestion not found" });
  } catch (error) {
    console.error("Error tracking suggestion:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "E-Minister Portal API is running",
    environment: process.env.NODE_ENV || "production",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "E-Minister Portal API",
    endpoints: {
      health: "/api/health",
      complaints: "/api/complaints",
      suggestions: "/api/suggestions",
      track: "/api/complaints/track/:id",
    },
  });
});

// ✅ 404 handler
app.use((req, res) => {
  console.log(`❌ 404: ${req.method} ${req.url}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// ✅ Export for Vercel
module.exports = app;

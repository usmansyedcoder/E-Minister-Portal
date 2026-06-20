// This is the entry point for Vercel serverless functions
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config();

const app = express();

// ✅ CORS - Must be first
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
  }),
);

// ✅ Handle OPTIONS preflight
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Import models and connect to DB
const mongoose = require("mongoose");

// Global connection cache
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// ✅ Import route handlers
const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Suggestion = require("../models/Suggestion");

// ✅ Auth routes
app.post("/api/auth/login", async (req, res) => {
  try {
    await connectDB();
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/auth/me", async (req, res) => {
  try {
    await connectDB();
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
});

// ✅ Complaint routes
app.post("/api/complaints", async (req, res) => {
  try {
    await connectDB();
    console.log("📥 Received complaint:", req.body);

    const complaint = await Complaint.create(req.body);
    console.log("✅ Complaint created:", complaint.trackingId);

    res.status(201).json({
      success: true,
      data: complaint,
    });
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
    await connectDB();
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/complaints/track/:trackingId", async (req, res) => {
  try {
    await connectDB();
    const complaint = await Complaint.findOne({
      trackingId: req.params.trackingId.toUpperCase(),
    });

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.json({
      success: true,
      data: {
        trackingId: complaint.trackingId,
        citizenName: complaint.citizenName,
        subject: complaint.subject,
        category: complaint.category,
        status: complaint.status,
        ministerRemarks: complaint.ministerRemarks,
        createdAt: complaint.createdAt,
        updatedAt: complaint.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error tracking complaint:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Suggestion routes
app.post("/api/suggestions", async (req, res) => {
  try {
    await connectDB();
    console.log("📥 Received suggestion:", req.body);

    const suggestion = await Suggestion.create(req.body);
    console.log("✅ Suggestion created:", suggestion.trackingId);

    res.status(201).json({
      success: true,
      data: suggestion,
    });
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
    await connectDB();
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: suggestions.length,
      data: suggestions,
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/suggestions/track/:trackingId", async (req, res) => {
  try {
    await connectDB();
    const suggestion = await Suggestion.findOne({
      trackingId: req.params.trackingId.toUpperCase(),
    });

    if (!suggestion) {
      return res.status(404).json({
        success: false,
        message: "Suggestion not found",
      });
    }

    res.json({
      success: true,
      data: {
        trackingId: suggestion.trackingId,
        citizenName: suggestion.citizenName,
        subject: suggestion.subject,
        category: suggestion.category,
        status: suggestion.status,
        ministerRemarks: suggestion.ministerRemarks,
        createdAt: suggestion.createdAt,
        updatedAt: suggestion.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error tracking suggestion:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "E-Minister Portal API is running",
    environment: process.env.NODE_ENV || "production",
    timestamp: new Date().toISOString(),
  });
});

// ✅ Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "E-Minister Portal API",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth/login",
      complaints: "/api/complaints",
      suggestions: "/api/suggestions",
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

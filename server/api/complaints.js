const mongoose = require("mongoose");

// MongoDB Connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  try {
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

// Generate tracking ID
const generateTrackingId = (prefix) => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// In-memory storage (fallback)
let inMemoryComplaints = [];

module.exports = async (req, res) => {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // POST - Create complaint
    if (req.method === "POST") {
      console.log("📥 Creating complaint:", req.body);

      try {
        await connectToDatabase();
        const Complaint = require("../models/Complaint");
        const complaint = await Complaint.create(req.body);
        console.log("✅ Complaint created:", complaint.trackingId);
        return res.status(201).json({ success: true, data: complaint });
      } catch (dbError) {
        console.log("⚠️ MongoDB failed, using in-memory");
        const complaint = {
          ...req.body,
          trackingId: generateTrackingId("CMP"),
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        inMemoryComplaints.push(complaint);
        return res.status(201).json({ success: true, data: complaint });
      }
    }

    // GET - Get all complaints
    if (req.method === "GET") {
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
    }

    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

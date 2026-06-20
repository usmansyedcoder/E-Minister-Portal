const mongoose = require("mongoose");

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
    return conn;
  } catch (error) {
    throw error;
  }
}

// In-memory storage
let inMemoryComplaints = [];

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Get tracking ID from URL path
    const pathParts = req.url.split("/");
    const trackingId = pathParts[pathParts.length - 1].toUpperCase();

    console.log("🔍 Tracking complaint:", trackingId);

    try {
      await connectToDatabase();
      const Complaint = require("../models/Complaint");
      const complaint = await Complaint.findOne({ trackingId });
      if (complaint) {
        return res.json({ success: true, data: complaint });
      }
    } catch (dbError) {
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
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

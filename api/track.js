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

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Get tracking ID from query parameter
    const trackingId = req.query.id?.toUpperCase();

    if (!trackingId) {
      return res
        .status(400)
        .json({ success: false, message: "Tracking ID is required" });
    }

    console.log("🔍 Tracking ID:", trackingId);

    // Determine if it's a complaint or suggestion by prefix
    const isComplaint = trackingId.startsWith("CMP");
    const isSuggestion = trackingId.startsWith("SUG");

    if (!isComplaint && !isSuggestion) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid tracking ID format" });
    }

    try {
      await connectToDatabase();

      if (isComplaint) {
        const Complaint = require("../server/models/Complaint");
        const complaint = await Complaint.findOne({ trackingId });
        if (complaint) {
          return res.json({
            success: true,
            type: "complaint",
            data: complaint,
          });
        }
      } else if (isSuggestion) {
        const Suggestion = require("../server/models/Suggestion");
        const suggestion = await Suggestion.findOne({ trackingId });
        if (suggestion) {
          return res.json({
            success: true,
            type: "suggestion",
            data: suggestion,
          });
        }
      }
    } catch (dbError) {
      console.log("⚠️ MongoDB error:", dbError.message);
    }

    return res.status(404).json({ success: false, message: "Not found" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

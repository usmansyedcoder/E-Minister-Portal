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

let inMemorySuggestions = [];

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const pathParts = req.url.split("/");
    const trackingId = pathParts[pathParts.length - 1].toUpperCase();

    console.log("🔍 Tracking suggestion:", trackingId);

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
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

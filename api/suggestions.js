const mongoose = require("mongoose");
const Suggestion = require("../server/models/Suggestion");

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
let inMemorySuggestions = [];

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
    // POST - Create suggestion
    if (req.method === "POST") {
      console.log("📥 Creating suggestion:", req.body);

      try {
        await connectToDatabase();
        const suggestion = await Suggestion.create(req.body);
        console.log("✅ Suggestion created:", suggestion.trackingId);
        return res.status(201).json({ success: true, data: suggestion });
      } catch (dbError) {
        console.log("⚠️ MongoDB failed, using in-memory");
        const suggestion = {
          ...req.body,
          trackingId: generateTrackingId("SUG"),
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        inMemorySuggestions.push(suggestion);
        return res.status(201).json({ success: true, data: suggestion });
      }
    }

    // GET - Get all suggestions
    if (req.method === "GET") {
      try {
        await connectToDatabase();
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
    }

    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

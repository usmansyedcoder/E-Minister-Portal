// This single file handles ALL API routes
module.exports = async (req, res) => {
  // Set CORS headers
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

  // Get the path
  const url = req.url;
  console.log(`📥 ${req.method} ${url}`);

  // ============================================
  // HEALTH CHECK
  // ============================================
  if (url === "/api/health" || url === "/health") {
    return res.json({
      success: true,
      message: "E-Minister Portal API is running",
      timestamp: new Date().toISOString(),
    });
  }

  // ============================================
  // COMPLAINTS - POST /api/complaints
  // ============================================
  if (url === "/api/complaints" || url === "/complaints") {
    if (req.method === "POST") {
      try {
        console.log("📥 Creating complaint:", req.body);

        // Generate tracking ID
        const generateTrackingId = (prefix) => {
          const timestamp = Date.now().toString(36).toUpperCase();
          const random = Math.random()
            .toString(36)
            .substring(2, 6)
            .toUpperCase();
          return `${prefix}-${timestamp}-${random}`;
        };

        // Try MongoDB first
        try {
          const mongoose = require("mongoose");
          const Complaint = require("../server/models/Complaint");

          // Connect if not connected
          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              serverSelectionTimeoutMS: 5000,
            });
          }

          const complaint = await Complaint.create(req.body);
          console.log("✅ Complaint created:", complaint.trackingId);
          return res.status(201).json({ success: true, data: complaint });
        } catch (dbError) {
          console.log("⚠️ MongoDB error, using in-memory");

          // Fallback to in-memory
          const complaint = {
            ...req.body,
            trackingId: generateTrackingId("CMP"),
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          if (!global.complaints) global.complaints = [];
          global.complaints.push(complaint);

          return res.status(201).json({ success: true, data: complaint });
        }
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    if (req.method === "GET") {
      try {
        const mongoose = require("mongoose");
        const Complaint = require("../server/models/Complaint");

        if (mongoose.connection.readyState === 0) {
          await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
          });
        }

        const complaints = await Complaint.find().sort({ createdAt: -1 });
        return res.json({
          success: true,
          count: complaints.length,
          data: complaints,
        });
      } catch (dbError) {
        const complaints = global.complaints || [];
        return res.json({
          success: true,
          count: complaints.length,
          data: complaints,
        });
      }
    }
  }

  // ============================================
  // SUGGESTIONS - POST /api/suggestions
  // ============================================
  if (url === "/api/suggestions" || url === "/suggestions") {
    if (req.method === "POST") {
      try {
        console.log("📥 Creating suggestion:", req.body);

        const generateTrackingId = (prefix) => {
          const timestamp = Date.now().toString(36).toUpperCase();
          const random = Math.random()
            .toString(36)
            .substring(2, 6)
            .toUpperCase();
          return `${prefix}-${timestamp}-${random}`;
        };

        try {
          const mongoose = require("mongoose");
          const Suggestion = require("../server/models/Suggestion");

          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              serverSelectionTimeoutMS: 5000,
            });
          }

          const suggestion = await Suggestion.create(req.body);
          console.log("✅ Suggestion created:", suggestion.trackingId);
          return res.status(201).json({ success: true, data: suggestion });
        } catch (dbError) {
          console.log("⚠️ MongoDB error, using in-memory");

          const suggestion = {
            ...req.body,
            trackingId: generateTrackingId("SUG"),
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          if (!global.suggestions) global.suggestions = [];
          global.suggestions.push(suggestion);

          return res.status(201).json({ success: true, data: suggestion });
        }
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    if (req.method === "GET") {
      try {
        const mongoose = require("mongoose");
        const Suggestion = require("../server/models/Suggestion");

        if (mongoose.connection.readyState === 0) {
          await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
          });
        }

        const suggestions = await Suggestion.find().sort({ createdAt: -1 });
        return res.json({
          success: true,
          count: suggestions.length,
          data: suggestions,
        });
      } catch (dbError) {
        const suggestions = global.suggestions || [];
        return res.json({
          success: true,
          count: suggestions.length,
          data: suggestions,
        });
      }
    }
  }

  // ============================================
  // TRACK - GET /api/track?id=XXX
  // ============================================
  if (url.startsWith("/api/track") || url.startsWith("/track")) {
    if (req.method === "GET") {
      try {
        // Parse query string
        const urlParams = new URLSearchParams(url.split("?")[1] || "");
        const trackingId = urlParams.get("id")?.toUpperCase();

        if (!trackingId) {
          return res
            .status(400)
            .json({ success: false, message: "Tracking ID is required" });
        }

        console.log("🔍 Searching for:", trackingId);

        // Check if it's a complaint or suggestion
        const isComplaint = trackingId.startsWith("CMP");
        const isSuggestion = trackingId.startsWith("SUG");

        if (!isComplaint && !isSuggestion) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid tracking ID format" });
        }

        // Try MongoDB first
        try {
          const mongoose = require("mongoose");

          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              serverSelectionTimeoutMS: 5000,
            });
          }

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
          console.log("⚠️ MongoDB error, checking in-memory");
        }

        // Check in-memory
        if (isComplaint) {
          const complaints = global.complaints || [];
          const complaint = complaints.find((c) => c.trackingId === trackingId);
          if (complaint) {
            return res.json({
              success: true,
              type: "complaint",
              data: complaint,
            });
          }
        } else if (isSuggestion) {
          const suggestions = global.suggestions || [];
          const suggestion = suggestions.find(
            (s) => s.trackingId === trackingId,
          );
          if (suggestion) {
            return res.json({
              success: true,
              type: "suggestion",
              data: suggestion,
            });
          }
        }

        return res.status(404).json({ success: false, message: "Not found" });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: error.message });
      }
    }
  }

  // ============================================
  // 404 - Not Found
  // ============================================
  console.log(`❌ 404: ${req.method} ${url}`);
  return res.status(404).json({
    success: false,
    message: `Route ${req.method} ${url} not found`,
    available: {
      health: "/api/health",
      complaints: "/api/complaints (POST, GET)",
      suggestions: "/api/suggestions (POST, GET)",
      track: "/api/track?id=YOUR_ID",
    },
  });
};

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only handle GET requests
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Use GET.",
    });
  }

  try {
    // Get tracking ID from query parameter
    const trackingId = req.query.id?.toUpperCase();

    if (!trackingId) {
      return res.status(400).json({
        success: false,
        message: "Tracking ID is required",
      });
    }

    console.log("🔍 Searching for:", trackingId);

    // Search in memory storage
    let found = null;
    let type = "";

    // Check complaints
    if (global.complaints) {
      found = global.complaints.find((c) => c.trackingId === trackingId);
      if (found) type = "complaint";
    }

    // Check suggestions if not found
    if (!found && global.suggestions) {
      found = global.suggestions.find((s) => s.trackingId === trackingId);
      if (found) type = "suggestion";
    }

    if (!found) {
      return res.status(404).json({
        success: false,
        message: "No complaint or suggestion found with this tracking ID",
      });
    }

    // Return the found item
    return res.json({
      success: true,
      type: type,
      data: found,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to track",
    });
  }
};

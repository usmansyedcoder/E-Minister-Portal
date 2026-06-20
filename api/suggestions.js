module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only handle POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Use POST.",
    });
  }

  try {
    console.log("📥 Received suggestion:", req.body);

    // Generate a tracking ID
    const generateTrackingId = () => {
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      return `SUG-${timestamp}-${random}`;
    };

    // Create suggestion object
    const suggestion = {
      ...req.body,
      trackingId: generateTrackingId(),
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store in memory
    if (!global.suggestions) {
      global.suggestions = [];
    }
    global.suggestions.push(suggestion);

    console.log("✅ Suggestion created:", suggestion.trackingId);

    return res.status(201).json({
      success: true,
      data: suggestion,
      message: "Suggestion submitted successfully!",
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit suggestion",
    });
  }
};

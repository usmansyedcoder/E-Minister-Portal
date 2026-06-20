// Simple handler that works on Vercel
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only handle POST requests for now
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Use POST.",
    });
  }

  try {
    console.log("📥 Received complaint:", req.body);

    // Generate a tracking ID
    const generateTrackingId = () => {
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      return `CMP-${timestamp}-${random}`;
    };

    // Create complaint object
    const complaint = {
      ...req.body,
      trackingId: generateTrackingId(),
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store in memory (or try MongoDB if available)
    if (!global.complaints) {
      global.complaints = [];
    }
    global.complaints.push(complaint);

    console.log("✅ Complaint created:", complaint.trackingId);

    // Return success response
    return res.status(201).json({
      success: true,
      data: complaint,
      message: "Complaint submitted successfully!",
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit complaint",
    });
  }
};

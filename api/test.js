module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Return success
  res.json({
    success: true,
    message: "Test API is working!",
    method: req.method,
    url: req.url,
    body: req.body,
    timestamp: new Date().toISOString(),
  });
};

// api/index.js - This is the ONLY API file you need
module.exports = async (req, res) => {
  // CORS headers
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

  console.log(`📥 ${req.method} ${req.url}`);

  // SIMPLE TEST - Always return success for any request
  // This will help us debug if the API is reachable
  return res.json({
    success: true,
    message: "API is working!",
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString(),
  });
};

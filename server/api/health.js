module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  res.json({
    success: true,
    message: "E-Minister Portal API is running",
    environment: process.env.NODE_ENV || "production",
    timestamp: new Date().toISOString(),
  });
};

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

const app = express();

// ✅ VERCEL OPTIMIZED CORS - MUST COME FIRST
app.use((req, res, next) => {
  // Get the origin from the request
  const origin = req.headers.origin;

  // Allow all origins for now (since we're debugging)
  // In production, restrict to specific origins
  const allowedOrigins = [
    "https://e-minister-portal.vercel.app",
    "https://e-minister-portal-53fw-3dkih3dlk.vercel.app",
    "https://e-minister-portal-53fw-jya9gkmdg.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
  ];

  // Allow the request if origin is in our list or if it's a same-origin request
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (origin) {
    // For debugging - allow all origins
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  // Set other CORS headers
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept",
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400"); // 24 hours

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    console.log("✅ OPTIONS request handled for:", origin);
    return res.sendStatus(200);
  }

  next();
});

// Connect to database
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/complaints", require("./routes/complaints"));
    app.use("/api/suggestions", require("./routes/suggestions"));

    // Root route
    app.get("/", (req, res) => {
      res.json({
        message: "E-Minister Portal API is running",
        environment: process.env.NODE_ENV,
        cors: "enabled",
      });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error("❌ Error:", err.stack);
      res.status(500).json({ message: "Something went wrong!" });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

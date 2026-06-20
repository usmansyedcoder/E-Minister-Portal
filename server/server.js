const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

const app = express();

// ✅ CORS configuration - MUST come before routes
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

// ✅ Handle preflight requests explicitly
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept",
  );
  res.sendStatus(200);
});

// ✅ Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Database connection for Vercel (cached)
let cachedConnection = null;

const connectToDatabase = async () => {
  if (cachedConnection) {
    console.log("📦 Using cached database connection");
    return cachedConnection;
  }

  try {
    console.log("🔄 Connecting to MongoDB...");
    const conn = await connectDB();
    cachedConnection = conn;
    console.log("✅ Database connected successfully");
    return conn;
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw error;
  }
};

// ✅ Health check route (for debugging)
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "E-Minister Portal API is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// ✅ Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "E-Minister Portal API is running",
    environment: process.env.NODE_ENV || "development",
    endpoints: {
      auth: "/api/auth",
      complaints: "/api/complaints",
      suggestions: "/api/suggestions",
      health: "/api/health",
    },
  });
});

// ✅ Import routes AFTER middleware
const authRoutes = require("./routes/auth");
const complaintRoutes = require("./routes/complaints");
const suggestionRoutes = require("./routes/suggestions");

// ✅ Use routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/suggestions", suggestionRoutes);

// ✅ 404 handler
app.use((req, res) => {
  console.log(`❌ 404: ${req.method} ${req.url} not found`);
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ✅ For Vercel serverless - export app
module.exports = app;

// ✅ For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  const startServer = async () => {
    try {
      await connectToDatabase();
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🌐 http://localhost:${PORT}`);
        console.log(`📋 API endpoints:`);
        console.log(`   - Health: http://localhost:${PORT}/api/health`);
        console.log(`   - Auth: http://localhost:${PORT}/api/auth`);
        console.log(`   - Complaints: http://localhost:${PORT}/api/complaints`);
        console.log(
          `   - Suggestions: http://localhost:${PORT}/api/suggestions`,
        );
      });
    } catch (error) {
      console.error("❌ Failed to start server:", error);
      process.exit(1);
    }
  };

  startServer();
}

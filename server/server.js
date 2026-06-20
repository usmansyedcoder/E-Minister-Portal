const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

const app = express();

// ✅ CORS configuration
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  }),
);

// ✅ Handle preflight requests
app.options("*", cors());

// Connect to database (for serverless, don't block on connection)
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;
  try {
    await connectDB();
    isConnected = true;
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "E-Minister Portal API is running",
    environment: process.env.NODE_ENV,
  });
});

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/complaints", require("./routes/complaints"));
app.use("/api/suggestions", require("./routes/suggestions"));

// ✅ Root route
app.get("/", (req, res) => {
  res.json({
    message: "E-Minister Portal API is running",
    environment: process.env.NODE_ENV,
    cors: "enabled",
  });
});

// ✅ 404 handler
app.use((req, res) => {
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

// ✅ For Vercel serverless
module.exports = app;

// ✅ For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 http://localhost:${PORT}`);
    });
  };

  startServer();
}

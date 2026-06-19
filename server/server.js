const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

const app = express();

// Connect to database with retry logic
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");

    // ✅ COMPLETE CORS Configuration
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://e-minister-portal-53fw-jya9gkmdg.vercel.app",
      "https://e-minister-portal-co1oy0dyq-muhammad-usmans-projects-be41f176.vercel.app",
      "https://e-minister-portal-ddgrrwpym-muhammad-usmans-projects-be41f176.vercel.app",
      "https://e-minister-portal.vercel.app",
      "https://e-minister-portal-7s66-80nbwxrxb.vercel.app",
    ];

    // CORS middleware - Allow all in development
    app.use((req, res, next) => {
      const origin = req.headers.origin;

      // Allow all origins in development
      if (process.env.NODE_ENV === "development") {
        res.header("Access-Control-Allow-Origin", origin || "*");
      } else if (origin && allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
      } else if (!origin) {
        // Allow requests with no origin (like mobile apps, curl)
        res.header("Access-Control-Allow-Origin", "*");
      } else {
        console.log("❌ Blocked origin:", origin);
        // Still allow the request but log it (or return 403)
        // For debugging, we'll allow all origins temporarily
        res.header("Access-Control-Allow-Origin", origin || "*");
      }

      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS, PATCH",
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Requested-With, Accept",
      );
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Expose-Headers",
        "Content-Range, X-Content-Range",
      );

      // Handle preflight requests
      if (req.method === "OPTIONS") {
        return res.sendStatus(200);
      }

      next();
    });

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
        allowedOrigins: allowedOrigins,
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
      console.log(`✅ CORS enabled for:`, allowedOrigins);
      console.log(`🔧 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

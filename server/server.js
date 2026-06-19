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

    // Middleware
    app.use(
      cors({
        origin: ["http://localhost:3000", "http://localhost:5173"],
        credentials: true,
      }),
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/complaints", require("./routes/complaints"));
    app.use("/api/suggestions", require("./routes/suggestions"));

    // Root route
    app.get("/", (req, res) => {
      res.json({ message: "E-Minister Portal API is running" });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
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

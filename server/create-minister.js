const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

async function createMinister() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Check if minister already exists
    const existingUser = await User.findOne({ email: "minister@kp.gov.pk" });
    if (existingUser) {
      console.log("⚠️ Minister account already exists");
      console.log("📧 Email: minister@kp.gov.pk");
      console.log("🔑 Password: minister123");
      await mongoose.disconnect();
      return;
    }

    // Create minister account
    const minister = new User({
      name: "Minister KP",
      email: "minister@kp.gov.pk",
      password: "minister123",
      role: "minister",
    });

    await minister.save();
    console.log("✅ Minister account created successfully!");
    console.log("📧 Email: minister@kp.gov.pk");
    console.log("🔑 Password: minister123");
    console.log("👤 Role: minister");

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error:", error.message);
    await mongoose.disconnect();
  }
}

createMinister();

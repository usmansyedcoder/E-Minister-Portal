const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔄 Connecting to MongoDB Atlas...");

    const uri = process.env.MONGODB_URI;

    // Mask password in logs
    const maskedUri = uri.replace(/:[^:@]*@/, ":****@");
    console.log("📡 Connection URI:", maskedUri);

    // Add DNS resolution options
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4 (helps with DNS issues)
      retryWrites: true,
      w: "majority",
    });

    console.log(`✅ MongoDB Atlas Connected Successfully!`);
    console.log(`📊 Database: ${conn.connection.db.databaseName}`);
    console.log(`🖥️  Host: ${conn.connection.host}`);
    console.log(`🔢 Port: ${conn.connection.port}`);

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);

    if (error.message.includes("querySrv ECONNREFUSED")) {
      console.log("\n🔧 DNS Resolution Issue Detected!");
      console.log("This is a network/DNS problem on your computer.");
      console.log("\n💡 Solutions:");
      console.log("1. Use the standard connection string (without +srv)");
      console.log("2. Flush DNS cache:");
      console.log("   - Windows: ipconfig /flushdns");
      console.log("   - macOS: sudo dscacheutil -flushcache");
      console.log("   - Linux: sudo systemctl restart systemd-resolved");
      console.log("3. Try using Google DNS (8.8.8.8)");
      console.log("4. Restart your router/network");
      console.log("5. Wait a few minutes and retry");
    } else if (error.message.includes("whitelist")) {
      console.log("\n🔓 IP Whitelist Required:");
      console.log("1. Go to https://cloud.mongodb.com");
      console.log('2. Click "Network Access"');
      console.log("3. Add IP Address → Allow Access from Anywhere (0.0.0.0/0)");
      console.log("4. Wait 1-2 minutes for changes");
    }

    process.exit(1);
  }
};

module.exports = connectDB;

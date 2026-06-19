const mongoose = require("mongoose");
const dns = require("dns");
const net = require("net");
require("dotenv").config();

async function networkTest() {
  console.log("🌐 NETWORK DIAGNOSTIC TOOL");
  console.log("==========================\n");

  // 1. DNS Resolution Test
  console.log("1️⃣ Testing DNS Resolution...");
  const hostname = "cluster0.exa3b68.mongodb.net";
  try {
    const addresses = await dns.promises.resolve(hostname);
    console.log(`✅ DNS resolved ${hostname} to:`, addresses);
  } catch (error) {
    console.error(`❌ DNS Resolution Failed:`, error.message);
    console.log("   💡 This is likely a network issue. Try:");
    console.log("   - Restart your router");
    console.log("   - Use a different network (e.g., mobile hotspot)");
    console.log("   - Flush DNS: ipconfig /flushdns");
    return;
  }

  // 2. Port Connectivity Test
  console.log("\n2️⃣ Testing Port Connectivity (27017)...");
  const testSocket = net.createConnection(
    27017,
    "cluster0.exa3b68.mongodb.net",
  );
  testSocket.setTimeout(5000);

  const portTest = new Promise((resolve) => {
    testSocket.on("connect", () => {
      console.log("✅ Port 27017 is reachable");
      testSocket.destroy();
      resolve(true);
    });
    testSocket.on("timeout", () => {
      console.error("❌ Connection timed out on port 27017");
      testSocket.destroy();
      resolve(false);
    });
    testSocket.on("error", (error) => {
      console.error(`❌ Port test failed: ${error.message}`);
      testSocket.destroy();
      resolve(false);
    });
  });

  const portReachable = await portTest;
  if (!portReachable) {
    console.log("\n💡 Your network or firewall is blocking the connection.");
    console.log("   Try connecting to a different network (mobile hotspot).");
    return;
  }

  // 3. Final MongoDB Connection Test
  console.log("\n3️⃣ Testing MongoDB Authentication...");
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Authentication Successful!");
    console.log(
      `📊 Connected to database: ${mongoose.connection.db.databaseName}`,
    );
    await mongoose.disconnect();
    console.log(
      "\n🎉 Your connection is working! Start your server with: nodemon server.js",
    );
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    console.log("\n🔍 Check these in MongoDB Atlas:");
    console.log(
      '1. Database Access: Ensure user "usmansyedpeshawar_db_user" exists',
    );
    console.log("2. Network Access: Verify 0.0.0.0/0 is active (it is)");
    console.log("3. Try resetting the user password in Atlas");
    console.log(
      "\n💡 If problem persists, your internet provider might be blocking Atlas.",
    );
    console.log("   Try using a VPN or mobile hotspot.");
  }
}

networkTest();

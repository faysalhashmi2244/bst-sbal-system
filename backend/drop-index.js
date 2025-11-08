const mongoose = require("mongoose");

async function dropIndex() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/sbal-system",
    );
    console.log("Connected to MongoDB");

    // Drop the sponsorWallet index
    try {
      await mongoose.connection.db
        .collection("users")
        .dropIndex("sponsorWallet_1");
      console.log("sponsorWallet_1 index dropped successfully");
    } catch (error) {
      console.log("Index may not exist or already dropped:", error.message);
    }

    // Close connection
    await mongoose.connection.close();
    console.log("Connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

dropIndex();

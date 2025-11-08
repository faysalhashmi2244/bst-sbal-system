const mongoose = require("mongoose");
const User = require("./models/userModel");

async function migrateSponsorWallet() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/sbal-system",
    );
    console.log("Connected to MongoDB");

    // Find all users
    const allUsers = await User.find({});
    console.log(`Found ${allUsers.length} users in database`);

    // Create a map of userId to walletAddress for quick lookup
    const userMap = {};
    allUsers.forEach((user) => {
      userMap[user.userId] = user.walletAddress;
    });

    let updatedCount = 0;
    let skippedCount = 0;

    // Process each user
    for (const user of allUsers) {
      // Check if sponsorWallet field exists and has a value
      if (user.sponsorWallet !== undefined && user.sponsorWallet !== null) {
        console.log(
          `User ${user.userId} (${user.username}) already has sponsorWallet: ${user.sponsorWallet}`,
        );
        skippedCount++;
        continue;
      }

      let newSponsorWallet = "";

      // If sponsorId is 0 (root/admin), set empty string
      if (user.sponsorId === 0) {
        newSponsorWallet = "";
        console.log(
          `User ${user.userId} (${user.username}) is root user, setting sponsorWallet to empty string`,
        );
      } else {
        // Find sponsor's wallet address
        const sponsorWalletAddress = userMap[user.sponsorId];
        if (sponsorWalletAddress) {
          newSponsorWallet = sponsorWalletAddress;
          console.log(
            `User ${user.userId} (${user.username}) sponsor ID ${user.sponsorId} -> wallet: ${sponsorWalletAddress}`,
          );
        } else {
          console.log(
            `Warning: User ${user.userId} (${user.username}) has sponsorId ${user.sponsorId} but sponsor not found. Setting empty string.`,
          );
          newSponsorWallet = "";
        }
      }

      // Update the user
      await User.updateOne(
        { _id: user._id },
        { $set: { sponsorWallet: newSponsorWallet } },
      );

      updatedCount++;
      console.log(
        `✓ Updated user ${user.userId} (${user.username}) with sponsorWallet: "${newSponsorWallet}"`,
      );
    }

    console.log("\n=== Migration Summary ===");
    console.log(`Total users processed: ${allUsers.length}`);
    console.log(`Users updated: ${updatedCount}`);
    console.log(`Users skipped (already had sponsorWallet): ${skippedCount}`);
    console.log("Migration completed successfully!");

    // Close connection
    await mongoose.connection.close();
    console.log("Connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

// Run the migration
migrateSponsorWallet();

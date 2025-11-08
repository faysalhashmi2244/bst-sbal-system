const mongoose = require("mongoose");
const shortid = require("shortid");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  sponsorId: {
    type: Number,
    required: [true, "Sponsor ID is required"],
  },
  sponsorWallet: {
    type: String,
    index: {
      unique: true,
      partialFilterExpression: { sponsorWallet: { $ne: "" } },
    },
  },
  walletAddress: {
    type: String,
    required: [true, "Wallet address is required"],
    unique: true,
  },
  purchasedPackages: [
    {
      packageId: {
        type: Number,
        required: true,
      },
      packageName: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      transactionHash: {
        type: String,
        required: true,
      },
      purchaseDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to validate sponsor ID
userSchema.pre("save", async function (next) {
  // Skip validation if sponsorId is not modified
  if (!this.isModified("sponsorId")) return next();

  // Special case for admin (first user)
  if (this.sponsorId === 0) {
    return next();
  }

  // Check if sponsor exists in the database
  const sponsor = await this.constructor.findOne({ userId: this.sponsorId });

  if (!sponsor) {
    throw new Error("Invalid sponsor ID. Sponsor does not exist.");
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Register a new user
router.post("/register", userController.registerUser);

// Check if user exists by wallet address
router.post("/check", userController.checkUserExists);

// Check if sponsor exists
router.post("/check-sponsor", userController.checkSponsorExists);

// Check if wallet address is registered and get its user ID
router.get(
  "/check-wallet/:walletAddress",
  userController.checkWalletAddressAndGetUserId,
);

// Get user profile
router.get("/profile/:walletAddress", userController.getUserProfile);

// Get user's team (sponsored users)
router.get("/team/:walletAddress", userController.getUserTeam);

// Add purchased package
router.post("/package/purchase", userController.addPurchasedPackage);

// Get purchased packages
router.get("/packages/:walletAddress", userController.getPurchasedPackages);

// health check
router.get("/health", userController.getHealth);

module.exports = router;

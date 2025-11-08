const User = require("../models/userModel");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, sponsorId, sponsorAddress, walletAddress } = req.body;
    // console.log("req.body", req.body);

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already taken. Please choose a different username.",
      });
    }

    let sponsor = null;
    let finalSponsorId = 0; // Default sponsor ID
    let sponsorWallet = ""; // Default empty string for root sponsor

    // Check if sponsorAddress is provided
    if (sponsorAddress && sponsorAddress.startsWith("0x")) {
      // Find sponsor by wallet address
      sponsor = await User.findOne({ walletAddress: sponsorAddress });
      if (sponsor) {
        console.log("sponsor", sponsor);
        finalSponsorId = sponsor.userId;
        sponsorWallet = sponsor.walletAddress;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid sponsor address. Sponsor does not exist.",
        });
      }
    }
    // Check if sponsorId is provided
    else {
      // Convert sponsorId to number
      const numericSponsorId = parseInt(sponsorId);
      sponsor = await User.findOne({ userId: numericSponsorId });

      if (!sponsor) {
        return res.status(400).json({
          success: false,
          message: "Invalid sponsor ID. Sponsor does not exist.",
        });
      }

      finalSponsorId = numericSponsorId;
      sponsorWallet = sponsor.walletAddress;

      // Special case: 0 is valid for admin/root user
      if (numericSponsorId !== 0) {
        // Find sponsor by userId
        sponsor = await User.findOne({ userId: numericSponsorId });

        if (!sponsor) {
          return res.status(400).json({
            success: false,
            message: "Invalid sponsor ID. Sponsor does not exist.",
          });
        }

        // Set sponsorWallet after finding the sponsor
        sponsorWallet = sponsor.walletAddress;
      }
      // For sponsorId = 0, sponsorWallet remains empty string
    }
    // Otherwise use default sponsorId (0)

    // Find the highest userId in the database to generate the next sequential ID
    const highestUser = await User.findOne().sort({ userId: -1 });

    // Start from 0 if no users exist, otherwise increment from the highest userId
    const nextUserId = highestUser ? highestUser.userId + 1 : 0;

    // Create new user with the generated numeric userId and finalSponsorId
    const newUser = await User.create({
      userId: nextUserId,
      username,
      sponsorId: finalSponsorId,
      sponsorWallet,
      walletAddress,
    });

    res.status(201).json({
      success: true,
      data: {
        userId: newUser.userId,
        username: newUser.username,
        sponsorId: newUser.sponsorId,
        sponsorWallet: newUser.sponsorWallet,
        walletAddress: newUser.walletAddress,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error registering user",
    });
  }
};

// Check if user exists by wallet address
exports.checkUserExists = async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        message: "Wallet address is required",
      });
    }

    const user = await User.findOne({ walletAddress });

    if (user) {
      return res.status(200).json({
        success: true,
        exists: true,
        data: {
          userId: user.userId,
          username: user.username,
          sponsorId: user.sponsorId,
          sponsorWallet: user.sponsorWallet,
          walletAddress: user.walletAddress,
        },
      });
    } else {
      return res.status(200).json({
        success: true,
        exists: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error checking user",
    });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        message: "Wallet address is required",
      });
    }

    const user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        userId: user.userId,
        username: user.username,
        sponsorId: user.sponsorId,
        sponsorWallet: user.sponsorWallet,
        walletAddress: user.walletAddress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error retrieving user profile",
    });
  }
};

// Check if sponsor exists
exports.checkSponsorExists = async (req, res) => {
  try {
    const { sponsorId } = req.body;

    if (sponsorId === undefined) {
      return res.status(400).json({
        success: false,
        message: "Sponsor ID is required",
      });
    }

    // Convert to number
    const numericSponsorId = parseInt(sponsorId);

    // Special case: 0 is valid for admin/root user
    if (numericSponsorId === 0) {
      return res.status(200).json({
        success: true,
        exists: true,
        message: "Valid sponsor ID (root user)",
      });
    }

    // Check if sponsor exists in database
    const sponsor = await User.findOne({ userId: numericSponsorId });

    if (sponsor) {
      return res.status(200).json({
        success: true,
        exists: true,
        message: "Valid sponsor ID",
      });
    } else {
      return res.status(200).json({
        success: true,
        exists: false,
        message: "Sponsor ID does not exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error checking sponsor",
    });
  }
};

// Check if a wallet address is registered and get its user ID
exports.checkWalletAddressAndGetUserId = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress || !walletAddress.startsWith("0x")) {
      return res.status(400).json({
        success: false,
        message: "Valid wallet address is required",
      });
    }

    const user = await User.findOne({ walletAddress });

    if (user) {
      return res.status(200).json({
        success: true,
        exists: true,
        userId: user.userId,

        message: "Wallet address is registered",
      });
    } else {
      return res.status(200).json({
        success: true,
        exists: false,
        message: "Wallet address is not registered",
      });
    }
  } catch (error) {
    console.error("Error checking wallet address:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// health check
exports.getHealth = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      message: "Server is running successfully",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    },
  });
};

// Get user's team (sponsored users) as a multi-level tree structure
exports.getUserTeam = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const maxDepth = parseInt(req.query.depth) || 7; // Default to 7 levels (can be adjusted via query param)

    if (!walletAddress || !walletAddress.startsWith("0x")) {
      return res.status(400).json({
        success: false,
        message: "Valid wallet address is required",
      });
    }

    // Find the user by wallet address
    const user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get all users from the database for efficient tree building
    // This is more efficient than making multiple queries
    const allUsers = await User.find({})
      .select("userId username walletAddress sponsorId createdAt")
      .lean();

    // Create a map for faster lookups
    const userMap = {};
    allUsers.forEach((user) => {
      userMap[user.userId] = user;
      user.referrals = []; // Initialize referrals array for each user
    });

    // Build the referral tree structure
    allUsers.forEach((user) => {
      // Skip self-referencing relationships (where user is their own sponsor)
      if (userMap[user.sponsorId] && user.userId !== user.sponsorId) {
        userMap[user.sponsorId].referrals.push(user);
      }
    });

    // Helper function to count total team size at all levels
    const countTeamSize = (user, currentDepth = 1) => {
      if (currentDepth > maxDepth) return 0;

      let count = user.referrals.length;
      for (const referral of user.referrals) {
        count += countTeamSize(referral, currentDepth + 1);
      }
      return count;
    };

    // Helper function to limit tree depth for response
    const limitTreeDepth = (user, currentDepth = 1) => {
      if (currentDepth > maxDepth) return null;

      const result = { ...user };
      if (user.referrals && user.referrals.length > 0) {
        result.referrals = user.referrals
          .map((referral) => limitTreeDepth(referral, currentDepth + 1))
          .filter(Boolean)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first
      }
      return result;
    };

    // Get the user's tree with limited depth
    const userWithTree = limitTreeDepth(userMap[user.userId]);
    const totalTeamSize = countTeamSize(userMap[user.userId]);

    // Calculate statistics for each level
    const levelStats = [];
    const calculateLevelStats = (user, level = 1) => {
      if (level > maxDepth) return;

      if (!levelStats[level - 1]) {
        levelStats[level - 1] = { level, count: 0 };
      }

      levelStats[level - 1].count += user.referrals.length;

      for (const referral of user.referrals) {
        calculateLevelStats(referral, level + 1);
      }
    };

    calculateLevelStats(userMap[user.userId]);

    return res.status(200).json({
      success: true,
      data: {
        user: {
          userId: user.userId,
          username: user.username,
          walletAddress: user.walletAddress,
        },
        totalTeamSize,
        levelStats,
        referralTree: userWithTree.referrals || [],
      },
      message: "Referral tree retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching referral tree:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching referral tree",
    });
  }
};

// Add purchased package to user
exports.addPurchasedPackage = async (req, res) => {
  try {
    const { walletAddress, packageId, packageName, price, transactionHash } =
      req.body;

    if (
      !walletAddress ||
      !packageId ||
      !packageName ||
      !price ||
      !transactionHash
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Find user by wallet address
    const user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if package with same transaction hash already exists (prevent duplicates)
    const existingPackage = user.purchasedPackages.find(
      (pkg) => pkg.transactionHash === transactionHash,
    );

    if (existingPackage) {
      return res.status(400).json({
        success: false,
        message: "Package already recorded for this transaction",
      });
    }

    // Add new package to purchasedPackages array
    user.purchasedPackages.push({
      packageId,
      packageName,
      price,
      transactionHash,
      purchaseDate: new Date(),
    });

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        purchasedPackages: user.purchasedPackages,
      },
      message: "Package added successfully",
    });
  } catch (error) {
    console.error("Error adding purchased package:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error adding purchased package",
    });
  }
};

// Get purchased packages for a user
exports.getPurchasedPackages = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        message: "Wallet address is required",
      });
    }

    // Find user by wallet address
    const user = await User.findOne({ walletAddress }).select(
      "purchasedPackages userId username",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        userId: user.userId,
        username: user.username,
        purchasedPackages: user.purchasedPackages || [],
      },
      message: "Purchased packages retrieved successfully",
    });
  } catch (error) {
    console.error("Error getting purchased packages:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error retrieving purchased packages",
    });
  }
};

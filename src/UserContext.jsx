import React, { createContext, useContext, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import apiService from "./services/api";

// Create context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data when wallet is connected
  useEffect(() => {
    const fetchUserData = async () => {
      if (isConnected && address) {
        try {
          setLoading(true);
          setError(null);

          const response = await apiService.checkUserExists(address);

          if (response.exists) {
            // User exists, get full profile
            const profileResponse = await apiService.getUserProfile(address);
            if (profileResponse.success) {
              setUserData(profileResponse.data);
            }
          } else {
            // User doesn't exist
            setUserData(null);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data");
          setUserData(null);
        } finally {
          setLoading(false);
        }
      } else {
        // Not connected, clear user data
        setUserData(null);
      }
    };

    fetchUserData();
  }, [isConnected, address]);

  // Register a new user
  const registerUser = async (username, sponsorId, sponsorAddress) => {
    if (!isConnected || !address) {
      setError("Wallet not connected");
      return { success: false, message: "Wallet not connected" };
    }

    // Registration data to be sent to the API
    const registrationData = {
      username,
      walletAddress: address,
    };

    // Handle sponsor validation based on what's provided
    if (sponsorAddress && sponsorAddress.startsWith("0x")) {
      // Use sponsor address
      registrationData.sponsorAddress = sponsorAddress;
    } else if (sponsorId) {
      // Use sponsor ID
      // Ensure sponsorId is a number
      const numericSponsorId = parseInt(sponsorId);
      if (isNaN(numericSponsorId)) {
        setError("Sponsor ID must be a valid number");
        return { success: false, message: "Sponsor ID must be a valid number" };
      }

      registrationData.sponsorId = numericSponsorId;

      try {
        // Check if sponsor exists before proceeding
        const sponsorCheck =
          await apiService.checkSponsorExists(numericSponsorId);

        if (!sponsorCheck.exists) {
          setError("Invalid sponsor ID. This sponsor does not exist.");
          return {
            success: false,
            message: "Invalid sponsor ID. This sponsor does not exist.",
          };
        }
      } catch (err) {
        console.error("Error checking sponsor:", err);
        // Continue with registration attempt even if sponsor check fails
        // The backend will still validate the sponsor
      }
    } else {
      // Use default sponsor ID 0
      registrationData.sponsorId = 0;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await apiService.registerUser(registrationData);

      if (response.success) {
        setUserData(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.message || "Registration failed");
        return { success: false, message: response.message };
      }
    } catch (err) {
      const errorMessage = err.message || "Registration failed";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Login function for existing users
  const loginUser = async (walletAddress) => {
    if (!walletAddress) {
      setError("Wallet address is required");
      return { success: false, message: "Wallet address is required" };
    }

    try {
      setLoading(true);
      setError(null);

      // Check if user exists with this wallet address
      const response = await apiService.checkUserExists(walletAddress);

      if (response.exists) {
        // User exists, get full profile
        const profileResponse = await apiService.getUserProfile(walletAddress);
        if (profileResponse.success) {
          setUserData(profileResponse.data);
          return { success: true, data: profileResponse.data };
        } else {
          setError(profileResponse.message || "Failed to load user profile");
          return {
            success: false,
            message: profileResponse.message || "Failed to load user profile",
          };
        }
      } else {
        // User doesn't exist
        setError("User not registered with this wallet address");
        return {
          success: false,
          message: "User not registered with this wallet address",
        };
      }
    } catch (err) {
      const errorMessage = err.message || "Login failed";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUserData(null);
  };

  // health check
  const checkHealth = async () => {
    try {
      console.log("Calling health check endpoint...");
      const response = await apiService.getHealth();
      console.log("Health check response:", response);
    } catch (error) {
      console.warn("Error checking health:", error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: userData,
        isLoggedIn: !!userData,
        loading,
        error,
        registerUser,
        loginUser,
        logout,
        checkHealth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;

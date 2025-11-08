import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import {
  FaUser,
  FaArrowUp,
  FaDollarSign,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import NodePackagesABI from "../abi/NodePackagesABI.json";

import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { formatEther } from "viem";
import { useUser } from "../UserContext";
import Packages from "./Packages";

const Node_Packages_ADDRESS = "0x271d19C69fF93F9FaB2E35bcEb31A871A9d62657";

const Dashboard = ({ parms }) => {
  // console.log("Dashboard.jsx - Received parms prop:", parms);
  const { isConnected, address, chain } = useAccount();
  const { user, loading: userLoading } = useUser();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const [hoveredCard, setHoveredCard] = useState(null);
  // State for withdrawal modalXR
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  // Get user rewards
  const { data: userRewards, refetch: refetchUserRewards } = useReadContract({
    address: Node_Packages_ADDRESS,
    abi: NodePackagesABI,
    functionName: "userRewards",
    args: [address],
    chainId: chain?.id,
    enabled: !!address && isConnected,
  });
  // get referrer and level from perma links
  // Use parms prop if available, otherwise try to get from localStorage or URL
  const [referrerParams, setReferrerParams] = useState(parms);

  useEffect(() => {
    // If parms is provided, use it
    if (parms) {
      setReferrerParams(parms);
      // console.log("Dashboard.jsx - Using parms prop:", parms);
    } else {
      // Otherwise try to get from localStorage
      const savedRef = localStorage.getItem("referrerParam");
      if (savedRef) {
        setReferrerParams(savedRef);
        // console.log("Dashboard.jsx - Using ref from localStorage:", savedRef);
      } else {
        // As a last resort, try to get from URL
        const urlParams = new URLSearchParams(window.location.search);
        const refFromUrl = urlParams.get("ref");
        if (refFromUrl) {
          setReferrerParams(refFromUrl);
          // console.log("Dashboard.jsx - Using ref from URL:", refFromUrl);
        }
      }
    }
  }, [parms]);

  // console.log("Dashboard.jsx - Final referrerParams:", referrerParams);
  const handleWithdrawRewards = () => {
    setWithdrawAmount(Number(formatEther(userRewards || 0)).toFixed(2));
    setWithdrawError("");
    setShowWithdrawModal(true);
  };
  // Function to handle the actual withdrawal
  const processWithdrawal = () => {
    try {
      // Convert the input amount to the same format as userRewards (BigInt)

      const userRewardsFormatted = Number(
        formatEther(userRewards || 0),
      ).toFixed(2);

      // Check if the entered amount equal to or less than available rewards
      if (userRewardsFormatted < withdrawAmount) {
        setWithdrawError(
          "Amount must be less than or equal to your available rewards",
        );
        return;
      }
      // console.log("amountToWithdraw", amountToWithdraw);
      // console.log("userRewardsFormatted", userRewardsFormatted);
      // console.log("withdrawAmount", withdrawAmount);
      writeContract({
        args: [BigInt(withdrawAmount * 1e18)],
        address: Node_Packages_ADDRESS,
        abi: NodePackagesABI,
        functionName: "withdrawRewards",
        chainId: chain?.id,
      });

      // Close modal and refresh data
      setShowWithdrawModal(false);
      refetchUserRewards();
    } catch (err) {
      toast.error(err?.shortMessage || t("common.error"));
    }
  };
  // Toast notifications for transaction status
  useEffect(() => {
    if (isPending) {
      toast.loading(t("common.pending"), { id: "txn" });
    }
    if (isConfirming) {
      toast.loading(t("common.confirming"), { id: "txn" });

      refetchUserRewards();
    }
    if (isConfirmed) {
      toast.success(t("common.confirmed"), { id: "txn" });

      refetchUserRewards();
    }
    if (error) {
      toast.error(error?.shortMessage || t("common.error"), { id: "txn" });
    }
  }, [isPending, isConfirming, isConfirmed, error, t]);

  // console.log("user object:", user);
  // console.log("userId type:", user?.userId, typeof user?.userId);
  // console.log("sponsorId type:", user?.sponsorId, typeof user?.sponsorId);
  return (
    <>
      <div className="dashboard bg-cyber-dark min-h-screen text-white relative overflow-hidden ">
        {/* Background grid decoration */}
        <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>

        {/* Animated accent lines */}
        <div className="absolute left-0 top-0 w-1 h-full bg-green1/20"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-green1/20"></div>

        {/* Stats Cards */}
        <div className="container mx-auto max-w-7xl relative z-10 px-4">
          <div className="stats-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {/* User ID Card */}
            <div
              className="card relative overflow-hidden transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setHoveredCard("userId")}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background:
                  "linear-gradient(135deg, rgba(13,17,23,0.8) 0%, rgba(20,30,48,0.9) 100%)",
                clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
                border: "1px solid #0f0",
                boxShadow:
                  hoveredCard === "userId"
                    ? "0 0 15px rgba(0, 255, 0, 0.5)"
                    : "none",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-green1"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green1/10 rounded-tl-xl"></div>
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-green1 text-sm font-mono tracking-wider mb-1">
                      USER ID
                    </h3>
                    <p className="text-2xl font-bold font-future">
                      {userLoading ? (
                        <span className="text-sm opacity-70">Loading...</span>
                      ) : user?.userId !== undefined ? (
                        user?.userId === 0 ? (
                          user.userId
                        ) : (
                          user.userId
                        )
                      ) : (
                        <span className="text-sm opacity-70">
                          Not registered
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="bg-green1/20 rounded-full w-10 h-10 flex items-center justify-center">
                    <FaUser className="text-green1" />
                  </div>
                </div>
                {hoveredCard === "userId" && (
                  <div className="mt-3 pt-3 border-t border-green1/30 text-xs text-white/70 font-mono">
                    <p>Your unique identifier in the system</p>
                    {user?.username && (
                      <p className="mt-1">Username: {user.username}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Upline ID Card */}
            <div
              className="card relative overflow-hidden transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setHoveredCard("uplineId")}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background:
                  "linear-gradient(135deg, rgba(13,17,23,0.8) 0%, rgba(20,30,48,0.9) 100%)",
                clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
                border: "1px solid #0f0",
                boxShadow:
                  hoveredCard === "uplineId"
                    ? "0 0 15px rgba(0, 255, 0, 0.5)"
                    : "none",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-green1"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green1/10 rounded-tl-xl"></div>
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-green1 text-sm font-mono tracking-wider mb-1">
                      UPLINE ID
                    </h3>
                    <p className="text-2xl font-bold font-future">
                      {userLoading ? (
                        <span className="text-sm opacity-70">Loading...</span>
                      ) : // user?.sponsorId === 0  its mean Admin
                      user?.sponsorId !== undefined ? (
                        user?.sponsorId === 0 ? (
                          "Admin"
                        ) : (
                          user.sponsorId
                        )
                      ) : (
                        <span className="text-sm opacity-70">None</span>
                      )}
                    </p>
                  </div>
                  <div className="bg-green1/20 rounded-full w-10 h-10 flex items-center justify-center">
                    <FaArrowUp className="text-green1" />
                  </div>
                </div>
                {hoveredCard === "uplineId" && (
                  <div className="mt-3 pt-3 border-t border-green1/30 text-xs text-white/70 font-mono">
                    <p>Your affiliate ID in the network</p>
                    {user?.sponsorId === 0 && (
                      <p className="mt-1 text-green1">You are a root user</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* BST Income Card */}
            <div
              className="card relative overflow-hidden transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setHoveredCard("bstIncome")}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background:
                  "linear-gradient(135deg, rgba(13,17,23,0.8) 0%, rgba(20,30,48,0.9) 100%)",
                clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
                border: "1px solid #0f0",
                boxShadow:
                  hoveredCard === "bstIncome"
                    ? "0 0 15px rgba(0, 255, 0, 0.5)"
                    : "none",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-green1"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green1/10 rounded-tl-xl"></div>
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-green1 text-sm font-mono tracking-wider mb-1">
                      BST INCOME
                    </h3>
                    <p className="text-2xl font-bold font-future">
                      {Number(formatEther(userRewards || 0)).toFixed(2)} $
                    </p>
                  </div>
                  {userRewards > 0 && (
                    <button
                      onClick={handleWithdrawRewards}
                      className={`px-6 py-2 text-sm font-cyber uppercase tracking-wider transition-all duration-300 relative ${isDarkMode ? "bg-green1/20 text-white border-b-2 border-green1" : "bg-green1/20 text-cyber-dark border-b-2 border-green1"}`}
                    >
                      Withdraw
                    </button>
                  )}
                  <div className="bg-neon-green/20 rounded-full w-10 h-10 flex items-center justify-center">
                    <FaDollarSign className="text-neon-green" />
                  </div>
                </div>
                {hoveredCard === "bstIncome" && (
                  <div className="mt-3 pt-3 border-t border-neon-green/30 text-xs text-white/70 font-mono">
                    <p>Your total BST token earnings</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BST Matrix Section */}
        <div className="BST-matrix py-16 px-4 container mx-auto max-w-7xl relative z-10">
          {/* Pass the referrerParams to Packages component */}
          <Packages referrerParams={referrerParams} />
          {/* Real Packages from Blockchain */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredPackages?.map((pkg, index) => (
            <PackageCard
              id={Number(pkg.id)}
              key={index}
              level={Number(pkg.id)}
              name={pkg.name}
              price={formatEther(pkg.price || 0)}
              duration={pkg.duration?.toString() || 0} // 1728000 convert to days
              roi={Number(pkg.roiPercentage) / 100} // 2100 convert to percentage
              color={colors[Number(pkg.id) % colors.length]}
              popular={pkg.popular}
              userRewards={userRewards}
              isActive={pkg.isActive}
              refetchUserRewards={refetchUserRewards}
              refetchAllNodes={refetchAllNodes}
              refetchAllowance={refetchAllowance}
              onClick={() => setSelectedPackage(pkg)}
              allowance={allowance}
            />
          ))}
        </div> */}
        </div>
      </div>
      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70">
          <div
            className={`relative w-full max-w-md p-6 ${isDarkMode ? "bg-cyber-black" : "bg-white"} rounded-lg`}
            style={{
              border: `2px solid ${isDarkMode ? "#0f0" : "#00ff9d"}`,
              boxShadow: `0 0 20px ${isDarkMode ? "rgba(0, 255, 0, 0.5)" : "rgba(0, 255, 157, 0.5)"}`,
            }}
          >
            <button
              onClick={() => setShowWithdrawModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes size={20} />
            </button>

            <h3
              className={`text-xl font-bold mb-4 ${isDarkMode ? "text-green1" : "text-green1"}`}
              style={{
                textShadow: `0 0 5px ${isDarkMode ? "rgba(0, 255, 0, 0.5)" : "rgba(0, 255, 157, 0.5)"}`,
              }}
            >
              Withdraw Rewards
            </h3>

            <div className="mb-4">
              <label
                className={`block mb-2 text-sm font-medium ${isDarkMode ? "text-white/80" : "text-cyber-dark/80"}`}
              >
                Available Rewards: $
                {Number(formatEther(userRewards || 0)).toFixed(2)} BST
              </label>

              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => {
                  setWithdrawAmount(e.target.value);
                  setWithdrawError("");
                }}
                className={`w-full p-3 rounded-md ${isDarkMode ? "bg-cyber-dark/50 text-white" : "bg-cyber-light/50 text-cyber-dark"} border ${withdrawError ? "border-red-500" : isDarkMode ? "border-green1/30" : "border-green1/30"}`}
                placeholder="Enter amount to withdraw"
              />

              {withdrawError && (
                <p className="mt-2 text-sm text-red-500">{withdrawError}</p>
              )}

              <p
                className={`mt-2 text-xs ${isDarkMode ? "text-white/60" : "text-cyber-dark/60"}`}
              >
                Note: You must withdraw your full reward amount
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className={`px-4 py-2 mr-2 text-sm font-medium rounded-md ${isDarkMode ? "bg-cyber-dark/50 text-white/80" : "bg-cyber-light/50 text-cyber-dark/80"}`}
              >
                Cancel
              </button>

              <button
                onClick={processWithdrawal}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${isDarkMode ? "bg-green1/20 text-white border-b-2 border-green1" : "bg-green1/20 text-cyber-dark border-b-2 border-green1"}`}
              >
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

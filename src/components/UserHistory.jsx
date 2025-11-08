import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import BackgroundEffects from "./BackgroundEffects";
import apiService from "../services/api";
import { formatEther } from "viem";

const UserHistory = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const { address, isConnected, isConnecting } = useAccount();
  const [userEventsLoading, setUserEventsLoading] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [eventsSummary, setEventsSummary] = useState(null);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [selectedUserAddress, setSelectedUserAddress] = useState(null);
  const [level, setLevel] = useState(null);

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all events when component mounts
  useEffect(() => {
    fetchAllEvents();
    fetchUserEvents(address);
  }, []);

  // Fetch user events when address changes
  useEffect(() => {
    if (isConnected && address) {
      fetchUserEvents(address);
    }
  }, [isConnected, address]);

  const fetchAllEvents = async () => {
    try {
      setEventsLoading(true);
      const [eventsResponse, summaryResponse] = await Promise.all([
        apiService.getEvents(1, 1000),
        apiService.getEventsSummary(),
      ]);

      setAllEvents(eventsResponse.events);
      // console.log("Fetching events...", eventsResponse.events);
      setEventsSummary(summaryResponse);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error",
        description: "Failed to fetch events from API",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setEventsLoading(false);
    }
  };

  const fetchUserEvents = async (userAddress) => {
    try {
      setUserEventsLoading(true);
      setSelectedUserAddress(userAddress);
      setIsLoading(true);
      const response = await apiService.getUserEvents(userAddress, 1, 100);
      setUserEvents(response.events);
      // console.log("Fetching user events...", response.events);
      toast.success(
        t("userHistory.eventsFound", {
          count: response.events.length,
          defaultValue: `Found ${response.events.length} logs for this user. please wait for the loading to finish.`,
        }),
      );
    } catch (error) {
      console.error("Error fetching user events:", error);
      setIsLoading(false);
      toast.error(t("userHistory.fetchError", "Failed to fetch user history"));
    } finally {
      setUserEventsLoading(false);
      setIsLoading(false);
    }
  };

  const refreshUserEvents = useCallback(async () => {
    if (!isConnected || !address) {
      toast.error(
        t(
          "userHistory.connectWalletPrompt",
          "Please connect your wallet first.",
        ),
      );
      return;
    }

    fetchUserEvents(address);
  }, [address, isConnected, t]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    return new Date(timestamp * 1000).toLocaleString();
  };

  const formatValue = (value, key) => {
    if (value === null || typeof value === "undefined") return "N/A";

    // 1. Specific formatting for time-related keys
    if (
      key === "purchaseTime" ||
      key === "expiryTime" ||
      key === "timestamp" ||
      key === "createdAt" ||
      key === "updatedAt"
    ) {
      return new Date(Number(value) * 1000).toLocaleString();
    }

    // 2. For monetary values, format as tokens
    const lowerKey = key.toLowerCase();
    if (
      lowerKey.includes("nodeId") ||
      lowerKey.includes("amount") ||
      lowerKey.includes("fee") ||
      lowerKey.includes("reward") ||
      lowerKey.includes("cost") ||
      lowerKey.includes("balance") ||
      lowerKey.includes("value")
    ) {
      return `${value} BST`;
    }

    // 3. For percentage values, format as percentage
    if (lowerKey.includes("percentage")) {
      return `${value}%`;
    }
    if (lowerKey.includes("level")) {
      // Store the level value in state using useEffect
      return `${value + 1}`;
    }

    // 3. Default: convert to string
    return value.toString();
  };

  // Add useEffect to capture level from event data
  useEffect(() => {
    // Initialize level to 3 as default
    if (level === null) {
      setLevel(0);
    }

    // Look for level in event data
    if (userEvents && userEvents.length > 0) {
      for (const event of userEvents) {
        if (event.eventData) {
          try {
            const eventData =
              typeof event.eventData === "object"
                ? event.eventData
                : JSON.parse(event.eventData);

            if (eventData && eventData.level !== undefined) {
              // Found level in event data
              setLevel(Number(eventData.level + 1));
              // console.log("Level set from event data:", eventData.level);
              break;
            }
          } catch (error) {
            console.error("Error parsing event data:", error);
          }
        }
      }
    }
  }, [userEvents]);
  // Function to map event types to their display names as shown in the UI
  const getEventDisplayName = (eventType) => {
    // Check if eventType is undefined or null
    if (!eventType) {
      console.log("Warning: eventType is undefined or null");
      return "Unknown Event";
    }

    // Log the original event type for debugging
    // console.log("Original eventType:", eventType);

    // Remove spaces for mapping
    const normalizedEventType = eventType.replace(/\s+/g, "").toUpperCase();
    // console.log("Normalized eventType:", normalizedEventType);

    // console.log("Level:", level);
    // Define the mapping with uppercase keys
    const eventDisplayMap = {
      REFERRALREGISTEREDANDREWARDDISTRIBUTED: `Referral Income`,
      REWARDSCLAIMED: "Booster Income",
      FIRSTTIMEUSERFEECOLECTED: "5% Activation Bonus For Team",
      USERREGISTERED: "User Registered",
      ADDBOOSTERREWARD: "5% Activation Bonus",
      REFERRALREGISTERED: "Referral Registered",
      BULKREFERRALREWARDEARNED: "Ascension Cycle Bonus",
      NODEPURCHASED: "SBAL Purchased",
      USERHOLDREWARD: "Pending Booster Income",
      USERRELEASEREWARD: "Released Booster Income",
      USERHOLDREWARDLEVEL: "Pending Referral Income",
      USERRELEASEREWARDLEVEL: "Released Referral Income",
    };

    // Check if we have a mapping for this event type
    const mappedValue = eventDisplayMap[normalizedEventType];
    // console.log("Mapped value:", mappedValue);

    // Return the mapped value or format the original event type
    return (
      mappedValue ||
      eventType
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
    );
  };

  // handle hard refresh
  const handleHardRefresh = async () => {
    try {
      await apiService.hardRefresh();
      toast.success("Hard refresh completed successfully");
    } catch (error) {
      console.error("Error during hard refresh:", error);
      toast.error("Failed to complete hard refresh");
    }
  };

  return (
    <>
      <section className="py-20 relative">
        <BackgroundEffects />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              {t("userHistory.title", "User History")}
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              {t(
                "userHistory.subtitle",
                "View blockchain events and transaction history for your connected wallet address.",
              )}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div
              className={`p-6 rounded-lg shadow-lg ${isDarkMode ? "bg-cyber-dark-card" : "bg-white"} mb-8`}
            >
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium">
                    {t("userHistory.walletAddress", "Wallet Address")}
                  </label>
                  <input
                    type="text"
                    value={
                      address || t("userHistory.notConnected", "Not connected")
                    }
                    readOnly
                    placeholder="0x..."
                    className={`w-full p-3 rounded-md border ${
                      isDarkMode
                        ? "bg-cyber-black border-cyber-border text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    } focus:ring-cyber-accent focus:border-cyber-accent cursor-default`}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  refreshUserEvents();
                  handleHardRefresh();
                }}
                disabled={userEventsLoading || !isConnected}
                className={`w-full py-3 px-6 rounded-md font-medium transition-all ${
                  isDarkMode
                    ? "bg-[#0f0]/20 text-[#0f0] hover:bg-[#0f0]/30 border border-[#0f0]/50"
                    : "bg-cyber-accent/20 text-cyber-accent hover:bg-cyber-accent/30 border border-cyber-accent/50"
                } ${userEventsLoading || !isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {userEventsLoading
                  ? t("userHistory.loading", "Loading...")
                  : t("userHistory.refresh", "Refresh History")}
              </button>
            </div>

            {/* Loading Message - Shows when data is being fetched
            {userEventsLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`p-8 rounded-lg shadow-xl text-center mb-8 border-2 ${
                  isDarkMode
                    ? "bg-cyber-dark-card border-[#0f0]/50"
                    : "bg-white border-cyber-accent/50"
                }`}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block text-5xl mb-4"
                >
                  ⏳
                </motion.div>
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    isDarkMode ? "text-[#0f0]" : "text-cyber-accent"
                  }`}
                >
                  {t("userHistory.loadingTitle", "Loading your history...")}
                </h3>
                <p
                  className={`text-base mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t(
                    "userHistory.loadingMessage1",
                    "We're fetching confirmations from the blockchain network — this might take a short while."
                  )}
                </p>
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-[#0f0]/80" : "text-cyber-accent/80"
                  }`}
                >
                  {t(
                    "userHistory.loadingMessage2",
                    "Don't refresh or leave the page — your data will appear soon!"
                  )}
                </p>
                <motion.div
                  className="mt-6 flex justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className={`w-3 h-3 rounded-full ${
                      isDarkMode ? "bg-[#0f0]" : "bg-cyber-accent"
                    }`}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className={`w-3 h-3 rounded-full ${
                      isDarkMode ? "bg-[#0f0]" : "bg-cyber-accent"
                    }`}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className={`w-3 h-3 rounded-full ${
                      isDarkMode ? "bg-[#0f0]" : "bg-cyber-accent"
                    }`}
                  />
                </motion.div>
              </motion.div>
            )} */}

            {/* Initial loading/status messages */}
            {!userEventsLoading && isConnecting && (
              <div
                className={`p-6 rounded-lg text-center ${isDarkMode ? "bg-cyber-dark-card" : "bg-white"}`}
              >
                <p>
                  {t("userHistory.connectingWallet", "Connecting to wallet...")}
                </p>
              </div>
            )}
            {!userEventsLoading && !isConnecting && !isConnected && (
              <div
                className={`p-6 rounded-lg text-center ${isDarkMode ? "bg-cyber-dark-card" : "bg-white"}`}
              >
                <p>
                  {t(
                    "userHistory.pleaseConnectWallet",
                    "Please connect your wallet to view history.",
                  )}
                </p>
              </div>
            )}

            {/* Event display */}
            {(isConnected && userEvents.length > 0 && !isLoading) ||
            userEvents.length !== 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <h3
                  className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
                >
                  {t("userHistory.results", "Results")}
                </h3>

                <div className="space-y-6">
                  {userEvents
                    .filter((event) => {
                      // Filter out ReferralRegistered and UserRegistered events
                      const normalizedEventType =
                        event.eventType?.replace(/\s+/g, "").toUpperCase() ||
                        "";
                      return (
                        normalizedEventType !== "REFERRALREGISTERED" &&
                        normalizedEventType !== "USERREGISTERED" &&
                        normalizedEventType !== "USERRELEASEREWARD" &&
                        normalizedEventType !== "USERRELEASEREWARDLEVEL"
                      );
                    })
                    .map((event, index) => (
                      <div
                        key={`${event.transactionHash}-${index}`} // Ensure unique key
                        className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${isDarkMode ? "bg-cyber-dark-card border border-green1 hover:border-green1" : "bg-white border hover:shadow-xl"}`}
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                          <h4 className="text-xl font-bold text-green1 mb-2 md:mb-0">
                            {event.eventType
                              ? getEventDisplayName(event.eventType)
                              : "Event"}
                          </h4>
                          <div className="text-sm text-gray-400 flex flex-col md:flex-row md:items-center md:space-x-4">
                            <span className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {event.timestamp
                                ? new Date(event.timestamp).toLocaleString()
                                : "Unknown"}
                            </span>
                            <span className="flex items-center mt-1 md:mt-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                              </svg>
                              Block:{" "}
                              {event.blockNumber
                                ? event.blockNumber.toString()
                                : "Unknown"}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`p-4 rounded-md ${isDarkMode ? "bg-cyber-black/50" : "bg-gray-50"}`}
                        >
                          <h5 className="font-semibold mb-2 text-gray-300">
                            Details:
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                            {/* User Address */}
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-400">
                                User Address:
                              </span>
                              <span className="break-all text-white">
                                {event.userAddress || "Unknown"}
                              </span>
                            </div>

                            {/* Amount */}
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-400">
                                Amount:
                              </span>
                              <span className="break-all text-white">
                                ${event.amount || "0"} BST
                              </span>
                            </div>

                            {/* Package ID */}
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-400">
                                Package ID:
                              </span>
                              <span className="break-all text-white">
                                {event.packageId || "N/A"}
                              </span>
                            </div>

                            {/* Created At */}
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-400">
                                Created At:
                              </span>
                              <span className="break-all text-white">
                                {event.createdAt
                                  ? new Date(event.createdAt).toLocaleString()
                                  : "Unknown"}
                              </span>
                            </div>

                            {event.eventData && (
                              <div className="flex flex-col">
                                <span className="font-medium text-gray-400">
                                  Event Data:
                                </span>

                                {(() => {
                                  let parsedData;

                                  try {
                                    // If it's already an object, use it; otherwise try parsing
                                    parsedData =
                                      typeof event.eventData === "object"
                                        ? event.eventData
                                        : JSON.parse(event.eventData);
                                  } catch (e) {
                                    // Fallback to raw string if JSON parsing fails
                                    return (
                                      <span className="break-all text-red-500">
                                        Invalid event data format
                                      </span>
                                    );
                                  }

                                  return (
                                    <div className="text-white space-y-1 mt-1">
                                      {Object.entries(parsedData).map(
                                        ([key, value]) => (
                                          <div key={key} className="flex gap-2">
                                            <span className="font-semibold text-gray-300">
                                              {key}:
                                            </span>
                                            <span>
                                              {formatValue(value, key)}
                                            </span>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  );
                                })()}
                              </div>
                            )}
                            {/* Event Data */}

                            {/* Other fields */}
                            {/* {event &&
                          Object.entries(event)
                            .filter(
                              ([key]) =>
                                ![
                                  "id",
                                  "eventType",
                                  "transactionHash",
                                  "blockNumber",
                                  "timestamp",
                                  "userAddress",
                                  "amount",
                                  "packageId",
                                  "createdAt",
                                  "eventData",
                                ].includes(key) && key !== "__length__"
                            )
                            .map(([key, value]) => (
                              <div key={key} className="flex flex-col">
                                <span className="font-medium text-gray-400">
                                  {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                                  :
                                </span>
                                <span className="break-all text-white">
                                  {formatValue(value, key)}
                                </span>
                              </div>
                            ))} */}
                          </div>
                        </div>

                        <div className="mt-4 text-right">
                          <a
                            href={`https://sepolia.basescan.org/tx/${event.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-medium transition-colors ${isDarkMode ? "text-green1 hover:text-green1/80" : "text-cyber-accent hover:text-cyber-accent/80"}`}
                          >
                            {t(
                              "userHistory.viewTransaction",
                              "View Transaction",
                            )}{" "}
                            →
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`p-8 rounded-lg shadow-xl text-center mb-8 border-2 ${
                  isDarkMode
                    ? "bg-cyber-dark-card border-[#0f0]/50"
                    : "bg-white border-cyber-accent/50"
                }`}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block text-5xl mb-4"
                >
                  ⏳
                </motion.div>
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    isDarkMode ? "text-[#0f0]" : "text-cyber-accent"
                  }`}
                >
                  {t("userHistory.loadingTitle", "Loading your history...")}
                </h3>
                <p
                  className={`text-base mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t(
                    "userHistory.loadingMessage1",
                    "We're fetching confirmations from the blockchain network — this might take a short while.",
                  )}
                </p>
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-[#0f0]/80" : "text-cyber-accent/80"
                  }`}
                >
                  {t(
                    "userHistory.loadingMessage2",
                    "Don't refresh or leave the page — your data will appear soon!",
                  )}
                </p>
                <motion.div
                  className="mt-6 flex justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className={`w-3 h-3 rounded-full ${
                      isDarkMode ? "bg-[#0f0]" : "bg-cyber-accent"
                    }`}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className={`w-3 h-3 rounded-full ${
                      isDarkMode ? "bg-[#0f0]" : "bg-cyber-accent"
                    }`}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className={`w-3 h-3 rounded-full ${
                      isDarkMode ? "bg-[#0f0]" : "bg-cyber-accent"
                    }`}
                  />
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserHistory;

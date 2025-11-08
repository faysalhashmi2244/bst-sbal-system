import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";
import UserEventsLogger from "../hooks/user_events_logger";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import BackgroundEffects from "../components/BackgroundEffects";

const UserHistory = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const { address, isConnected, isConnecting } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [userLogger, setUserLogger] = useState(null);
  const [loggerInitialized, setLoggerInitialized] = useState(false);

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fromBlock = 32072843; // Consider making this configurable or dynamic
  const toBlock = "latest";

  // Initialize the logger
  useEffect(() => {
    const initLogger = async () => {
      if (isConnected && !loggerInitialized) {
        setIsLoading(true);
        toast.loading(
          t(
            "userHistory.initializingConnection",
            "Initializing blockchain connection...",
          ),
        );
        try {
          const logger = new UserEventsLogger();
          await logger.init();
          setUserLogger(logger);
          setLoggerInitialized(true);
          toast.dismiss();
          toast.success(
            t(
              "userHistory.connectionInitialized",
              "Blockchain connection initialized.",
            ),
          );
        } catch (error) {
          console.error("Failed to initialize user events logger:", error);
          toast.dismiss();
          toast.error(
            t(
              "userHistory.initError",
              "Failed to initialize blockchain connection",
            ),
          );
        } finally {
          setIsLoading(false);
        }
      }
    };

    initLogger();
  }, [isConnected, loggerInitialized, t]);

  const fetchUserHistory = useCallback(async () => {
    if (!isConnected || !address) {
      toast.error(
        t(
          "userHistory.connectWalletPrompt",
          "Please connect your wallet first.",
        ),
      );
      return;
    }

    if (!userLogger || !loggerInitialized) {
      toast.error(
        t(
          "userHistory.connectionNotReady",
          "Blockchain connection not ready. Please wait.",
        ),
      );
      return;
    }

    setIsLoading(true);
    setUserEvents([]); // Clear previous events before fetching new ones
    try {
      toast.loading(t("userHistory.fetching", "Fetching user history..."));

      // Get all events for the specific user
      const events = await userLogger.getAllUserEvents(
        fromBlock,
        toBlock,
        address,
      );

      // Add timestamps to the events
      await userLogger.addTimestampsToEvents();

      // Get the formatted user events
      let userEventsData = userLogger.userEvents[address] || [];

      // Sort events to show the most recent ones first
      userEventsData.sort((a, b) => {
        // Ensure properties exist and are comparable, treating undefined/null as less than defined values for sorting
        const aTimestamp = a.timestamp;
        const bTimestamp = b.timestamp;
        const aBlock = a.blockNumber;
        const bBlock = b.blockNumber;

        // Primary sort: timestamp (descending)
        if (
          bTimestamp !== undefined &&
          bTimestamp !== null &&
          aTimestamp !== undefined &&
          aTimestamp !== null
        ) {
          if (bTimestamp > aTimestamp) return 1;
          if (bTimestamp < aTimestamp) return -1;
        } else if (bTimestamp !== undefined && bTimestamp !== null) {
          return 1; // b has timestamp, a does not, so b comes first
        } else if (aTimestamp !== undefined && aTimestamp !== null) {
          return -1; // a has timestamp, b does not, so a comes first
        }

        // Secondary sort: blockNumber (descending) if timestamps are equal or missing
        if (
          bBlock !== undefined &&
          bBlock !== null &&
          aBlock !== undefined &&
          aBlock !== null
        ) {
          if (bBlock > aBlock) return 1;
          if (bBlock < aBlock) return -1;
        } else if (bBlock !== undefined && bBlock !== null) {
          return 1; // b has block, a does not, so b comes first
        } else if (aBlock !== undefined && aBlock !== null) {
          return -1; // a has block, b does not, so a comes first
        }
        return 0;
      });

      setUserEvents(userEventsData);
      toast.dismiss();
      toast.success(
        t("userHistory.eventsFound", {
          count: userEventsData.length,
          defaultValue: `Found ${userEventsData.length} events for this user`,
        }),
      );
    } catch (error) {
      console.error("Error fetching user history:", error);
      toast.dismiss();
      toast.error(t("userHistory.fetchError", "Failed to fetch user history"));
    } finally {
      setIsLoading(false);
    }
  }, [
    address,
    isConnected,
    userLogger,
    loggerInitialized,
    fromBlock,
    toBlock,
    t,
  ]);

  useEffect(() => {
    if (isConnected && address && userLogger && loggerInitialized) {
      fetchUserHistory();
    }
  }, [isConnected, address, userLogger, loggerInitialized, fetchUserHistory]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    return new Date(timestamp * 1000).toLocaleString();
  };

  const formatValue = (value, key) => {
    if (value === null || typeof value === "undefined") return "N/A";

    // 1. Specific formatting for time-related keys
    if (key === "purchaseTime" || key === "expiryTime") {
      return new Date(Number(value) * 1000).toLocaleString();
    }

    const lowerKey = key.toLowerCase();

    // 2. Specific formatting for known non-wei numeric keys (IDs, counts, simple timestamps if not handled above)
    // These should be returned as plain strings. Order this check before general wei conversion.
    if (
      lowerKey === "packageid" ||
      lowerKey === "nodeid" ||
      lowerKey === "tokenid" ||
      lowerKey.endsWith("id") ||
      lowerKey.includes("identifier") || // Added check for 'identifier'
      lowerKey.startsWith("id_") || // Added check for 'id_'
      lowerKey.startsWith("idx") || // Added check for 'idx'
      lowerKey === "timestamp" ||
      lowerKey.includes("count") ||
      lowerKey === "level" ||
      lowerKey.includes("percent") || // Handle percentage values
      lowerKey === "blocknumber"
    ) {
      return value.toString();
    }

    // 3. Attempt wei conversion for likely monetary values
    let isWeiCandidate = false;
    let valueAsStringForWei = "";
    let potentialWeiValueSource = null; // To store the value if its format is wei-like

    if (typeof value === "bigint") {
      potentialWeiValueSource = value;
    } else if (userLogger?.web3?.utils?.isBN?.(value)) {
      // Optional chaining for safety
      potentialWeiValueSource = value;
    } else if (typeof value === "string" && /^\d+$/.test(value)) {
      potentialWeiValueSource = value;
    } else if (
      typeof value === "object" &&
      value !== null &&
      typeof value.toString === "function"
    ) {
      const tempString = value.toString();
      if (/^\d+$/.test(tempString)) {
        potentialWeiValueSource = tempString; // Use the string representation from object's toString
      }
    }

    if (potentialWeiValueSource !== null) {
      // Value format is wei-like. Now check if the key indicates it's a monetary value.
      const isMonetaryKey =
        lowerKey.includes("price") ||
        lowerKey.includes("amount") ||
        lowerKey.includes("fee") ||
        lowerKey.includes("reward") || // Catches 'rewardsUsed' if key is 'rewardsUsed'
        lowerKey.includes("cost") ||
        lowerKey.includes("balance") ||
        lowerKey.includes("withdrawn") ||
        lowerKey.includes("discounted") ||
        lowerKey.includes("discount") ||
        lowerKey.includes("value"); // A general term, use cautiously or make more specific if needed

      if (isMonetaryKey) {
        isWeiCandidate = true;
        // Ensure valueAsStringForWei is the string representation for fromWei
        if (
          typeof potentialWeiValueSource === "bigint" ||
          userLogger?.web3?.utils?.isBN?.(potentialWeiValueSource)
        ) {
          valueAsStringForWei = potentialWeiValueSource.toString(10); // BN.toString(10) for decimal
        } else {
          // It's already a string (either originally or from obj.toString())
          valueAsStringForWei = potentialWeiValueSource;
        }
      }
    }

    if (isWeiCandidate) {
      try {
        if (userLogger?.web3?.utils) {
          // Optional chaining for safety
          return `${userLogger.web3.utils.fromWei(valueAsStringForWei, "ether")} tokens`;
        }
        console.warn(
          `Web3 utils not available for formatting key "${key}". Displaying as wei.`,
        );
        return `${valueAsStringForWei} (wei)`;
      } catch (error) {
        console.error(
          `Error converting wei value for key "${key}" (value: ${valueAsStringForWei}):`,
          error,
        );
        return `${valueAsStringForWei} (wei, conversion error)`;
      }
    }

    // 4. Default fallback: convert to string for any other types or values not caught above.
    // This handles non-monetary numeric strings not caught by ID checks, and other non-numeric types.
    return value.toString();
  };

  return (
    <section id="user-history" className="py-20 relative">
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
              onClick={fetchUserHistory}
              disabled={isLoading || !isConnected || !loggerInitialized}
              className={`w-full py-3 px-6 rounded-md font-medium transition-all ${
                isDarkMode
                  ? "bg-[#0f0]/20 text-[#0f0] hover:bg-[#0f0]/30 border border-[#0f0]/50"
                  : "bg-cyber-accent/20 text-cyber-accent hover:bg-cyber-accent/30 border border-cyber-accent/50"
              } ${isLoading || !isConnected || !loggerInitialized ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading
                ? t("userHistory.loading", "Loading...")
                : t("userHistory.refresh", "Refresh History")}
            </button>
          </div>

          {/* Initial loading/status messages */}
          {isConnecting && (
            <div
              className={`p-6 rounded-lg text-center ${isDarkMode ? "bg-cyber-dark-card" : "bg-white"}`}
            >
              <p>
                {t("userHistory.connectingWallet", "Connecting to wallet...")}
              </p>
            </div>
          )}
          {!isConnecting && !isConnected && (
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
          {!isConnecting && isConnected && !loggerInitialized && !isLoading && (
            <div
              className={`p-6 rounded-lg text-center ${isDarkMode ? "bg-cyber-dark-card" : "bg-white"}`}
            >
              <p>
                {t(
                  "userHistory.initializingConnection",
                  "Initializing blockchain connection...",
                )}
              </p>
            </div>
          )}
          {!isConnecting &&
            isConnected &&
            loggerInitialized &&
            isLoading &&
            userEvents.length === 0 && (
              <div
                className={`p-6 rounded-lg text-center ${isDarkMode ? "bg-cyber-dark-card" : "bg-white"}`}
              >
                <p>
                  {t("userHistory.fetchingInitial", "Fetching user history...")}
                </p>
              </div>
            )}

          {/* Event display */}
          {isConnected &&
            loggerInitialized &&
            userEvents.length > 0 &&
            !isLoading && (
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
                  {userEvents.map((event, index) => (
                    <div
                      key={`${event.transactionHash}-${index}`} // Ensure unique key
                      className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${isDarkMode ? "bg-cyber-dark-card border border-cyber-border hover:border-neon-blue" : "bg-white border hover:shadow-xl"}`}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <h4 className="text-xl font-bold text-neon-green mb-2 md:mb-0">
                          {event.eventName
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
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
                            {formatDate(event.timestamp)}
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
                            Block: {event.blockNumber.toString()}
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
                          {event.args &&
                            Object.entries(event.args)
                              ?.filter(
                                ([key]) => isNaN(key) && key !== "__length__",
                              )
                              ?.map(([key, value]) => (
                                <div key={key} className="flex flex-col">
                                  <span className="font-medium text-gray-400">
                                    {key
                                      .replace(/([A-Z])/g, " $1")
                                      .replace(/^./, (str) =>
                                        str.toUpperCase(),
                                      )}
                                    :
                                  </span>
                                  <span className="break-all text-white">
                                    {formatValue(value, key)}
                                  </span>
                                </div>
                              ))}
                        </div>
                      </div>

                      <div className="mt-4 text-right">
                        <a
                          href={`https://sepolia.basescan.org/tx/${event.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm font-medium transition-colors ${isDarkMode ? "text-neon-blue hover:text-neon-blue/80" : "text-cyber-accent hover:text-cyber-accent/80"}`}
                        >
                          {t("userHistory.viewTransaction", "View Transaction")}{" "}
                          →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          {/* No events found message */}
          {/* {isConnected && loggerInitialized && userEvents.length === 0 && !isLoading && address && (
                        <div className={`p-6 rounded-lg text-center ${isDarkMode ? "bg-cyber-dark-card" : "bg-white"}`}>
                            <p>
                                {t("userHistory.noEvents", "No events found for this address.")}
                            </p>
                        </div>
                    )} */}
        </div>
      </div>
    </section>
  );
};

export default UserHistory;

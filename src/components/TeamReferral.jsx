import React, { useState, useEffect, useCallback, memo } from "react";
import { useAccount } from "wagmi";
// Import wagmi config
import { useConfig } from "wagmi";
import { readContract } from "wagmi/actions";
import { useReadContract } from "wagmi";
import { useTheme } from "../ThemeContext";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FaUser, FaUsers, FaArrowDown, FaSpinner, FaBox } from "react-icons/fa";
import NodePackagesABI from "../abi/NodePackagesABI.json";
import BackgroundEffects from "./BackgroundEffects";
import apiService from "../services/api";

const Node_Packages_ADDRESS = "0x271d19C69fF93F9FaB2E35bcEb31A871A9d62657";

// Cache to store referrer lookups to avoid redundant blockchain calls
const referrerCache = new Map();

const TeamReferral = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const { address, isConnected, chain } = useAccount();
  const [referralTree, setReferralTree] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userPackages, setUserPackages] = useState({});
  const config = useConfig();
  // This hook is used to check if an address has the current user as their referrer
  const { data: mainReferrer, refetch: refetchMainReferrer } = useReadContract({
    address: Node_Packages_ADDRESS,
    abi: NodePackagesABI,
    functionName: "mainReferrer",
    args: [address], // Use the actual connected user's wallet address
    chainId: chain?.id,
    enabled: !!address && isConnected,
  });

  const getReferrer = useCallback(
    async (addressToCheck) => {
      if (referrerCache.has(addressToCheck)) {
        return referrerCache.get(addressToCheck);
      }

      try {
        console.log(`🔍 Getting referrer for:`, addressToCheck);

        const result = await readContract(config, {
          address: Node_Packages_ADDRESS,
          abi: NodePackagesABI,
          functionName: "mainReferrer",
          args: [addressToCheck],
          chainId: chain?.id,
        });

        console.log(`✅ Referrer result:`, result);
        referrerCache.set(addressToCheck, result);
        return result;
      } catch (error) {
        console.error(
          `❌ Error getting referrer for ${addressToCheck}:`,
          error,
        );
        return null;
      }
    },
    [config, chain?.id],
  ); // Optimized function to get the referrer of an address using the contract with caching

  // Clear cache when address or chain changes
  useEffect(() => {
    referrerCache.clear();
  }, [address, chain?.id]);

  // Maximum depth for processing the full chain
  const MAX_DEPTH = 10;

  // No display depth limit - show the entire chain until zero address

  const buildReferralTree = useCallback(
    async (startAddress) => {
      const processedAddresses = new Set(); // Prevent infinite loops
      const chain = [];
      let currentAddress = startAddress;
      let depth = 0;

      while (
        currentAddress &&
        currentAddress !== "0x0000000000000000000000000000000000000000" &&
        depth < MAX_DEPTH &&
        !processedAddresses.has(currentAddress)
      ) {
        console.log(`Processing level ${depth}:`, currentAddress);

        // Add to processed set
        processedAddresses.add(currentAddress);

        // Create node for current address
        const node = {
          address: currentAddress,
          depth: depth,
          children: [],
        };

        try {
          // Get referrer
          const referrer = await getReferrer(currentAddress);
          console.log(`Level ${depth} referrer:`, referrer);

          // Get purchased packages for this address
          try {
            console.log(`Fetching packages for address: ${currentAddress}`);
            const packagesData =
              await apiService.getPurchasedPackages(currentAddress);
            console.log(
              `Packages response for ${currentAddress}:`,
              packagesData,
            );

            if (packagesData && packagesData.success && packagesData.data) {
              node.packages = packagesData.data.purchasedPackages || [];
              console.log(
                `Found ${node.packages.length} packages for ${currentAddress}`,
              );
            } else {
              node.packages = [];
              console.log(`No packages data in response for ${currentAddress}`);
            }
          } catch (pkgError) {
            console.log(
              `Error fetching packages for ${currentAddress}:`,
              pkgError,
            );
            node.packages = [];
          }

          node.referrer = referrer;
          chain.push(node);

          // Move to next level
          currentAddress = referrer;
          depth++;
        } catch (error) {
          console.error(`Error at level ${depth}:`, error);
          node.error = true;
          chain.push(node);
          break;
        }
      }

      console.log(`Chain built with ${chain.length} levels`);

      // Convert flat chain to tree structure
      if (chain.length === 0) return null;

      // Build tree from bottom up
      for (let i = 0; i < chain.length - 1; i++) {
        chain[i].children = [chain[i + 1]];
      }

      return chain[0]; // Return root node
    },
    [getReferrer],
  );

  // Load the referral tree when the component mounts or address changes
  useEffect(() => {
    let isMounted = true;
    setError(null);

    const loadReferralTree = async () => {
      if (!isConnected || !address) {
        toast.error(
          t(
            "teamReferral.connectWallet",
            "Please connect your wallet to view your referral tree",
          ),
        );
        return;
      }

      setIsLoading(true);
      try {
        // Use the actual connected user's wallet address
        console.log("Starting referral chain from connected wallet:", address);

        const tree = await buildReferralTree(address);
        if (isMounted) {
          setReferralTree(tree ? [tree] : []);
        }
      } catch (error) {
        console.error("Error loading referral tree:", error);
        if (isMounted) {
          setError(error.message || "Error loading referral tree");
          toast.error(
            t("teamReferral.errorLoading", "Error loading referral tree"),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadReferralTree();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [address, isConnected, buildReferralTree, t]);

  // Memoized component to render a single node in the tree
  const ReferralNode = memo(({ node, isRoot = false }) => {
    if (!node) return null;

    // Memoized address shortening function
    const shortenAddress = useCallback((addr) => {
      return addr
        ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
        : "Unknown";
    }, []);

    // Handle error state
    if (node.error) {
      return (
        <div className={`flex flex-col items-center ${isRoot ? "" : "mt-4"}`}>
          <div
            className={`p-4 rounded-lg shadow-lg flex items-center justify-center w-64 ${isDarkMode ? "bg-red-900/20 border border-red-500" : "bg-red-50 border-red-300 border"}`}
          >
            <div className="text-center">
              <p className="font-medium">{shortenAddress(node.address)}</p>
              <p className="text-xs text-red-500">Error loading data</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`flex flex-col items-center ${isRoot ? "" : "mt-4"}`}>
        <div
          className={`p-4 rounded-lg shadow-lg w-64 ${isDarkMode ? "bg-cyber-dark-card border border-green1" : "bg-white border-cyber-accent border"}`}
        >
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <div
                className={`p-2 rounded-full ${isRoot ? "bg-green1/20" : "bg-gray-200/20"}`}
              >
                <FaUser
                  className={`text-xl ${isRoot ? "text-green1" : "text-gray-400"}`}
                />
              </div>
            </div>
            <p className="font-medium mb-2">{shortenAddress(node.address)}</p>

            {/* Display purchased packages */}
            {node.packages && node.packages.length > 0 ? (
              <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-700">
                <div className="flex items-center justify-center gap-1 mb-2 text-xs text-green1">
                  <FaBox className="text-sm" />
                  <span className="font-semibold">
                    Packages ({node.packages.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {node.packages.map((pkg, idx) => (
                    <div
                      key={idx}
                      className={`px-2 py-1 rounded text-xs font-mono ${isDarkMode ? "bg-green1/20 text-green1" : "bg-green-100 text-green-700"}`}
                      title={`${pkg.packageName} - $${pkg.price}`}
                    >
                      ${pkg.price}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-2 text-xs text-gray-500">No packages</div>
            )}
          </div>
        </div>

        {node.children && node.children.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>
            <FaArrowDown className="text-gray-400 my-1" />
            <div className="flex flex-wrap justify-center">
              {node.children.map((child, index) => (
                <ReferralNode key={`${child.address}-${index}`} node={child} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  });

  // Memoized content based on connection and loading state
  const renderContent = useCallback(() => {
    if (!isConnected) {
      return (
        <div
          className={`p-6 rounded-lg text-center ${isDarkMode ? "bg-cyber-dark-card" : "bg-white"} shadow-lg`}
        >
          <p>
            {t(
              "teamReferral.pleaseConnect",
              "Please connect your wallet to view your referral tree",
            )}
          </p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div
          className={`p-6 rounded-lg text-center ${isDarkMode ? "bg-cyber-dark-card" : "bg-white"} shadow-lg`}
        >
          <FaSpinner className="animate-spin mx-auto text-2xl mb-2" />
          <p>{t("teamReferral.loading", "Loading your referral tree...")}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div
          className={`p-6 rounded-lg text-center ${isDarkMode ? "bg-red-900/20" : "bg-red-50"} border border-red-300 shadow-lg`}
        >
          <p className="text-red-500 font-medium">
            {t("teamReferral.error", "Error")}
          </p>
          <p className="text-sm mt-2">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setIsLoading(true);
              buildReferralTree(address)
                .then((tree) => {
                  setReferralTree(tree ? [tree] : []);
                  setIsLoading(false);
                })
                .catch((err) => {
                  setError(err.message || "Error loading referral tree");
                  setIsLoading(false);
                });
            }}
            className="mt-4 px-4 py-2 bg-green1/20 hover:bg-green1/30 text-green1 rounded-md transition-colors"
          >
            {t("teamReferral.retry", "Retry")}
          </button>
        </div>
      );
    }

    if (referralTree.length > 0) {
      return (
        <div
          className={`p-6 rounded-lg ${isDarkMode ? "bg-cyber-dark-card" : "bg-white"} shadow-lg overflow-auto`}
        >
          <div className="flex justify-center min-w-max">
            {referralTree.map((node, index) => (
              <ReferralNode
                key={`${node.address}-${index}`}
                node={node}
                isRoot={true}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`p-6 rounded-lg text-center ${isDarkMode ? "bg-cyber-dark-card" : "bg-white"} shadow-lg`}
      >
        <p>{t("teamReferral.noReferrals", "No referral data found")}</p>
      </div>
    );
  }, [
    isConnected,
    isLoading,
    error,
    isDarkMode,
    referralTree,
    t,
    address,
    buildReferralTree,
  ]);

  return (
    <section className="py-20 relative">
      <BackgroundEffects />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
          >
            {t("teamReferral.title", "Team Referral Tree")}
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            {t(
              "teamReferral.subtitle",
              "View your referral network structure and purchased packages",
            )}
          </p>
        </div>

        <div className="flex justify-center">{renderContent()}</div>
      </div>
    </section>
  );
};

export default TeamReferral;

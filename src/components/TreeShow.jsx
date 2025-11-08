import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import apiService from "../services/api";
import BackgroundEffects from "./BackgroundEffects";
import NodePackagesABI from "../abi/NodePackagesABI.json";
import { FaBox } from "react-icons/fa";

const TreeShow = () => {
  const { address, chain, isConnected } = useAccount();
  const { isDarkMode } = useTheme();
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxDepth, setMaxDepth] = useState(8); // Default depth to show
  const [currentUserPackages, setCurrentUserPackages] = useState([]);
  const [hoveredCurrentUserPackageIndex, setHoveredCurrentUserPackageIndex] =
    useState(null);

  const Node_Packages_ADDRESS = "0x271d19C69fF93F9FaB2E35bcEb31A871A9d62657";

  const { data: userReferralCount, refetch: refetchUserReferralCount } =
    useReadContract({
      address: Node_Packages_ADDRESS,
      abi: NodePackagesABI,
      functionName: "getUserReferralCount",
      args: [address],
      chainId: chain?.id,
      enabled: !!address && isConnected,
    });

  // State to track authorization status
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Fetch current user's packages
  const fetchCurrentUserPackages = async () => {
    if (!address) return;
    try {
      const packagesData = await apiService.getPurchasedPackages(address);
      if (packagesData && packagesData.success && packagesData.data) {
        setCurrentUserPackages(packagesData.data.purchasedPackages || []);
      }
    } catch (error) {
      console.log("No packages found for current user");
      setCurrentUserPackages([]);
    }
  };

  // Get mainReferrer data for the connected address
  const fetchReferralTreeR = async () => {
    if (!address) return;

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getUserTeam(address, maxDepth);

      if (response.success) {
        // Enrich tree data with package information
        const enrichedData = await enrichTreeWithPackages(response.data);
        setTreeData(enrichedData);
        // Fetch current user's packages
        await fetchCurrentUserPackages();
      } else {
        setError(response.message || "Failed to load referral tree");
      }
    } catch (err) {
      console.error("Error fetching referral tree:", err);
      setError("Failed to load referral tree. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  // Function to enrich tree data with packages
  const enrichTreeWithPackages = async (tree) => {
    if (!tree || !tree.referralTree) return tree;

    const enrichNode = async (node) => {
      // Fetch packages for this node
      try {
        const packagesData = await apiService.getPurchasedPackages(
          node.walletAddress,
        );
        if (packagesData && packagesData.success && packagesData.data) {
          node.packages = packagesData.data.purchasedPackages || [];
        } else {
          node.packages = [];
        }
      } catch (error) {
        console.log(`No packages found for ${node.walletAddress}`);
        node.packages = [];
      }

      // Recursively enrich children
      if (node.referrals && node.referrals.length > 0) {
        await Promise.all(node.referrals.map((child) => enrichNode(child)));
      }

      return node;
    };

    // Enrich all root level nodes
    await Promise.all(tree.referralTree.map((node) => enrichNode(node)));
    return tree;
  };

  useEffect(() => {
    const fetchReferralTree = async () => {
      if (!address) return;

      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getUserTeam(address, maxDepth);

        if (response.success) {
          // Enrich tree data with package information
          const enrichedData = await enrichTreeWithPackages(response.data);
          setTreeData(enrichedData);
          // Fetch current user's packages
          await fetchCurrentUserPackages();
        } else {
          setError(response.message || "Failed to load referral tree");
        }
      } catch (err) {
        console.error("Error fetching referral tree:", err);
        setError("Failed to load referral tree. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReferralTree();
  }, [address, maxDepth]);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for the items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Recursive component to render the tree nodes
  const TreeNode = ({
    node,
    level = 1,
    parentCascadeKey = 0,
    cascadeMode = null,
  }) => {
    const [expanded, setExpanded] = useState(false); // All nodes start collapsed by default
    // When a node is toggled, propagate an action and a changing key to children
    const [cascadeKey, setCascadeKey] = useState(0);
    const [lastAction, setLastAction] = useState(null); // 'expand' | 'collapse' | null
    const [hoveredPackageIndex, setHoveredPackageIndex] = useState(null);

    if (!node) return null;
    const { data: registered } = useReadContract({
      address: Node_Packages_ADDRESS,
      abi: NodePackagesABI,
      functionName: "registered",
      args: [node.walletAddress],
      chainId: chain?.id,
      enabled: !!node.walletAddress && isConnected,
    });
    const hasChildren = node.referrals && node.referrals.length > 0;
    const nodeClasses = `
      ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
      border rounded-lg p-4 mb-2 shadow-sm transition-all duration-300
      ${expanded ? "border-l-4 border-l-[#0f0]" : ""}
    `;

    // Listen for parent cascade and apply it, then propagate further
    useEffect(() => {
      if (!cascadeMode || parentCascadeKey === 0) return;
      if (cascadeMode === "expand") setExpanded(true);
      if (cascadeMode === "collapse") setExpanded(false);
      // propagate to children exactly once per parent change
      setLastAction(cascadeMode);
      setCascadeKey((k) => k + 1);
    }, [parentCascadeKey, cascadeMode]);

    return (
      <motion.div
        className="ml-4"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={nodeClasses}>
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0f0] to-green-500 flex items-center justify-center text-white font-bold mr-2">
                  {node.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h4
                    className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}
                  >
                    {node.username || "User"}
                  </h4>
                  <p
                    className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    ID: {node.userId} •{" "}
                    {new Date(node.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            {hasChildren && (
              <button
                onClick={() => {
                  const action = expanded ? "collapse" : "expand";
                  setExpanded(!expanded);
                  // kick off cascade to children
                  setLastAction(action);
                  setCascadeKey((k) => k + 1);
                }}
                className={`
                  px-2 py-1 rounded text-xs font-medium
                  ${isDarkMode ? "bg-gray-700 text-[#0f0]" : "bg-gray-100 text-cyber-accent"}
                `}
              >
                {expanded
                  ? `Hide ${node.referrals.length} Referrals`
                  : `Show ${node.referrals.length} Referrals`}
              </button>
            )}
          </div>

          {/* Wallet address with truncation */}
          <div className="mt-2">
            <p
              className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              {node.walletAddress?.substring(0, 6)}...
              {node.walletAddress?.substring(node.walletAddress.length - 4)}
            </p>
          </div>

          {/* Display purchased packages */}
          {node.packages && node.packages.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-700">
              <div className="flex items-center gap-1 mb-2 text-xs text-green1">
                <FaBox className="text-sm" />
                <span className="font-semibold">
                  Packages ({node.packages.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {node.packages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={() => setHoveredPackageIndex(idx)}
                    onMouseLeave={() => setHoveredPackageIndex(null)}
                  >
                    <div
                      className={`px-2 py-1 rounded text-xs font-mono cursor-pointer transition-all duration-200 ${isDarkMode ? "bg-green1/20 text-green1 hover:bg-green1/30" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                    >
                      ${pkg.price}
                    </div>

                    {/* Custom Tooltip */}
                    {hoveredPackageIndex === idx && (
                      <div
                        className={`absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap ${isDarkMode ? "bg-gray-900 border border-green1" : "bg-white border border-gray-300"}`}
                      >
                        <div
                          className={`text-xs font-semibold ${isDarkMode ? "text-green1" : "text-green-700"}`}
                        >
                          {pkg.packageName}
                        </div>
                        <div
                          className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                        >
                          Price: ${pkg.price}
                        </div>
                        <div
                          className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          {new Date(pkg.purchaseDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </div>
                        {/* Tooltip arrow */}
                        <div
                          className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${isDarkMode ? "border-t-green1" : "border-t-gray-300"}`}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render children if expanded */}
          {expanded && hasChildren && level < maxDepth && (
            <div className="mt-3 pl-2 border-l-2 border-dashed border-gray-300">
              {node.referrals.map((child, index) => (
                <TreeNode
                  key={child.userId || index}
                  node={child}
                  level={level + 1}
                  parentCascadeKey={cascadeKey}
                  cascadeMode={lastAction}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-20 relative">
      <BackgroundEffects />
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          className={`rounded-xl p-6 shadow-lg ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2
                className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
              >
                Your Referral Tree
              </h2>
              <p
                className={`mt-1 ${isDarkMode ? "text-green-400" : "text-green-600"}`}
              >
                View your complete team structure and referral network
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green1"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
              <p>{error}</p>
            </div>
          ) : treeData ? (
            <div>
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <motion.div
                  className={`p-4 rounded-lg shadow ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
                  variants={itemVariants}
                >
                  <h3 className="text-lg font-semibold text-gray-500">
                    Total Team Size
                  </h3>
                  <p
                    className={`text-3xl font-bold ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
                  >
                    {treeData.totalTeamSize || 0}
                  </p>
                </motion.div>

                <motion.div
                  className={`p-4 rounded-lg shadow ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
                  variants={itemVariants}
                >
                  <h3 className="text-lg font-semibold text-gray-500">
                    Direct Referrals{" "}
                    <small className="text-sm text-green1">(Active)</small>
                  </h3>
                  <p
                    className={`text-3xl font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    {treeData.referralTree.length || 0}
                  </p>
                </motion.div>

                <motion.div
                  className={`p-4 rounded-lg shadow ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
                  variants={itemVariants}
                >
                  <h3 className="text-lg font-semibold text-gray-500">
                    Your User ID
                  </h3>
                  <p
                    className={`text-3xl font-bold ${isDarkMode ? "text-green1" : "text-green1"}`}
                  >
                    {treeData.user?.userId !== undefined
                      ? treeData.user?.userId
                      : "N/A"}
                  </p>
                </motion.div>
              </div>

              {/* Level stats */}
              {treeData.levelStats && treeData.levelStats.length > 0 && (
                <motion.div
                  className={`mb-6 p-4 rounded-lg shadow ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
                  variants={itemVariants}
                >
                  <h3
                    className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                  >
                    Level Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                    {treeData.levelStats.map((stat) => (
                      <div
                        key={stat.level}
                        className={`p-3 rounded-lg text-center ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
                      >
                        <p className="text-xs text-gray-500">
                          Level {stat.level}
                        </p>
                        <p
                          className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
                        >
                          {stat.count}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tree visualization */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3
                    className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                  >
                    Your Network Structure
                  </h3>
                  {/* refresh button */}
                  <button
                    className={`text-green1 hover:text-green1/80 bg-green1/20 rounded-md border-green1 border px-4 py-2 transition-colors ${isDarkMode ? "text-white" : "text-gray-800"}`}
                    onClick={() => fetchReferralTreeR()}
                  >
                    Refresh
                  </button>
                </div>
                <div className="relative">
                  {/* Root node (current user) */}
                  <motion.div
                    className={`
                    p-4 mb-4 rounded-lg shadow-md border-l-4 border-l-[#0f0]
                    ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
                  `}
                    variants={itemVariants}
                  >
                    <div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0f0] to-green1 flex items-center justify-center text-white font-bold mr-3">
                          {treeData.user?.username?.charAt(0).toUpperCase() ||
                            "Y"}
                        </div>
                        <div>
                          <h4
                            className={`font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
                          >
                            {treeData.user?.username || "You"} (You)
                          </h4>
                          <p
                            className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                          >
                            ID: {treeData.user?.userId} •{" "}
                            {treeData.user?.walletAddress?.substring(0, 6)}...
                            {treeData.user?.walletAddress?.substring(
                              treeData.user?.walletAddress.length - 4,
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Display current user's packages */}
                      {currentUserPackages &&
                        currentUserPackages.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-700">
                            <div className="flex items-center gap-1 mb-2 text-xs text-green1">
                              <FaBox className="text-sm" />
                              <span className="font-semibold">
                                Your Packages ({currentUserPackages.length})
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {currentUserPackages.map((pkg, idx) => (
                                <div
                                  key={idx}
                                  className="relative"
                                  onMouseEnter={() =>
                                    setHoveredCurrentUserPackageIndex(idx)
                                  }
                                  onMouseLeave={() =>
                                    setHoveredCurrentUserPackageIndex(null)
                                  }
                                >
                                  <div
                                    className={`px-2 py-1 rounded text-xs font-mono cursor-pointer transition-all duration-200 ${isDarkMode ? "bg-green1/20 text-green1 hover:bg-green1/30" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                                  >
                                    ${pkg.price}
                                  </div>

                                  {/* Custom Tooltip */}
                                  {hoveredCurrentUserPackageIndex === idx && (
                                    <div
                                      className={`absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap ${isDarkMode ? "bg-gray-900 border border-green1" : "bg-white border border-gray-300"}`}
                                    >
                                      <div
                                        className={`text-xs font-semibold ${isDarkMode ? "text-green1" : "text-green-700"}`}
                                      >
                                        {pkg.packageName}
                                      </div>
                                      <div
                                        className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                                      >
                                        Price: ${pkg.price}
                                      </div>
                                      <div
                                        className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                      >
                                        {new Date(
                                          pkg.purchaseDate,
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </div>
                                      {/* Tooltip arrow */}
                                      <div
                                        className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${isDarkMode ? "border-t-green1" : "border-t-gray-300"}`}
                                      ></div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </motion.div>

                  {/* Tree branches */}
                  {treeData.referralTree && treeData.referralTree.length > 0 ? (
                    <div className="pl-4">
                      {treeData.referralTree.map((referral, index) => (
                        <TreeNode
                          key={referral.userId || index}
                          node={referral}
                        />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600"} text-center`}
                      variants={itemVariants}
                    >
                      <p>
                        You haven't referred anyone yet. Start building your
                        team!
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`p-4 rounded-lg text-center ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600"}`}
            >
              <p>
                No data available. Connect your wallet to view your referral
                tree.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TreeShow;

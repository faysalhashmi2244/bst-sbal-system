import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";
import { useAccount } from "wagmi";
import ConnectWallet from "./ConnectWallet";
import toast from "react-hot-toast";
import { FaShare, FaCopy, FaCheck, FaTimes } from "react-icons/fa";
import { useUser } from "../UserContext";

import NodeTokenABI from "../abi/NodeTokenABI.json";
import NodePackagesABI from "../abi/NodePackagesABI.json";
import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { formatEther } from "viem";
import { Link } from "react-router-dom";
import Refbnanner from "./Refbnanner";
import apiService from "../services/api";
const Node_Token_ADDRESS = "0x35024799A05Ed370CE0f8F9b803A5BC0c072E854";
const Node_Packages_ADDRESS = "0x271d19C69fF93F9FaB2E35bcEb31A871A9d62657";
const PackageCard = ({
  id,
  level,
  name,
  price,
  duration,
  boosterReward,
  roi,
  color,
  popular,
  userRewards,
  isActive,
  refetchUserRewards,
  refetchAllNodes,
  refetchAllowance,
  onClick,
  allowance,
  referrerParams,
}) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { isConnected, address, chain } = useAccount();
  const { user } = useUser();
  const [activeLoader, setActiveLoader] = useState(new Set());
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // console.log("allowance", allowance);
  // State for referral modal
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [customReferrer, setCustomReferrer] = useState("");
  const [isPurchaseTransaction, setIsPurchaseTransaction] = useState(false);

  // get referrer and level from perma links
  // Use external referrerParams if provided,  // Log the received referrerParams prop
  // console.log("Packages.jsx - Re/ceived referrerParams prop:", referrerParams);

  // If referrerParams is not provided via props, try to get it from URL
  const effectiveReferrerParams =
    referrerParams ||
    (() => {
      const urlRef = new URLSearchParams(window.location.search)?.get("ref");
      // console.log("Packages.jsx - Fallback to URL ref:", urlRef);
      return urlRef;
    })();

  // console.log("Packages.jsx - Using effectiveReferrerParams:", effectiveReferrerParams);
  // Set the referrer from URL params if level matches
  useEffect(() => {
    if (effectiveReferrerParams) {
      setCustomReferrer(effectiveReferrerParams);
      // console.log("PackageCard.jsx - Setting customReferrer from effectiveReferrerParams:", effectiveReferrerParams);
    } else if (referrerParams) {
      setCustomReferrer(referrerParams);
      // console.log("PackageCard.jsx - Setting customReferrer from referrerParams prop:", referrerParams);
    }
  }, [effectiveReferrerParams, referrerParams, level]);

  // Handle referrer input change
  const handleReferrerChange = (e) => {
    setCustomReferrer(e.target.value);
  };

  // Toggle referral modal
  const toggleReferralModal = () => {
    setShowReferralModal(!showReferralModal);
  };

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return "";
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  // Save referral and close modal
  const saveReferral = () => {
    // If empty, set to zero address
    if (!customReferrer.trim()) {
      setCustomReferrer("0x0000000000000000000000000000000000000000");
    }
    setShowReferralModal(false);
    return (
      customReferrer.trim() || "0x0000000000000000000000000000000000000000"
    );
  };

  // allowance
  // const { data: allowance, refetch: refetchAllowance } = useReadContract({
  //   address: Node_Token_ADDRESS,
  //   abi: NodeTokenABI,
  //   functionName: "allowance",
  //   args: [address, Node_Packages_ADDRESS],
  //   chainId: chain?.id,
  // });

  // Track if we've found a node for this level
  const [foundNodeForLevel, setFoundNodeForLevel] = useState(false);
  const [nodeData, setNodeData] = useState(null);

  // Get specific node data
  const { data: specificNode, refetch: refetchUserNode } = useReadContract({
    address: Node_Packages_ADDRESS,
    abi: NodePackagesABI,
    functionName: "userNodes",
    args: [address, level],
    chainId: chain?.id,
    enabled: !!address && isConnected && level !== undefined,
  });

  // packageReferralsMade
  const { data: packageReferralsMade, refetch: refetchPackageReferralsMade } =
    useReadContract({
      address: Node_Packages_ADDRESS,
      abi: NodePackagesABI,
      functionName: "userAscensionBonusReferralCount",
      args: [address, level],
      chainId: chain?.id,
      enabled: !!address && isConnected && level !== undefined,
    });

  // getUserReferrer
  const { data: userReferrer, refetch: refetchUserReferrer } = useReadContract({
    address: Node_Packages_ADDRESS,
    abi: NodePackagesABI,
    functionName: "getUserReferrer",
    args: [address, level],
    chainId: chain?.id,
    enabled: !!address && isConnected && level !== undefined,
  });

  // get calculatePendingNodeReward
  const {
    data: calculatePendingNodeReward,
    refetch: refetchCalculatePendingNodeReward,
  } = useReadContract({
    address: Node_Packages_ADDRESS,
    abi: NodePackagesABI,
    functionName: "calculatePendingNodeReward",
    args: [level, address],
    chainId: chain?.id,
    enabled: !!address && isConnected && level !== undefined,
  });

  // referralSet
  const { data: referralSet, refetch: refetchReferralSet } = useReadContract({
    address: Node_Packages_ADDRESS,
    abi: NodePackagesABI,
    functionName: "referralSet",
    args: [address],
    chainId: chain?.id,
    enabled: !!address && isConnected,
  });

  // console.log("referralSet",  referralSet);

  // Process node data when it changes
  useEffect(() => {
    if (specificNode) {
      const processedNode = {
        packageId: Number(specificNode[0]),
        purchaseTime: Number(specificNode[1]),
        expiryTime: Number(specificNode[2]),
        isActive: specificNode[3],
        nodeId: Number(specificNode[4]),
      };

      setNodeData(processedNode);
      // console.log("processedNode", processedNode);
      // Check if this node's packageId matches the current level
      if (processedNode.packageId === level) {
        setFoundNodeForLevel(true);
      }
    }
  }, [specificNode, level, address]);

  // approve
  const handleApprove = () => {
    try {
      writeContract({
        args: [
          Node_Packages_ADDRESS,
          "0xffffffffffffffffffffffffffffffffffffffffffffffff",
        ],
        address: Node_Token_ADDRESS,
        abi: NodeTokenABI,
        functionName: "approve",
        chainId: chain?.id,
      });
      refetchAllowance();
    } catch (err) {
      toast.error(err?.shortMessage || t("common.error"));
    }
  };
  // purchaseNode(uint256 _packageId, address _referrer)
  const handleBuyPackage = () => {
    // Check if a referrer is set (either from URL or user input) or if the user already has a referrer set in the contract or if the user is not connected
    if (
      (!customReferrer || customReferrer === "") &&
      referralSet === false &&
      !user?.sponsorWallet
    ) {
      // If no referrer is set and referralSet is false, show the modal to set a referrer
      setShowReferralModal(true);
    } else {
      // If referrer is already set or referralSet is true, proceed with purchase
      try {
        setActiveLoader((prev) => new Set([...prev, level]));
        // Use the custom referrer if available, otherwise use zero address which will use the default system referrer
        const referrerAddress =
          customReferrer && customReferrer !== ""
            ? customReferrer || user?.sponsorWallet
            : "0x0000000000000000000000000000000000000000";

        setIsPurchaseTransaction(true);
        writeContract({
          args: [level, user?.sponsorWallet || referrerAddress],
          address: Node_Packages_ADDRESS,
          abi: NodePackagesABI,
          functionName: "purchaseNode",
          chainId: chain?.id,
        });
        refetchUserNode();
        refetchAllNodes();
      } catch (err) {
        toast.error(err?.shortMessage || t("common.error"));
        setIsPurchaseTransaction(false);
        setActiveLoader((prev) => {
          const newSet = new Set(prev);
          newSet.delete(level);
          return newSet;
        });
      }
    }
  };

  // buy discount
  const handleBuyDiscount = () => {
    // Check if a referrer is set (either from URL or user input) or if the user already has a referrer set in the contract
    if (
      (!customReferrer || customReferrer === "") &&
      referralSet === false &&
      !user?.sponsorWallet
    ) {
      // If no referrer is set and referralSet is false, show the modal to set a referrer
      setShowReferralModal(true);
    } else {
      // If referrer is already set or referralSet is true, proceed with purchase
      try {
        setActiveLoader((prev) => new Set([...prev, level]));
        // Use the custom referrer if available, otherwise use zero address which will use the default system referrer
        const referrerAddress =
          customReferrer && customReferrer !== ""
            ? customReferrer || user?.sponsorWallet
            : "0x0000000000000000000000000000000000000000";

        setIsPurchaseTransaction(true);
        writeContract({
          args: [level, user?.sponsorWallet || referrerAddress],
          address: Node_Packages_ADDRESS,
          abi: NodePackagesABI,
          functionName: "purchaseNodeWithDiscount",
          chainId: chain?.id,
        });
        refetchUserNode();
        refetchReferralSet();
        refetchAllNodes();
      } catch (err) {
        toast.error(err?.shortMessage || t("common.error"));
        setIsPurchaseTransaction(false);
        setActiveLoader((prev) => {
          const newSet = new Set(prev);
          newSet.delete(level);
          return newSet;
        });
      }
    }
  };

  // claimNodeReward
  const handleClaimNodeReward = () => {
    try {
      writeContract({
        args: [level],
        address: Node_Packages_ADDRESS,
        abi: NodePackagesABI,
        functionName: "claimNodeReward",
        chainId: chain?.id,
      });
      refetchUserNode();
      refetchReferralSet();
    } catch (err) {
      toast.error(err?.shortMessage || t("common.error"));
    }
  };

  // Save package purchase to backend
  const savePurchaseToBackend = async (txHash) => {
    try {
      await apiService.addPurchasedPackage({
        walletAddress: address,
        packageId: level,
        packageName: name,
        price: price,
        transactionHash: txHash,
      });
      console.log("Package purchase saved to backend");
    } catch (error) {
      console.error("Error saving package purchase:", error);
      // Don't show error to user as this is a backend tracking issue
    }
  };

  // Toast notifications for transaction status
  useEffect(() => {
    if (isPending) {
      toast.loading(t("common.pending"), { id: "txn" });
    }
    if (isConfirming) {
      toast.loading(t("common.confirming"), { id: "txn" });
      refetchUserNode();
      refetchAllowance();
      refetchUserReferrer();
      refetchPackageReferralsMade();
      refetchCalculatePendingNodeReward();
      refetchUserRewards();
      refetchReferralSet();
      refetchAllNodes();
    }
    if (isConfirmed) {
      toast.success(t("common.confirmed"), { id: "txn" });
      refetchUserNode();
      refetchAllowance();
      refetchUserReferrer();
      refetchPackageReferralsMade();
      refetchCalculatePendingNodeReward();
      refetchUserRewards();
      refetchReferralSet();
      refetchAllNodes();

      // Clear the loader
      setActiveLoader((prev) => {
        const newSet = new Set(prev);
        newSet.delete(level);
        return newSet;
      });

      // Save purchase to backend ONLY if this was a purchase transaction
      if (hash && isPurchaseTransaction) {
        savePurchaseToBackend(hash);
        setIsPurchaseTransaction(false); // Reset flag
      }
    }
    if (error) {
      toast.error(error?.shortMessage || t("common.error"), { id: "txn" });
      setIsPurchaseTransaction(false); // Reset flag on error
      // Clear the loader
      setActiveLoader((prev) => {
        const newSet = new Set(prev);
        newSet.delete(level);
        return newSet;
      });
    }
  }, [
    isPending,
    isConfirming,
    isConfirmed,
    error,
    t,
    hash,
    isPurchaseTransaction,
  ]);

  // 3D perspective effect on hover
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / 10) * -1;
    const rotateYValue = (x - centerX) / 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const resetRotation = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  // Get allowance from the parent component's props
  const needsApproval = isConnected && allowance?.toString() === "0";

  return (
    isActive && (
      <div
        ref={cardRef}
        className={`cyber-card  border-${color} perspective-1000 relative overflow-hidden ${needsApproval ? "pointer-events-none" : "cursor-pointer"} group transition-all duration-300 h-full ${
          isDarkMode ? "bg-cyber-gray/30" : "bg-cyber-light/70"
        } ${popular ? "scale-105 z-10" : ""} ${needsApproval ? "opacity-50 filter blur-sm" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={resetRotation}
        onClick={onClick}
        style={{
          transform: isHovering
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            : "",
          transition: "transform 0.2s ease-out",
          boxShadow: popular
            ? isDarkMode
              ? `0 0 15px rgba(${color === "green1" ? "0, 240, 255" : color === "green1" ? "0, 240, 255" : color === "green1" ? "0, 240, 255" : "0, 255, 157"}, 0.5)`
              : `0 0 15px rgba(${color === "green1" ? "0, 240, 255" : color === "green1" ? "0, 240, 255" : color === "green1" ? "0, 240, 255" : "0, 255, 157"}, 0.3)`
            : "",
        }}
      >
        {/* Holographic overlay effect */}
        <div
          className="absolute inset-0 opacity-20 holographic-effect pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(
            ${rotateY * 1.5}deg, 
            transparent 20%, 
            rgba(${color === "green1" ? "0, 240, 255" : color === "green1" ? "0, 240, 255" : color === "green1" ? "0, 240, 255" : "0, 255, 157"}, 0.2) 40%, 
            rgba(${color === "green1" ? "0, 240, 255" : color === "green1" ? "0, 240, 255" : color === "green1" ? "0, 240, 255" : "0, 255, 157"}, 0.3) 60%, 
            transparent 80%
          )`,
          }}
        />

        {/* Background grid pattern */}
        <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none"></div>

        {popular && (
          <div
            className={`${isDarkMode ? `bg-${color}` : `bg-${color}/90`} text-black font-display text-center py-1 px-4 absolute -top-1 left-1/2 transform -translate-x-1/2 text-xs z-10 backdrop-blur-sm`}
            style={{
              clipPath: "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)",
            }}
          >
            {t("packages.recommended")}
          </div>
        )}

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-black/30 pointer-events-none"></div>

        <div className="flex items-center justify-between gap-2">
          <div
            className={`flex items-center justify-center w-7 h-7 border ${isDarkMode ? `border-${color}` : `border-${color}/90`} ${isDarkMode ? `bg-${color}/10` : `bg-${color}/20`} rounded-sm text-xs font-mono font-bold ${isDarkMode ? `text-${color}` : `text-${color}/90`} mb-2 backdrop-blur-sm`}
          >
            {level}
          </div>
          <div className="flex items-center gap-2">
            {isConnected && (
              <div
                className={`flex items-center justify-center px-1  max-w-32 w-full h-7 border border-yellow-500 bg-yellow-500/10 rounded-sm text-xs font-mono font-bold text-yellow-500 mb-2 backdrop-blur-sm`}
              >
                Referrals: {packageReferralsMade?.toString()}
              </div>
            )}
            {/* {isConnected && (
              <div
                className={`relative flex items-center justify-center w-7 h-7 border ${isDarkMode ? `border-${color}` : `border-${color}/90`} ${isDarkMode ? `bg-${color}/10` : `bg-${color}/20`} rounded-sm text-xs font-mono font-bold ${isDarkMode ? `text-${color}` : `text-${color}/90`} mb-2 backdrop-blur-sm cursor-pointer hover:bg-${color}/30 transition-colors duration-200`}
                onClick={handleShare}
                onMouseEnter={() => setShowShareTooltip(true)}
                onMouseLeave={() => setShowShareTooltip(false)}
              >
                {linkCopied ? <FaCheck /> : <FaShare />}
                {showShareTooltip && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
                    Share Package
                  </div>
                )}
              </div>
            )} */}
          </div>
        </div>
        <div className="px-4 py-5 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3
                className={`${isDarkMode ? `text-${color}` : `text-${color}/90`} text-xl font-display tracking-wider`}
              >
                {name}
              </h3>
            </div>
          </div>

          <div className="mb-4 flex items-end">
            <span
              className={`${isDarkMode ? "text-white" : "text-cyber-dark"} text-2xl font-display font-bold`}
            >
              ${price} BST
            </span>
            <span
              className={`${isDarkMode ? "text-white/60" : "text-cyber-dark/60"} ml-2 mb-0.5 text-xs font-future`}
            >
              /{" "}
              {duration === "0"
                ? "Lifetime"
                : `${duration / (60 * 60 * 24)} days`}
            </span>
          </div>

          {/* <div className="mb-4">
          <div
            className={`text-xs ${isDarkMode ? "text-white/60" : "text-cyber-dark/60"} mb-1 font-future uppercase tracking-wider`}
          >
            {t("packages.boosterReward")}
          </div>
          <div className="relative">
            <div
              className={`w-full h-1 ${isDarkMode ? `bg-${color}/20` : `bg-${color}/40`} rounded-full mb-1`}
            ></div>
            <div
              className={`${isDarkMode ? "text-white" : "text-cyber-dark"} font-mono text-sm font-bold`}
            >
              {boosterReward} SBAL
            </div>
          </div>
        </div> */}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div
              className={`p-2 rounded-md ${isDarkMode ? "bg-cyber-black/30" : "bg-white/30"} backdrop-blur-sm`}
            >
              <div
                className={`text-xs ${isDarkMode ? "text-white/60" : "text-cyber-dark/60"} mb-1 font-future uppercase tracking-wider`}
              >
                {t("packages.roi")}
              </div>
              <div
                className={`${isDarkMode ? "text-white" : "text-cyber-dark"} font-mono text-sm font-bold`}
              >
                {roi}%
              </div>
            </div>
            <div
              className={`p-2 rounded-md ${isDarkMode ? "bg-cyber-black/30" : "bg-white/30"} backdrop-blur-sm`}
            >
              <div
                className={`text-xs ${isDarkMode ? "text-white/60" : "text-cyber-dark/60"} mb-1 font-future uppercase tracking-wider`}
              >
                {t("packages.duration")}
              </div>
              <div
                className={`${isDarkMode ? "text-white" : "text-cyber-dark"} font-mono text-sm font-bold`}
              >
                {duration === "0"
                  ? "Lifetime"
                  : `${duration / (60 * 60 * 24)} days`}
              </div>
            </div>
          </div>

          {isConnected ? (
            nodeData && nodeData.packageId === level ? (
              <div
                className={`w-full py-2 px-3 text-sm border-2 border-${color} bg-${color}/10 text-${color} font-display uppercase tracking-wider overflow-hidden`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                }}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${nodeData?.isActive ? "bg-green-500" : "bg-red-500"} animate-pulse`}
                    ></span>
                    <span>
                      {nodeData?.isActive
                        ? t("common.active")
                        : t("common.inactive")}
                    </span>
                    <span>Node ID: {nodeData?.nodeId}</span>
                  </div>
                  <div className="text-xs opacity-70 text-center">
                    {new Date(
                      nodeData?.purchaseTime * 1000,
                    )?.toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      nodeData?.expiryTime * 1000,
                    )?.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Check if user has enough rewards for discount */}
                {formatEther(userRewards || 0) > 0 &&
                Number(formatEther(userRewards || 0)) >= Number(price) ? (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleBuyDiscount}
                      className={`w-full py-2 px-3 text-sm border-2 animate-pulse  border-green1 bg-green1/10 text-green1 font-display uppercase tracking-wider overflow-hidden hover:bg-green1/20 transition-all duration-300`}
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                      }}
                      disabled={!isConnected || activeLoader.has(level)}
                    >
                      {activeLoader.has(level) ? (
                        <div className="flex items-center justify-center gap-2">
                          Activating...
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green1"></div>
                        </div>
                      ) : (
                        t("Get Discount")
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleBuyPackage}
                    className={`w-full py-2 px-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed border-2 border-${color} bg-${color}/10 text-${color} font-display uppercase tracking-wider overflow-hidden hover:bg-${color}/20 transition-all duration-300`}
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                    }}
                    disabled={
                      !isConnected ||
                      !allowance ||
                      Number(allowance) < Number(price) ||
                      activeLoader.has(level)
                    }
                  >
                    {activeLoader.has(level) ? (
                      <div className="flex items-center justify-center gap-2">
                        Activating...
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green1"></div>
                      </div>
                    ) : (
                      t("packages.activateNow")
                    )}
                  </button>
                )}
              </>
            )
          ) : (
            <ConnectWallet />
          )}
        </div>

        {isConnected &&
          userReferrer !== "0x0000000000000000000000000000000000000000" && (
            <div
              className={` m-auto flex items-center text-center justify-center w-[90%] h-7 border border-${color} bg-${color}/10 rounded-sm text-xs font-mono font-bold text-${color} mb-2 backdrop-blur-sm`}
            >
              Referral by:{" "}
              {userReferrer?.slice(0, 6) + "..." + userReferrer?.slice(-4)}
            </div>
          )}
        {/* SHOW pending rewards */}
        {isConnected && calculatePendingNodeReward?.toString() > "0" && (
          <div
            className={`w-full flex items-center justify-between py-2 px-3 text-sm border-2 border-${color} bg-${color}/10 text-${color} font-display uppercase tracking-wider overflow-hidden hover:bg-${color}/20 transition-all duration-300`}
          >
            <div>Reward:</div>
            <div>{formatEther(calculatePendingNodeReward)}</div>
          </div>
        )}
        {/* Claim Node Reward */}
        {isConnected && calculatePendingNodeReward?.toString() > "0" && (
          <button
            onClick={handleClaimNodeReward}
            className={`w-full py-2 px-3 text-sm border-2 border-${color} bg-${color}/10 text-${color} font-display uppercase tracking-wider overflow-hidden hover:bg-${color}/20 transition-all duration-300`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
            }}
            disabled={!isConnected}
          >
            {t("Claim Reward")}
          </button>
        )}
        {/* Bottom bar animation */}
        <div
          className={`h-1 w-full bg-${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
        ></div>

        {/* Corner accents */}
        <div
          className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${isDarkMode ? `border-${color}` : `border-${color}/90`}`}
        ></div>
        <div
          className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${isDarkMode ? `border-${color}` : `border-${color}/90`}`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${isDarkMode ? `border-${color}` : `border-${color}/90`}`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${isDarkMode ? `border-${color}` : `border-${color}/90`}`}
        ></div>

        {/* Referral Modal */}
        {showReferralModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={toggleReferralModal}
            ></div>
            <div
              className={`cyber-card border-${color} relative overflow-hidden ${isDarkMode ? "bg-cyber-gray/90" : "bg-cyber-light/90"} p-6 w-full max-w-md mx-4 z-10`}
              style={{
                boxShadow: `0 0 15px rgba(${color === "green1" ? "0, 240, 255" : color === "green1" ? "0, 240, 255" : color === "green1" ? "0, 240, 255" : "0, 255, 157"}, 0.5)`,
              }}
            >
              {/* Corner accents */}
              <div
                className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${isDarkMode ? `border-${color}` : `border-${color}/90`}`}
              ></div>
              <div
                className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${isDarkMode ? `border-${color}` : `border-${color}/90`}`}
              ></div>
              <div
                className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${isDarkMode ? `border-${color}` : `border-${color}/90`}`}
              ></div>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${isDarkMode ? `border-${color}` : `border-${color}/90`}`}
              ></div>

              <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none"></div>

              <h3
                className={`${isDarkMode ? `text-${color}` : `text-${color}/90`} text-xl font-display tracking-wider mb-4`}
              >
                {t("packages.enterReferral") || "Enter Referral Address"}
              </h3>

              {/* Referral from URL notification */}
              {referrerParams && (
                <div
                  className={`mb-4 p-3 ${isDarkMode ? "bg-green-500/20" : "bg-green-500/10"} border border-green-500 rounded-md`}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-green-500 text-lg">✓</div>
                    <div>
                      <p className="font-bold text-green-500">
                        Referral Detected
                      </p>
                      <p className="text-sm">
                        You were referred by:{" "}
                        <span className="font-mono">
                          {formatAddress(referrerParams)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`text-xs ${isDarkMode ? "text-white/60" : "text-cyber-dark/60"} mb-1 font-future uppercase tracking-wider`}
                >
                  {t("packages.referralAddress") || "Referral Address"}
                  {referrerParams && (
                    <span className="ml-2 text-green-500">(Auto-filled)</span>
                  )}
                </div>
                <input
                  type="text"
                  value={customReferrer}
                  onChange={handleReferrerChange}
                  placeholder="0x0000...0000 (Optional)"
                  className={`w-full py-2 px-3 text-sm border border-${color} bg-${color}/5 text-${isDarkMode ? "white" : "cyber-dark"} font-mono rounded-sm focus:outline-none focus:ring-1 focus:ring-${color} placeholder-${isDarkMode ? "white/30" : "cyber-dark/30"} ${referrerParams ? "border-green-500" : ""}`}
                />
                <p
                  className={`mt-2 text-xs ${isDarkMode ? "text-white/60" : "text-cyber-dark/60"}`}
                >
                  {referrerParams &&
                    "Referral address automatically applied from link"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={toggleReferralModal}
                  className={`flex-1 py-2 px-3 text-sm border border-${color} bg-transparent text-${color} font-display uppercase tracking-wider hover:bg-${color}/10 transition-colors duration-300`}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                  }}
                >
                  {t("common.cancel") || "Cancel"}
                </button>
                <button
                  onClick={() => {
                    saveReferral();
                    // After saving, proceed with the purchase
                    if (
                      formatEther(userRewards || 0) > 0 &&
                      Number(formatEther(userRewards || 0)) >= Number(price)
                    ) {
                      handleBuyDiscount();
                    } else {
                      handleBuyPackage();
                    }
                  }}
                  className={`flex-1 py-2 px-3 text-sm border-2 border-${color} bg-${color}/10 text-${color} font-display uppercase tracking-wider hover:bg-${color}/20 transition-colors duration-300`}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                  }}
                >
                  {t("common.confirm") || "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

const Packages = ({ referrerParams }) => {
  const [_selectedPackage, setSelectedPackage] = useState(null);
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("all");
  const packagesRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const { isConnected, address, chain } = useAccount();

  // Check allowance at the Packages component level
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: Node_Token_ADDRESS,
    abi: NodeTokenABI,
    functionName: "allowance",
    args: [address, Node_Packages_ADDRESS],
    chainId: chain?.id,
    enabled: !!address && isConnected,
  });

  const colors = ["green1", "green1", "green1", "green1"];

  // getAllNodes
  const { data: allNodes, refetch: refetchAllNodes } = useReadContract({
    address: Node_Packages_ADDRESS,
    abi: NodePackagesABI,
    functionName: "getAllNodes",
    chainId: chain?.id,
  });

  // Process nodes data
  const processedNodes = allNodes?.map((node) => ({
    id: Number(node[0]?.id),
    name: node[1]?.name,
    price: formatEther(node[2]?.price || 0),
    duration: Number(node[3]?.duration),
    roiPercentage: Number(node[4]?.roiPercentage),
    isActive: node[5]?.isActive,
  }));

  // console.log('processedNodes', processedNodes);

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  // get  userRewards
  const { data: userRewards, refetch: refetchUserRewards } = useReadContract({
    address: Node_Packages_ADDRESS,
    abi: NodePackagesABI,
    functionName: "userRewards",
    args: [address],
    chainId: chain?.id,
    enabled: !!address && isConnected,
  });

  // State for withdrawal modal
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawError, setWithdrawError] = useState("");

  // Function to open withdrawal modal
  const handleWithdrawRewards = () => {
    setWithdrawAmount(Number(formatEther(userRewards || 0)).toFixed(2));
    setWithdrawError("");
    setShowWithdrawModal(true);
  };

  // Function to handle the actual withdrawal
  const processWithdrawal = () => {
    try {
      // Convert the input amount to the same format as userRewards (BigInt)
      const amountToWithdraw = userRewards;
      const userRewardsFormatted = Number(
        formatEther(userRewards || 0),
      ).toFixed(2);

      // Check if the entered amount equal to or less than available rewards
      if (parseFloat(withdrawAmount) >= parseFloat(userRewardsFormatted)) {
        setWithdrawError(
          "Amount must be less than or equal to your available rewards",
        );
        return;
      }
      console.log("amountToWithdraw", amountToWithdraw);
      console.log("userRewardsFormatted", userRewardsFormatted);
      console.log("withdrawAmount", withdrawAmount);
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

  // Handle approve function at the Packages component level
  const handleApprove = () => {
    try {
      writeContract({
        args: [
          Node_Packages_ADDRESS,
          "0xffffffffffffffffffffffffffffffffffffffffffffffff",
        ],
        address: Node_Token_ADDRESS,
        abi: NodeTokenABI,
        functionName: "approve",
        chainId: chain?.id,
      });
      refetchAllowance();
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
      refetchAllNodes();
      refetchAllowance();
    }
    if (isConfirmed) {
      toast.success(t("common.confirmed"), { id: "txn" });

      refetchUserRewards();
      refetchAllNodes();
      refetchAllowance();
    }
    if (error) {
      toast.error(error?.shortMessage || t("common.error"), { id: "txn" });
    }
  }, [isPending, isConfirming, isConfirmed, error, t]);

  const scrollToPackages = () => {
    if (packagesRef.current) {
      packagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredPackages =
    activeTab === "all"
      ? allNodes
      : allNodes?.filter((pkg) => pkg.tier === activeTab);

  return (
    <section
      className={`py-20 px-4 relative ${isDarkMode ? "bg-cyber-dark/30" : "bg-cyber-light/30"}`}
      id="packages"
    >
      {/* Background grid decoration */}
      <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>
      {/* Animated accent lines */}

      {/* Approval overlay when allowance is zero - only over the cards section */}
      {isConnected && allowance?.toString() === "0" && (
        <div
          className="absolute z-50 flex items-center justify-center"
          style={{
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="max-w-md w-full p-6 bg-cyber-dark/90 border-2 border-green1 rounded-lg text-center shadow-lg shadow-green1/30">
            <h3 className="text-2xl font-display text-green1 mb-4">
              {"Approval Needed"}
            </h3>
            <p className="text-white/80 mb-6">
              {
                "You need to approve NODE token usage before activating packages."
              }
            </p>
            <button
              onClick={handleApprove}
              disabled={isPending || isConfirming}
              className={`py-3 px-8 text-lg border-2 border-green1 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-green1 font-display uppercase tracking-wider hover:bg-green1/20 transition-colors duration-300 relative overflow-hidden animate-pulse`}
              style={{
                clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
              }}
            >
              {isPending || isConfirming ? (
                <div className="flex items-center justify-center gap-2">
                  Approving...
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green1"></div>
                </div>
              ) : (
                "Approve"
              )}
            </button>
          </div>
        </div>
      )}
      <div ref={packagesRef} className="container mx-auto  relative z-10">
        <div className="text-center mb-16 relative">
          <div
            className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-1 ${isDarkMode ? "bg-green1" : "bg-green1"}`}
          ></div>

          <h2
            className={`text-5xl font-display ${isDarkMode ? "text-white" : "text-cyber-dark"} mb-6 tracking-wider`}
          >
            <span
              className={`${isDarkMode ? "text-green1" : "text-green1"} ${isDarkMode ? "text-shadow-green1" : "text-shadow-green1"}`}
            >
              🧱 SBAL Packages
            </span>
          </h2>

          <p
            className={`text-2xl ${isDarkMode ? "text-green1" : "text-green1"} max-w-2xl mx-auto font-future mb-10`}
          >
            (Lifetime Access, No Rebills)
          </p>

          {/* <div className="w-full max-w-3xl mx-auto mb-10">
            {isConnected ? (
              <div
                className={`relative overflow-hidden ${isDarkMode ? "bg-cyber-black/30" : "bg-white/20"} backdrop-blur-sm`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
                  border: `2px solid ${isDarkMode ? "#0f0" : "#00ff9d"}`,
                  boxShadow: `0 0 10px ${isDarkMode ? "rgba(0, 255, 0, 0.5)" : "rgba(0, 255, 157, 0.5)"}`,
                }}
              >
                <div className="flex justify-between items-center p-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`text-sm font-mono ${isDarkMode ? "text-white/80" : "text-cyber-dark/80"}`}
                    >
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-2xl font-display font-bold ${isDarkMode ? "text-green1" : "text-green1"}`}
                        style={{
                          textShadow: `0 0 5px ${isDarkMode ? "rgba(0, 255, 0, 0.7)" : "rgba(0, 255, 157, 0.7)"}`,
                        }}
                      >
                        {Number(formatEther(userRewards || 0)).toFixed(2)}
                      </span>
                      <span
                        className={`text-sm font-future ${isDarkMode ? "text-white" : "text-cyber-dark"}`}
                      >
                        NODE
                      </span>
              
                      {userRewards > 0 && (
                        <button
                          onClick={handleWithdrawRewards}
                          className={`px-6 py-2 text-sm font-cyber uppercase tracking-wider transition-all duration-300 relative ${isDarkMode ? "bg-green1/20 text-white border-b-2 border-green1" : "bg-green1/20 text-cyber-dark border-b-2 border-green1"}`}
                        >
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <ConnectWallet />
            )}
          </div> */}

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
                    Available Rewards:{" "}
                    {Number(formatEther(userRewards || 0)).toFixed(2)} NODE
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
        </div>
        {/* <Refbnanner referrer={address} /> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative mt-3">
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
              referrerParams={referrerParams}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;

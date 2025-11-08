import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { FaShare } from "react-icons/fa";

const Refbnanner = ({ referrer }) => {
  const { isConnected, address } = useAccount();
  const [linkCopied, setLinkCopied] = useState(false);
  const baseUrl = window.location.origin + window.location.pathname;
  // Use the provided referrer if available, otherwise use the user's address
  const refAddress = referrer || address;
  const referralLink = `${baseUrl}?ref=${refAddress}`;
  const [showReferralModal, setShowReferralModal] = useState(false);

  const handleShare = (e) => {
    if (e) e.stopPropagation(); // Prevent card click event
    // Create referral link with current address and level

    // Fallback to clipboard copy
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setLinkCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setLinkCopied(false), 3000);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
        toast.error("Failed to copy link");
      });
  };

  const toggleReferralModal = () => {
    setShowReferralModal(!showReferralModal);
  };
  return (
    <>
      {isConnected && (
        <motion.div
          className="w-full py-3 bg-gradient-to-r from-green1/20 via-black/80 to-green1/20 backdrop-blur-md border-y border-green1/30 flex items-center justify-center z-50 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background effectsx */}
          <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent animate-pulse-slow"></div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-8 gap-3">
            <div className="flex items-center">
              <span className="text-green1 text-xl mr-2">⚡</span>
              <p className="text-white text-lg font-display">
                Affiliate Program
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative bg-black/50 border border-green1/30 rounded px-3 py-1 max-w-xs overflow-hidden">
                <p className="text-green1/80 text-sm font-mono truncate">
                  {referralLink}
                </p>
              </div>

              <button
                onClick={handleShare}
                className={`px-3 py-1 bg-green1/20 border border-green1 text-white font-display flex items-center gap-2 hover:bg-green1/30 transition-all duration-300 ${linkCopied ? "bg-green1/20 border-green1" : ""}`}
              >
                <FaShare className="text-xs" />
                {linkCopied ? "Copied!" : "Copy Affiliate Link"}
              </button>

              <button
                onClick={toggleReferralModal}
                className="text-green1 hover:text-green1 transition-colors duration-300 ml-2"
              >
                <span className="text-xs">ℹ️</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Referral Modal */}
      {showReferralModal && isConnected && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleReferralModal}
        >
          <motion.div
            className="bg-cyber-dark/90 border-2 border-neon-green/50 p-6 max-w-md w-full mx-4 relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 90%, 95% 100%, 0 100%)",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green via-neon-green to-neon-green"></div>

            <h3 className="text-2xl font-display text-neon-green mb-4">
              Affiliate Program
            </h3>

            <div className="space-y-4 text-white/90">
              <p>
                Share your unique Affiliate link with friends and earn
                commission on their investments!
              </p>

              <div className="bg-black/50 border border-neon-green/30 p-3 rounded">
                <p className="text-sm font-mono break-all text-green1">
                  {referralLink}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-neon-green font-display">How it works:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Share your unique Affiliate link</li>
                  <li>Friends join using your link</li>
                  <li>You earn commission on their investments</li>
                  <li>Commissions are paid instantly to your wallet</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={handleShare}
                className={`px-4 py-2 bg-neon-green/20 border border-green1 text-white font-display flex items-center gap-2 hover:bg-neon-green/30 transition-all duration-300 ${linkCopied ? "bg-neon-green/20 border-neon-green" : ""}`}
              >
                <FaShare className="text-xs" />
                {linkCopied ? "Copied!" : "Copy Link"}
              </button>

              <button
                onClick={toggleReferralModal}
                className="px-4 py-2 bg-black/50 border border-white/20 text-white/80 font-display hover:bg-white/10 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Refbnanner;

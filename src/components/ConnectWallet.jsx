import React, { useState } from "react";
import { useAppKit } from "@reown/appkit/react";
import { motion } from "framer-motion";
import { useAccount, useBalance } from "wagmi";
import { Wallet } from "lucide-react";

const ConnectWallet = ({ isMobile }) => {
  const { open } = useAppKit();
  const [isHovered, setIsHovered] = useState(false);

  const { address, chain, isConnected } = useAccount();

  const { data: balance } = useBalance({
    address,
    unit: "ether",
    chainId: chain?.id,
    token: "0x35024799A05Ed370CE0f8F9b803A5BC0c072E854",
  });

  // ADDRESS FORMAT
  const formattedAddress = address
    ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
    : "Connect Wallet";

  return (
    <motion.button
      className={`relative ${isMobile ? "w-full mt-4 mb-2" : ""} px-6 py-2 font-display text-sm uppercase tracking-wider border-2 border-green1 text-green1 bg-transparent hover:bg-green1/10 transition-all duration-300 overflow-hidden group`}
      style={{
        clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
      }}
      onClick={() => open()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className={`absolute inset-0 bg-green1/0 group-hover:bg-green1/10 transition-colors duration-300`}
      ></div>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {address ? (
          <svg
            className={`w-4 h-4 ${isHovered ? "animate-pulse" : ""} transition-all duration-300`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        ) : (
          <Wallet
            className={`w-4 h-4 ${isHovered ? "animate-pulse" : ""} transition-all duration-300`}
          />
        )}
        {formattedAddress}
        <small className="text-xs">
          {/* 4 decimal places */}
          {isConnected && (
            <>
              {balance?.formatted?.slice(0, 6) || "0.00"}{" "}
              {balance?.symbol || ""}
            </>
          )}
        </small>
      </span>
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-green1"
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

// Set default props
ConnectWallet.defaultProps = {
  isMobile: false,
};

export default ConnectWallet;

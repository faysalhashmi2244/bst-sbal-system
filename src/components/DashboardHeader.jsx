import React, { useState } from "react";
import {
  FaExchangeAlt,
  FaVolumeUp,
  FaPlay,
  FaCircle,
  FaEllipsisV,
} from "react-icons/fa";
import ConnectWallet from "./ConnectWallet";

const DashboardHeader = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div
      className="dashboard-header relative overflow-hidden p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#00aa55]/20 gap-4"
      style={{
        background:
          "linear-gradient(90deg, rgba(13,17,23,0.95) 0%, rgba(20,30,48,0.9) 100%)",
      }}
    >
      {/* Background grid decoration */}
      <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>

      {/* Animated accent lines */}
      <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-[#00aa55] via-[#00aa55] to-transparent"></div>

      <div className="welcome-text relative z-10 w-full md:w-auto">
        <h1 className="text-2xl md:text-3xl font-display tracking-wider">
          <span className="text-white">Welcome to your </span>
          <span className="text-[#0f0]">SBAL</span>
          <span className="text-white"> dashboard</span>
        </h1>
        <div className="mt-1 text-white/60 font-future text-xs md:text-sm tracking-wide">
          BLOCKCHAIN SECURED TRANSACTIONS
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden absolute top-4 right-4 z-20">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-full bg-cyber-dark border border-[#00aa55] flex items-center justify-center"
          style={{
            boxShadow: "0 0 10px rgba(0, 170, 85, 0.3)",
          }}
        >
          <FaEllipsisV className="text-[#00aa55]" />
        </button>
      </div>

      {/* Action Buttons - Desktop and Mobile */}
      <div
        className={`action-buttons w-full md:w-auto flex flex-wrap md:flex-nowrap items-center gap-2 md:space-x-3 relative z-10 ${mobileMenuOpen ? "flex" : "hidden md:flex"}`}
      >
        {/* Token display */}
        <div
          className="BST-token flex items-center p-2 md:p-3 mr-0 md:mr-2 relative overflow-hidden w-full md:w-auto"
          style={{
            background: "rgba(13,17,23,0.7)",
            border: "1px solid rgba(0, 170, 85, 0.3)",
            clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#00aa55]/30"></div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full">
              <span className="text-[#00aa55] font-mono text-xs md:text-sm tracking-wider">
                BST TOKEN (S)
              </span>
              <span className="text-white/60 text-xs font-future md:hidden">
                PRICE: 0
              </span>
            </div>
            <span className="text-white/60 text-xs font-future hidden md:block">
              CURRENT PRICE: 0
            </span>
          </div>
        </div>

        {/* Trade button */}
        <button
          className="relative overflow-hidden px-3 md:px-4 py-2 transition-all duration-300 flex items-center w-[calc(50%-4px)] md:w-auto"
          style={{
            background:
              hoveredButton === "trade"
                ? "rgba(0, 170, 85, 0.2)"
                : "transparent",
            border: "1px solid #00aa55",
            clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
            boxShadow:
              hoveredButton === "trade"
                ? "0 0 10px rgba(0, 170, 85, 0.5)"
                : "none",
          }}
          onMouseEnter={() => setHoveredButton("trade")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <FaExchangeAlt className="text-[#00aa55] mr-1 md:mr-2" />
          <span className="text-[#00aa55] font-future text-xs md:text-sm tracking-wider">
            TRADE
          </span>
        </button>

        {/* Unmute button */}
        {/* <button
          className="relative overflow-hidden px-3 md:px-4 py-2 transition-all duration-300 flex items-center w-[calc(50%-4px)] md:w-auto"
          style={{
            background:
              hoveredButton === "unmute"
                ? "rgba(236, 72, 153, 0.2)"
                : "transparent",
            border: "1px solid #ec4899",
            clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
            boxShadow:
              hoveredButton === "unmute"
                ? "0 0 10px rgba(236, 72, 153, 0.5)"
                : "none",
          }}
          onMouseEnter={() => setHoveredButton("unmute")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <FaVolumeUp className="text-neon-pink mr-1 md:mr-2" />
          <span className="text-neon-pink font-future text-xs md:text-sm tracking-wider">
            UNMUTE
          </span>
        </button> */}

        {/* Play Next button */}
        {/* <button
          className="relative overflow-hidden px-3 md:px-4 py-2 transition-all duration-300 flex items-center w-[calc(50%-4px)] md:w-auto"
          style={{
            background:
              hoveredButton === "play"
                ? "rgba(0, 255, 157, 0.2)"
                : "transparent",
            border: "1px solid #00ff9d",
            clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
            boxShadow:
              hoveredButton === "play"
                ? "0 0 10px rgba(0, 255, 157, 0.5)"
                : "none",
          }}
          onMouseEnter={() => setHoveredButton("play")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <FaPlay className="text-neon-green mr-1 md:mr-2" />
          <span className="text-neon-green font-future text-xs md:text-sm tracking-wider">
            PLAY
          </span>
        </button> */}

        {/* Live Stream button */}
        {/* <button
          className="relative overflow-hidden px-3 md:px-4 py-2 transition-all duration-300 flex items-center w-[calc(50%-4px)] md:w-auto"
          style={{
            background:
              hoveredButton === "live"
                ? "rgba(167, 139, 250, 0.2)"
                : "transparent",
            border: "1px solid #a78bfa",
            clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
            boxShadow:
              hoveredButton === "live"
                ? "0 0 10px rgba(167, 139, 250, 0.5)"
                : "none",
          }}
          onMouseEnter={() => setHoveredButton("live")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <FaCircle className="text-neon-purple mr-1 md:mr-2 animate-pulse" />
          <span className="text-neon-purple font-future text-xs md:text-sm tracking-wider">
            LIVE
          </span>
        </button> */}
        <ConnectWallet />
      </div>
    </div>
  );
};

export default DashboardHeader;

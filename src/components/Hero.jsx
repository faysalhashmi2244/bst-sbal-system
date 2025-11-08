import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";
import { useAccount } from "wagmi";
// import MatrixBackground from "./MatrixBackground";
import BackgroundEffect from "./BackgroundEffects";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
const Hero = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const { isConnected, address } = useAccount();
  const [linkCopied, setLinkCopied] = useState(false);
  const baseUrl = window.location.origin + window.location.pathname;
  const referralLink = `${baseUrl}?ref=${address}`;
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
    <section
      className={`min-h-screen flex items-center justify-center backdrop-blur-sm px-4 pt-20 lg:pt-20  relative ${isDarkMode ? "bg-cyber-black/10" : "bg-cyber-black/30"}`}
      id="home"
    >
      {/* Matrix Background */}
      <BackgroundEffect />

      {/* Background grid decoration */}
      <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>

      {/* Animated accent lines */}
      <div
        className={`absolute left-1/4 top-0 w-0.5 h-full ${isDarkMode ? "bg-green1/10" : "bg-green1/30"}`}
      ></div>
      <div
        className={`absolute right-1/4 top-0 w-0.5 h-full ${isDarkMode ? "bg-green1/10" : "bg-green1/30"}`}
      ></div>

      {/* Decorative corner elements */}
      <div
        className={`absolute top-24 left-10 w-20 h-20 border-l-2 border-t-2 ${isDarkMode ? "border-green1/30" : "border-green1/50"}`}
      ></div>
      <div
        className={`absolute bottom-24 right-10 w-20 h-20 border-r-2 border-b-2 ${isDarkMode ? "border-green1/30" : "border-green1/50"}`}
      ></div>

      <div className="container mx-auto text-center relative z-10">
        {/* add referral link banner */}

        <motion.h1
          className={`text-5xl mt-5 md:text-7xl font-display ${isDarkMode ? "text-white" : "text-cyber-black"} mb-6 tracking-wider`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className={`${isDarkMode ? "text-green1" : "text-cyber-black"} text-shadow-green1`}
          >
            SBAL
          </span>{" "}
          SYSTEM™
        </motion.h1>
        <motion.h2
          className={`${isDarkMode ? "text-white" : "text-cyber-black"} text-2xl md:text-2xl font-display text-shadow-neon-purple mb-6 tracking-wider`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Smart Base Affiliate Loop for the Beast Borne Ecosystem{" "}
        </motion.h2>

        <motion.div
          className={`w-24 h-1 mx-auto mb-8 ${isDarkMode ? "bg-green1" : "bg-neon-green"}`}
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>

        <motion.p
          className={`text-xl md:text-2xl font-future ${isDarkMode ? "text-white/90" : "text-green1"} max-w-3xl mx-auto mb-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          "Activate Once. Earn Forever. Power the Future."
        </motion.p>
        <motion.p
          className={`text-lg md:text-xl font-future ${isDarkMode ? "text-white/80" : "text-green1"} max-w-2xl mx-auto mb-10`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Welcome to the most <strong>innovative</strong>,{" "}
          <strong>impactful</strong>, and <strong>intelligent</strong> crypto
          income loop ever built — not just a project, but a powerhouse fueling
          the Beast Borne universe.
          <br />
          <br />
          <span className="text-green1 font-display tracking-wider mt-3">
            ✅ Community-owned 💎 Backed by real-world GameFi <br /> ⚡ Infinite
            earning model
          </span>
          <br />
          <br />
          <span className="text-green1 font-future">
            SBAL isn’t hype. It’s the engine room of Web3’s smartest economy.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#features"
            className={`px-6 py-3 text-sm border-2 border-green1 bg-transparent ${isDarkMode ? "text-green1" : "text-green1"} font-display uppercase tracking-wider hover:bg-green1/10 transition-all duration-300 relative overflow-hidden group`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
            }}
          >
            <div
              className={`absolute inset-0 bg-green1/0 group-hover:${isDarkMode ? "bg-green1/10" : "bg-green1/20"} transition-colors duration-300`}
            ></div>
            <span className="relative z-10">{t("header.features")}</span>
          </a>
          <Link
            to="/dapp"
            className={`px-6 py-3 text-sm border-2 border-green1 bg-transparent ${isDarkMode ? "text-green1" : "text-green1"} font-display uppercase tracking-wider hover:bg-green1/10 transition-all duration-300 relative overflow-hidden group`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
            }}
          >
            <div
              className={`absolute inset-0 bg-neon-purple/0 group-hover:${isDarkMode ? "bg-neon-purple/10" : "bg-neon-purple/20"} transition-colors duration-300`}
            ></div>
            <span className="relative z-10">{t("hero.button")}</span>
          </Link>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute -top-10 right-10 w-32 h-32 opacity-20 pointer-events-none">
          <div
            className={`absolute top-0 right-0 w-full h-full border-2 ${isDarkMode ? "border-green1" : "border-green1/70"} rounded-full animate-pulse-slow`}
          ></div>
          <div
            className={`absolute top-1/4 right-1/4 w-1/2 h-1/2 border-2 ${isDarkMode ? "border-green1" : "border-green1/70"} rounded-full animate-pulse-slower`}
          ></div>
        </div>

        <div className="absolute bottom-10 left-10 w-24 h-24 opacity-20 pointer-events-none">
          <div
            className={`absolute top-0 left-0 w-full h-full border-2 ${isDarkMode ? "border-green1" : "border-green1/70"} rounded-full animate-pulse-slow`}
          ></div>
          <div
            className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 ${isDarkMode ? "border-green1" : "border-green1/70"} rounded-full animate-pulse-slower`}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

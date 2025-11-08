/** @format */

import { useState, useEffect } from "react";
// We're using motion in the loading screen's motion.div
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";
import { Toaster } from "react-hot-toast";

// Import Components
// import Particles from "./components/Particles";
import BackgroundEffects from "../components/BackgroundEffects";

import Hero from "../components/Hero";
import Features from "../components/Features";
import Timeline from "../components/Timeline";
import Packages from "../components/Packages";
import IncomeStreams from "../components/IncomeStreams";
import WhySBAL from "../components/WhySBAL";
import WithdrawalStructure from "../components/WithdrawalStructure";
import MatrixBackground from "../components/MatrixBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SbalRevolutionary from "../components/SbalRevolutionary";
import PackagesHome from "../components/PackagesHome";
import { FaArrowUp } from "react-icons/fa";

// Inner app component that can use the theme context
export default function Home() {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Set document direction based on current language
    const isRTL = t("direction") === "rtl";
    document.documentElement.dir = t("direction");
    document.documentElement.lang = i18n.language;

    // Apply appropriate font family based on language direction
    if (isRTL) {
      document.body.classList.add("font-arabic");
      document.body.classList.remove("font-future");
    } else {
      document.body.classList.add("font-future");
      document.body.classList.remove("font-arabic");
    }
  }, [i18n.language, t]);

  return (
    <div
      className={
        isDarkMode
          ? "bg-cyber-black text-white"
          : "bg-cyber-white text-cyber-dark"
      }
    >
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? "#1a1a2e" : "#f0f0f5",
            color: isDarkMode ? "#fff" : "#1a1a2e",
            border: `1px solid ${isDarkMode ? "#0f0" : "#0f0"}`,
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#0f0",
              secondary: isDarkMode ? "#1a1a2e" : "#f0f0f5",
            },
          },
          error: {
            iconTheme: {
              primary: "#f00",
              secondary: isDarkMode ? "#1a1a2e" : "#f0f0f5",
            },
          },
        }}
      />
      {/* Replace Particles with BackgroundEffects */}
      <Header />
      <BackgroundEffects />

      <main className="relative z-10">
        <Hero />
        <SbalRevolutionary />
        <Features />
        <IncomeStreams />
        <PackagesHome />
        <Timeline />
        <WithdrawalStructure />
        <WhySBAL />
      </main>
      <Footer />

      {/* arrow up */}
      <div
        className="fixed bottom-6 right-6 z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <button className="p-2 rounded-full bg-green1/30 text-white hover:bg-green1/80 transition-colors duration-300">
          <FaArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

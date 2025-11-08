import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";

const WithdrawalStructure = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  // Withdrawal data
  const withdrawalData = [
    { action: "Deposit", allocation: "100% in BST" },
    { action: "Withdraw Earnings", allocation: "100% in BST" },
    { action: "Optional Reinvestment", allocation: "20% of earnings (BST)" },
    { action: "Activation Bonuses", allocation: "5% in BST" },
    { action: "Withdrawal Fee", allocation: "10% in BST (to LP pool)" },
    // { action: "Wallet Transfers", allocation: "0% fee (BST)" },
  ];

  // SBAL dominance features
  const dominanceFeatures = [
    { feature: "No staking", impact: "Simpler, safer, more accessible" },
    { feature: "One-time payment", impact: "Lifetime entry, no rebuy chains" },
    { feature: "Real players", impact: "Organic growth from real users" },
    { feature: "Leader-friendly", impact: "Works for both hustlers & holders" },
    {
      feature: "Game-integrated",
      impact: "Drives activity in the Beast Borne ecosystem",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Background decorative elements
  const BackgroundEffects = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-green-500/10 blur-3xl"></div>
    </div>
  );

  return (
    <section
      id="withdrawals"
      className={`py-20 relative ${isDarkMode ? "bg-cyber-dark" : "bg-gray-50"}`}
    >
      <BackgroundEffects />

      <div className="container mx-auto max-w-7xl px-4 relative">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl font-bold mb-3 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
          >
            ⚙️ Smart Withdrawals & Auto-Scale Flow
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-6"></div>
          <p
            className={`text-lg max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            All deposits and withdrawals in the SBAL system are handled
            exclusively in BST Coin — the fuel of the Beast Borne ecosystem.
          </p>
        </motion.div>

        {/* Withdrawal Structure Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <div
            className={`overflow-x-auto rounded-xl shadow-xl ${isDarkMode ? "bg-cyber-darker/50 border border-green-900/30" : "bg-white"}`}
          >
            <table className="min-w-full">
              <thead>
                <tr
                  className={`${isDarkMode ? "bg-cyber-darker border-b border-green-900/30" : "bg-gray-100 border-b border-gray-200"}`}
                >
                  <th className="py-4 px-6 text-left font-bold">Action</th>
                  <th className="py-4 px-6 text-left font-bold">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalData.map((item, index) => (
                  <motion.tr
                    key={index}
                    variants={itemVariants}
                    className={`
                      ${
                        isDarkMode
                          ? "border-b border-green-900/30 hover:bg-green-900/20"
                          : "border-b border-gray-100 hover:bg-gray-50"
                      } transition-colors
                    `}
                  >
                    <td className="py-4 px-6 font-medium">{item.action}</td>
                    <td
                      className={`py-4 px-6 font-medium ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                    >
                      {item.allocation}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-xl p-8 shadow-lg mb-16 ${
            isDarkMode
              ? "bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-500/20"
              : "bg-gradient-to-br from-green-50 to-blue-50"
          }`}
        >
          <div className="text-center mb-8">
            <h3
              className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              💰 BST Coin Powers Everything
            </h3>
            <p
              className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Every transaction flows through BST Coin — creating constant
              demand, usage, and utility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              className={`p-6 rounded-lg ${isDarkMode ? "bg-cyber-dark/50" : "bg-white/70"}`}
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">🔁</span>
                <h4
                  className={`text-lg font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                >
                  Complete BST Integration
                </h4>
              </div>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                From activation to withdrawal, your entire journey is powered by
                BST.
              </p>
            </div>

            <div
              className={`p-6 rounded-lg ${isDarkMode ? "bg-cyber-dark/50" : "bg-white/70"}`}
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">⚡</span>
                <h4
                  className={`text-lg font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                >
                  You Control the Flow
                </h4>
              </div>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                You control the flow. The system multiplies it.
              </p>
            </div>
          </div>
        </motion.div>

        {/* SBAL Dominance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3
              className={`text-3xl font-bold mb-3 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              🧲 Why SBAL Dominates the Web3 Space
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto"></div>
          </div>

          <div
            className={`overflow-x-auto rounded-xl shadow-xl ${isDarkMode ? "bg-cyber-darker/50 border border-green-900/30" : "bg-white"}`}
          >
            <table className="min-w-full">
              <thead>
                <tr
                  className={`${isDarkMode ? "bg-cyber-darker border-b border-green-900/30" : "bg-gray-100 border-b border-gray-200"}`}
                >
                  <th className="py-4 px-6 text-left font-bold flex items-center">
                    <span className="mr-2">✅</span> Feature
                  </th>
                  <th className="py-4 px-6 text-left font-bold flex items-center">
                    <span className="mr-2">🔥</span> Real Impact
                  </th>
                </tr>
              </thead>
              <tbody>
                {dominanceFeatures.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`
                      ${
                        isDarkMode
                          ? "border-b border-green-900/30 hover:bg-green-900/20"
                          : "border-b border-gray-100 hover:bg-gray-50"
                      } transition-colors
                    `}
                  >
                    <td
                      className={`py-4 px-6 font-medium ${isDarkMode ? "text-green-400" : "text-blue-600"}`}
                    >
                      {item.feature}
                    </td>
                    <td className="py-4 px-6">{item.impact}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`text-center p-8 rounded-xl shadow-lg ${
            isDarkMode
              ? "bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-500/20"
              : "bg-gradient-to-br from-green-50 to-blue-50"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
          >
            Ready to experience the future of Web3?
          </h3>
          <p
            className={`text-lg mb-6 max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Join SBAL today and be part of the most innovative passive income
            system in crypto.
          </p>
          <button
            className={`
            px-8 py-3 rounded-lg font-bold text-white 
            bg-gradient-to-r from-green-500 to-blue-500 
            hover:from-green-600 hover:to-blue-600
            transform hover:scale-105 transition-all duration-300
            shadow-lg
          `}
          >
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WithdrawalStructure;

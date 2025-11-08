import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import BackgroundEffects from "./BackgroundEffects";

const SbalRevolutionary = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-20 relative overflow-hidden">
      <BackgroundEffects />
      <div className="container mx-auto px-4 relative z-10">
        {/* Main heading with glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 inline-block ${isDarkMode ? "text-[#0f0] text-shadow-green" : "text-cyber-accent text-shadow-cyber"}`}
          >
            <span className="relative inline-block">
              💼 What Makes SBAL Revolutionary?
              <motion.span
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green1 to-transparent"
                initial={{ width: 0, left: "50%" }}
                whileInView={{ width: "100%", left: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </h2>
        </motion.div>

        {/* Two-column layout for first section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card border border-green1/20" : "bg-white border border-cyber-accent/20"}`}
          >
            <div className="space-y-6">
              <p className="text-xl leading-relaxed">
                Every dollar you contribute becomes an{" "}
                <span className="font-bold text-green1">
                  unstoppable multiplier
                </span>
                .
              </p>
              <p className="text-xl leading-relaxed">
                Profits are USD-calculated, BST-delivered, and useable instantly
                inside the Beast Borne economy.
              </p>
              <div
                className={`p-4 rounded-lg ${isDarkMode ? "bg-cyber-black/50 border border-green1/30" : "bg-gray-100"} text-center font-bold text-xl`}
              >
                No speculation. No pump-and-dump. Just utility-powered cashflow.
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3
              className={`text-3xl font-bold mb-6 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              🧩 What Is SBAL?
            </h3>
            <p className="text-lg mb-8 leading-relaxed">
              SBAL stands for{" "}
              <span className="font-bold">Smart Base Affiliate Loop</span>, a
              community-first earning engine designed for massive duplication,
              wealth generation, and ecosystem growth.
            </p>
            <p className="text-lg font-bold mb-4">
              🎯 The more community you activate and engage, the more
              exponential your income becomes.
            </p>
          </motion.div>
        </div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 my-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-black/70 border border-green1/30" : "bg-gray-100"} text-center font-bold text-xl min-w-[150px]`}
            >
              🛒 Buy More
            </motion.div>
            <div className="text-2xl font-bold text-green1">→</div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-black/70 border border-green1/30" : "bg-gray-100"} text-center font-bold text-xl min-w-[150px]`}
            >
              🔗 Refer More
            </motion.div>
            <div className="text-2xl font-bold text-green1">→</div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-black/70 border border-green1/30" : "bg-gray-100"} text-center font-bold text-xl min-w-[150px]`}
            >
              💸 Earn More & Forever
            </motion.div>
          </div>
        </motion.div>

        {/* Final CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`text-center p-8 rounded-xl shadow-lg max-w-3xl mx-auto ${isDarkMode ? "bg-gradient-to-br from-cyber-dark-card to-cyber-black border border-green1/20" : "bg-gradient-to-br from-white to-gray-100"}`}
        >
          <h3 className="text-3xl font-bold mb-6 text-green1">
            Activate Once. Earn Forever.
          </h3>
          <p className="text-lg mb-4 leading-relaxed">
            Just focus on engaging a loyal, expanding community — and let the
            system scale your income.
          </p>
          <p className="text-lg leading-relaxed">
            SBAL isn't just about earnings, it's about fueling the entire Beast
            Borne economy — from NFTs and PvP battles to staking and token
            burning, SBAL is where it all begins.
          </p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-green1/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-green1/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default SbalRevolutionary;

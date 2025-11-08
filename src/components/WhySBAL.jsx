import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";

const WhySBAL = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  // Key benefits
  const benefits = [
    { text: "Community-powered" },
    { text: "Utility-driven" },
    { text: "Future-secure" },
    { text: "1000x Token Value Vision" },
  ];

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
      className={`py-20 relative ${isDarkMode ? "bg-cyber-dark" : "bg-gray-50"}`}
    >
      <BackgroundEffects />

      <div className="container mx-auto max-w-7xl px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-xl p-10 shadow-xl mb-16 text-center ${
            isDarkMode
              ? "bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-500/20"
              : "bg-gradient-to-br from-green-50 to-blue-50"
          }`}
        >
          <h2
            className={`text-4xl font-bold mb-6 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
          >
            🔥 Final Takeaway: SBAL = The Engine of Infinite Flow
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-8"></div>

          <blockquote
            className={`text-3xl italic font-medium mb-10 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
          >
            "Plug in once. Earn forever. Power everything."
          </blockquote>

          <p
            className={`text-xl max-w-3xl mx-auto mb-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            SBAL is the economic starter motor for Beast Borne — and your
            personal income rocket. Whether you're a player, investor, or
            builder, this is the smartest entry into Web3.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className={`p-4 rounded-lg ${isDarkMode ? "bg-cyber-dark/70" : "bg-white/70"} flex items-center justify-center`}
              >
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-2">✅</span>
                  <span
                    className={`font-medium ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    {benefit.text}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySBAL;

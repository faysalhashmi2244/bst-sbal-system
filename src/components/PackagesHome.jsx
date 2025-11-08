import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";

const PackagesHome = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  // Package tiers data
  const packages = [
    {
      tier: "1️⃣",
      name: "Ignite",
      price: "$100",
      reward: "$20",
      booster: "20%",
    },
    { tier: "2️⃣", name: "Blaze", price: "$200", reward: "$42", booster: "21%" },
    { tier: "3️⃣", name: "Surge", price: "$400", reward: "$88", booster: "22%" },
    { tier: "4️⃣", name: "Flux", price: "$800", reward: "$184", booster: "23%" },
    {
      tier: "5️⃣",
      name: "Axis",
      price: "$1,600",
      reward: "$384",
      booster: "24%",
    },
    {
      tier: "6️⃣",
      name: "Core",
      price: "$3,200",
      reward: "$800",
      booster: "25%",
    },
    {
      tier: "7️⃣",
      name: "Sky",
      price: "$5,000",
      reward: "$1,300",
      booster: "26%",
    },
    {
      tier: "8️⃣",
      name: "Vault",
      price: "$7,500",
      reward: "$2,025",
      booster: "27%",
    },
    {
      tier: "9️⃣",
      name: "Shield",
      price: "$10,000",
      reward: "$2,800",
      booster: "28%",
    },
    {
      tier: "🔟",
      name: "Solar",
      price: "$12,000",
      reward: "$3,480",
      booster: "29%",
    },
    {
      tier: "🌠",
      name: "Prime",
      price: "$15,000",
      reward: "$4,500",
      booster: "30%",
    },
  ];

  // Referral levels data
  const referralLevels = [
    { level: "1", reward: "10%" },
    { level: "2", reward: "8%" },
    { level: "3", reward: "5%" },
    { level: "4", reward: "3%" },
    { level: "5", reward: "2%" },
    { level: "6", reward: "1%" },
    { level: "7", reward: "1%" },
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
            🧱 SBAL Packages
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-4"></div>
          <p
            className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Lifetime Access, No Rebills
          </p>
        </motion.div>

        {/* Packages Table */}
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
                  <th className="py-4 px-6 text-left font-bold">Tier</th>
                  <th className="py-4 px-6 text-left font-bold">Name</th>
                  <th className="py-4 px-6 text-left font-bold">Price</th>
                  <th className="py-4 px-6 text-left font-bold">Reward</th>
                  <th className="py-4 px-6 text-left font-bold">Booster %</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg, index) => (
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
                    <td className="py-4 px-6 text-lg">{pkg.tier}</td>
                    <td
                      className={`py-4 px-6 font-medium ${isDarkMode ? "text-green-400" : "text-blue-600"}`}
                    >
                      {pkg.name}
                    </td>
                    <td className="py-4 px-6">{pkg.price} BST</td>
                    <td
                      className={`py-4 px-6 font-medium ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                    >
                      {pkg.reward} BST
                    </td>
                    <td className="py-4 px-6">{pkg.booster}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h3
            className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
          >
            🚀 Buy once. Own forever. Multiply endlessly.
          </h3>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Booster Logic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`rounded-xl p-6 shadow-lg ${isDarkMode ? "bg-cyber-darker/50 border border-green-900/30" : "bg-white"}`}
          >
            <h3
              className={`text-xl font-bold mb-4 flex items-center ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              <span className="mr-2">⚡</span> Booster Logic = Instant
              Breakthrough
            </h3>
            <div
              className={`space-y-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              <p className="font-medium">💥 Refer once = Instant profit</p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Buy Ignite → Refer 1 → Earn $20 BST</li>
                <li>Refer 10 → Earn $200 BST</li>
                <li>Refer 100 → Earn $2,000 BST</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  ✅ No timer
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  ✅ No stake requirement
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  ✅ Just flow
                </span>
              </div>
              <p className="mt-4 font-bold text-lg">
                Fastest ROI system in crypto.
              </p>
            </div>
          </motion.div>

          {/* 7-Level Referral Engine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`rounded-xl p-6 shadow-lg ${isDarkMode ? "bg-cyber-darker/50 border border-green-900/30" : "bg-white"}`}
          >
            <h3
              className={`text-xl font-bold mb-4 flex items-center ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              <span className="mr-2">🤝</span> 7-Level Referral Engine
            </h3>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full">
                <thead>
                  <tr
                    className={`${isDarkMode ? "border-b border-green-900/30" : "border-b border-gray-200"}`}
                  >
                    <th className="py-2 px-4 text-left">Level</th>
                    <th className="py-2 px-4 text-left">Reward %</th>
                  </tr>
                </thead>
                <tbody>
                  {referralLevels.map((level, index) => (
                    <tr
                      key={index}
                      className={`${isDarkMode ? "border-b border-green-900/20" : "border-b border-gray-100"}`}
                    >
                      <td className="py-2 px-4">{level.level}</td>
                      <td className="py-2 px-4">{level.reward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                ✅ Auto-paid
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                ✅ No rank needed
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                ✅ Residual forever
              </span>
            </div>
            <p
              className={`font-bold text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              SBAL grows while you sleep.
            </p>
          </motion.div>

          {/* Ascension Bonus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`rounded-xl p-6 shadow-lg ${isDarkMode ? "bg-cyber-darker/50 border border-green-900/30" : "bg-white"}`}
          >
            <h3
              className={`text-xl font-bold mb-4 flex items-center ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              <span className="mr-2">🎯</span> Ascension Bonus = Your Hustle
              Multiplied
            </h3>
            <div
              className={`space-y-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              <p className="font-medium">
                Earn 10% every time you complete 10 direct referrals at any
                tier.
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>10 Ignite → $1,000 volume → $100 bonus</li>
                <li>100 Ignite → $10,000 volume → $1,000 bonus</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  ✅ Stackable
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  ✅ No cooldowns
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  ✅ Tier-independent
                </span>
              </div>
              <p className="mt-4 font-bold text-lg">
                The harder you push, the higher you rise.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Reinvestment Discount - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`rounded-xl p-6 shadow-lg mb-16 ${isDarkMode ? "bg-cyber-darker/50 border border-green-900/30" : "bg-white"}`}
        >
          <h3
            className={`text-xl font-bold mb-4 flex items-center ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
          >
            <span className="mr-2">🔁</span> Reinvestment Discount = Scale
            Without Spending More
          </h3>
          <div
            className={`space-y-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            <p className="font-medium">
              Use earnings to upgrade packages — with a 20% price cut every
              time.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div
                className={`p-4 rounded-lg ${isDarkMode ? "bg-cyber-dark" : "bg-gray-50"}`}
              >
                <p>Earn $180 BST → Upgrade to Blaze ($200 BST)</p>
              </div>
              <div
                className={`p-4 rounded-lg ${isDarkMode ? "bg-cyber-dark" : "bg-gray-50"}`}
              >
                <p>Earn $360 BST → Upgrade to Surge ($400 BST)</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                ✅ Zero rebuy stress
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                ✅ Income fuels upgrades
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                ✅ Compounding in motion
              </span>
            </div>
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
            Ready to start your SBAL journey?
          </h3>
          <p
            className={`text-lg mb-6 max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Choose your package, activate once, and start building your passive
            income streams today.
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
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesHome;

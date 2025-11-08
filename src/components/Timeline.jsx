import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";

const Timeline = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  // Data for the three levels - 10 Direct Referrals Per Package
  const beginnerData = [
    {
      package: "Ignite",
      base: "$100",
      booster: "$200",
      direct: "$100",
      ascension: "$100",
      total: "$400",
    },
    {
      package: "Blaze",
      base: "$200",
      booster: "$420",
      direct: "$200",
      ascension: "$200",
      total: "$820",
    },
    {
      package: "Surge",
      base: "$400",
      booster: "$880",
      direct: "$400",
      ascension: "$400",
      total: "$1,680",
    },
    {
      package: "Flux",
      base: "$800",
      booster: "$1,840",
      direct: "$800",
      ascension: "$800",
      total: "$3,440",
    },
    {
      package: "Axis",
      base: "$1,600",
      booster: "$3,840",
      direct: "$1,600",
      ascension: "$1,600",
      total: "$7,040",
    },
    {
      package: "Core",
      base: "$3,200",
      booster: "$8,000",
      direct: "$3,200",
      ascension: "$3,200",
      total: "$14,400",
    },
    {
      package: "Sky",
      base: "$5,000",
      booster: "$13,000",
      direct: "$5,000",
      ascension: "$5,000",
      total: "$23,000",
    },
    {
      package: "Vault",
      base: "$7,500",
      booster: "$20,250",
      direct: "$7,500",
      ascension: "$7,500",
      total: "$35,250",
    },
    {
      package: "Shield",
      base: "$10,000",
      booster: "$28,000",
      direct: "$10,000",
      ascension: "$10,000",
      total: "$48,000",
    },
    {
      package: "Solar",
      base: "$12,000",
      booster: "$34,800",
      direct: "$12,000",
      ascension: "$12,000",
      total: "$58,800",
    },
    {
      package: "Prime",
      base: "$15,000",
      booster: "$42,000",
      direct: "$15,000",
      ascension: "$15,000",
      total: "$72,000",
    },
  ];

  // Data for 30 Direct Referrals Per Package
  const growthData = [
    {
      package: "Ignite",
      base: "$100",
      booster: "$600",
      direct: "$300",
      ascension: "$300",
      total: "$1,200",
    },
    {
      package: "Blaze",
      base: "$200",
      booster: "$1,260",
      direct: "$600",
      ascension: "$600",
      total: "$2,460",
    },
    {
      package: "Surge",
      base: "$400",
      booster: "$2,640",
      direct: "$1,200",
      ascension: "$1,200",
      total: "$5,040",
    },
    {
      package: "Flux",
      base: "$800",
      booster: "$5,520",
      direct: "$2,400",
      ascension: "$2,400",
      total: "$10,320",
    },
    {
      package: "Axis",
      base: "$1,600",
      booster: "$11,520",
      direct: "$4,800",
      ascension: "$4,800",
      total: "$21,120",
    },
    {
      package: "Core",
      base: "$3,200",
      booster: "$24,000",
      direct: "$9,600",
      ascension: "$9,600",
      total: "$43,200",
    },
    {
      package: "Sky",
      base: "$5,000",
      booster: "$39,000",
      direct: "$15,000",
      ascension: "$15,000",
      total: "$69,000",
    },
    {
      package: "Vault",
      base: "$7,500",
      booster: "$60,750",
      direct: "$22,500",
      ascension: "$22,500",
      total: "$105,750",
    },
    {
      package: "Shield",
      base: "$10,000",
      booster: "$84,000",
      direct: "$30,000",
      ascension: "$30,000",
      total: "$144,000",
    },
    {
      package: "Solar",
      base: "$12,000",
      booster: "$104,400",
      direct: "$36,000",
      ascension: "$36,000",
      total: "$176,400",
    },
    {
      package: "Prime",
      base: "$15,000",
      booster: "$126,000",
      direct: "$45,000",
      ascension: "$45,000",
      total: "$216,000",
    },
  ];

  // Data for 100 Direct Referrals Per Package
  const legendData = [
    {
      package: "Ignite",
      base: "$100",
      booster: "$2,000",
      direct: "$1,000",
      ascension: "$1,000",
      total: "$4,000",
    },
    {
      package: "Blaze",
      base: "$200",
      booster: "$4,200",
      direct: "$2,000",
      ascension: "$2,000",
      total: "$8,200",
    },
    {
      package: "Surge",
      base: "$400",
      booster: "$8,800",
      direct: "$4,000",
      ascension: "$4,000",
      total: "$16,800",
    },
    {
      package: "Flux",
      base: "$800",
      booster: "$18,400",
      direct: "$8,000",
      ascension: "$8,000",
      total: "$34,400",
    },
    {
      package: "Axis",
      base: "$1,600",
      booster: "$38,400",
      direct: "$16,000",
      ascension: "$16,000",
      total: "$70,400",
    },
    {
      package: "Core",
      base: "$3,200",
      booster: "$80,000",
      direct: "$32,000",
      ascension: "$32,000",
      total: "$144,000",
    },
    {
      package: "Sky",
      base: "$5,000",
      booster: "$130,000",
      direct: "$50,000",
      ascension: "$50,000",
      total: "$230,000",
    },
    {
      package: "Vault",
      base: "$7,500",
      booster: "$202,500",
      direct: "$75,000",
      ascension: "$75,000",
      total: "$352,500",
    },
    {
      package: "Shield",
      base: "$10,000",
      booster: "$280,000",
      direct: "$100,000",
      ascension: "$100,000",
      total: "$480,000",
    },
    {
      package: "Solar",
      base: "$12,000",
      booster: "$348,000",
      direct: "$120,000",
      ascension: "$120,000",
      total: "$588,000",
    },
    {
      package: "Prime",
      base: "$15,000",
      booster: "$420,000",
      direct: "$150,000",
      ascension: "$150,000",
      total: "$720,000",
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

  // Table component to reuse for each level
  const EarningsTable = ({ data, levelColor }) => (
    <div
      className={`overflow-x-auto rounded-xl shadow-xl ${isDarkMode ? "bg-cyber-darker/50 border border-green-900/30" : "bg-white"}`}
    >
      <table className="min-w-full">
        <thead>
          <tr
            className={`${isDarkMode ? "bg-cyber-darker border-b border-green-900/30" : "bg-gray-100 border-b border-gray-200"}`}
          >
            <th className="py-4 px-4 text-left font-bold">Package</th>
            <th className="py-4 px-4 text-left font-bold">Base</th>
            <th className="py-4 px-4 text-left font-bold">Booster</th>
            <th className="py-4 px-4 text-left font-bold">Direct</th>
            <th className="py-4 px-4 text-left font-bold">Ascension</th>
            <th className="py-4 px-4 text-left font-bold">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`
                ${
                  isDarkMode
                    ? "border-b border-green-900/30 hover:bg-green-900/20"
                    : "border-b border-gray-100 hover:bg-gray-50"
                } transition-colors
              `}
            >
              <td className={`py-3 px-4 font-medium ${levelColor}`}>
                {item.package}
              </td>
              <td className="py-3 px-4">{item.base} BST</td>
              <td className="py-3 px-4">{item.booster} BST</td>
              <td className="py-3 px-4">{item.direct} BST</td>
              <td className="py-3 px-4">{item.ascension} BST</td>
              <td className={`py-3 px-4 font-bold ${levelColor}`}>
                {item.total} BST
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <section
      id="how-it-works"
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
            🌐 How SBAL System Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-6"></div>
          <p
            className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            📈 Simple Start. Instant Boost. Pure Passive Income with Community!
          </p>
          <p
            className={`text-lg max-w-3xl mx-auto mt-2 ${isDarkMode ? "text-green-400" : "text-green-600"} font-medium`}
          >
            💎 3 Income Streams. 1 Smart Loop. 0 Effort Repetition.
          </p>
        </motion.div>

        {/* Beginner Level Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3
              className={`text-3xl font-bold mb-3 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              💥 SBAL Power Earnings Blueprint — 10 Direct Referrals Per Package
            </h3>
            <p
              className={`text-lg font-medium mb-6 ${isDarkMode ? "text-green-400" : "text-green-600"}`}
            >
              🔥 Build Once. Earn Massive. Duplicate Fast.
            </p>
          </div>

          <EarningsTable
            data={beginnerData}
            levelColor={isDarkMode ? "text-blue-400" : "text-blue-600"}
          />

          <div className="text-right mt-4">
            <p
              className={`text-lg font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}
            >
              🎯 Total Earnings with 10 Referrals Across All 11 Packages:
              <br />
              💸 Grand Total = $264,870 BST
            </p>
          </div>
        </motion.div>

        {/* Growth Level Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3
              className={`text-3xl font-bold mb-3 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              🔥 SBAL Earnings — 30 Direct Referrals Per Package
            </h3>
            <p
              className={`text-lg font-medium mb-6 ${isDarkMode ? "text-green-400" : "text-green-600"}`}
            >
              💼 Triple Power. Triple Impact.
            </p>
          </div>

          <EarningsTable
            data={growthData}
            levelColor={isDarkMode ? "text-purple-400" : "text-purple-600"}
          />

          <div className="text-right mt-4">
            <p
              className={`text-lg font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}
            >
              🎯 Total Earnings with 30 Referrals Across All 11 Packages:
              <br />
              💸 Grand Total = $794,550 BST
            </p>
          </div>
        </motion.div>

        {/* Legend Level Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3
              className={`text-3xl font-bold mb-3 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              🔥 SBAL Earnings — 100 Direct Referrals Per Package
            </h3>
            <p
              className={`text-lg font-medium mb-6 ${isDarkMode ? "text-green-400" : "text-green-600"}`}
            >
              🚀 Maximum Duplication. Ultimate Scale.
            </p>
          </div>

          <EarningsTable
            data={legendData}
            levelColor={isDarkMode ? "text-amber-400" : "text-amber-600"}
          />

          <div className="text-right mt-4">
            <p
              className={`text-lg font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}
            >
              🎯 Total Earnings with 100 Referrals Across All 11 Packages:
              <br />
              💸 Grand Total = $2,648,300 BST
            </p>
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
            Choose your level, build your network, and watch your passive income
            grow exponentially.
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

export default Timeline;

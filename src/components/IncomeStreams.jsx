import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";

const IncomeStreams = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  // Feature cards data
  const features = [
    {
      icon: "🔌",
      title: "Plug-and-Profit",
      description: "Lifetime income from one activation",
    },
    {
      icon: "🌐",
      title: "GameFi-Integrated",
      description: "Powers NFTs, staking, and PvP economy",
    },
    {
      icon: "⚡",
      title: "Instant Earnings",
      description: "Rewards begin instantly, no delays",
    },
    {
      icon: "🌱",
      title: "Infinite Loop",
      description: "Income, gameplay, upgrades — all recycled",
    },
  ];

  // Income streams data
  const incomeStreams = [
    {
      number: "1️⃣",
      title: "Activation Bonus",
      description: "Earn 5% instantly from every new member you activate",
    },
    {
      number: "2️⃣",
      title: "Booster Income",
      description: "Refer once and unlock direct profit instantly — no delay",
    },
    {
      number: "3️⃣",
      title: "7-Level Affiliate Income",
      description:
        "Build a community → earn up to 7 levels deep on every activation",
    },
    {
      number: "4️⃣",
      title: "Ascension Bonus",
      description:
        "Get 10% bonus for every 10 direct sales — stackable, unlimited",
    },
    {
      number: "5️⃣",
      title: "Reinvestment Discount",
      description:
        "Use your earnings to upgrade with 20% discount — no fresh money required",
    },
  ];

  return (
    <section
      className={`py-20 px-4 ${isDarkMode ? "bg-cyber-black" : "bg-cyber-white"} relative overflow-hidden`}
      id="income-streams"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-green1/10 filter blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-green1/10 filter blur-3xl"></div>

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
          >
            <span className="relative inline-block">
              💎 Why SBAL Is a League Above
              <motion.span
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green1 to-transparent"
                initial={{ width: 0, left: "50%" }}
                whileInView={{ width: "100%", left: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
        </motion.div>

        {/* Features grid */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card border border-green1/20" : "bg-white border border-cyber-accent/20"}`}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">{feature.icon}</span>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Income Streams section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              <span className="relative inline-block">
                💸 💸💸 5 Automated Earning Streams – Powered by You
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green1 to-transparent"
                  initial={{ width: 0, left: "50%" }}
                  whileInView={{ width: "100%", left: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </span>
            </h2>
          </div>

          {/* Income streams table */}
          <div className="overflow-x-auto mb-12">
            <table
              className={`w-full border-collapse ${isDarkMode ? "text-white" : "text-cyber-dark"}`}
            >
              <thead>
                <tr
                  className={`${isDarkMode ? "bg-cyber-dark-card" : "bg-gray-100"}`}
                >
                  <th className="p-4 text-left border-b border-green1/30 w-[15%]">
                    Stream #
                  </th>
                  <th className="p-4 text-left border-b border-green1/30 w-[25%]">
                    Income Stream
                  </th>
                  <th className="p-4 text-left border-b border-green1/30 w-[60%]">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {incomeStreams.map((stream, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`${index % 2 === 0 ? (isDarkMode ? "bg-cyber-dark-card/50" : "bg-gray-50") : ""} hover:bg-green1/10`}
                  >
                    <td className="p-4 border-b border-green1/10">
                      {stream.number}
                    </td>
                    <td className="p-4 border-b border-green1/10 font-medium">
                      {stream.title}
                    </td>
                    <td className="p-4 border-b border-green1/10">
                      {stream.description}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Motivational callouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card/80 border border-green1/20" : "bg-white border border-green1/20"} text-center`}
            >
              <p className="text-xl font-bold">
                💡 The more community you build, the more explosive your
                earnings become.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card/80 border border-green1/20" : "bg-white border border-green1/20"} text-center`}
            >
              <p className="text-xl font-bold">
                💥 SBAL is made to create massive financial success — for the
                people, by the people — with real use cases behind BST Coin.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <div
              className={`inline-block p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-gradient-to-r from-cyber-dark-card to-cyber-black border border-green1/20" : "bg-gradient-to-r from-white to-gray-100 border border-green1/10"}`}
            >
              <p className="text-2xl font-bold text-green1">
                💡 You earn. You scale. You repeat.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Activation Bonus Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div
            className={`p-8 rounded-xl shadow-xl ${isDarkMode ? "bg-gradient-to-br from-cyber-dark-card to-cyber-black border border-green1/20" : "bg-gradient-to-br from-white to-gray-100"} max-w-4xl mx-auto`}
          >
            <h3 className="text-3xl font-bold mb-6 text-center text-green1">
              🟢 Activation Bonus – 5% Instant Income in BST Coin
            </h3>

            <div className="mb-8 text-center">
              <div
                className={`inline-block p-4 rounded-lg ${isDarkMode ? "bg-cyber-black/70 border border-green1/30" : "bg-white border border-green1/10"} text-xl font-bold mb-6`}
              >
                💥 Instant 5% BST Coin Profit
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-6">
              Every time someone joins your SBAL network and purchases any
              package — from Ignite to Prime — you immediately receive 5% of
              that package value in BST Coins, credited directly to your wallet.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-lg ${isDarkMode ? "bg-cyber-black/70 border border-green1/30" : "bg-gray-100"} text-center`}
              >
                <p className="font-bold">No Delays</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-lg ${isDarkMode ? "bg-cyber-black/70 border border-green1/30" : "bg-gray-100"} text-center`}
              >
                <p className="font-bold">No Caps</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-lg ${isDarkMode ? "bg-cyber-black/70 border border-green1/30" : "bg-gray-100"} text-center`}
              >
                <p className="font-bold">Pure Profit</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IncomeStreams;

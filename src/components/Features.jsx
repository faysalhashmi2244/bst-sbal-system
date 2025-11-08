import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";

const Features = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`py-20 px-4 ${isDarkMode ? "bg-cyber-black" : "bg-cyber-white"} relative overflow-hidden`}
      id="features"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-green1/10 filter blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-green1/10 filter blur-3xl"></div>

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Beast Borne Ecosystem Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              <span className="relative inline-block">
                🧠 The Beast Borne Ecosystem — Activated by SBAL
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

          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl text-center mb-10">
              SBAL channels new users and BST Coin into:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NFTs Feature */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card border border-green1/20" : "bg-white border border-cyber-accent/20"}`}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">🧬</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">12,000+ NFTs</h3>
                    <p>Breed, lease, merge, and evolve</p>
                  </div>
                </div>
              </motion.div>

              {/* GameFi Feature */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card border border-green1/20" : "bg-white border border-cyber-accent/20"}`}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">🎮</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      PvP GameFi Battles
                    </h3>
                    <p>Earn BST by winning and ranking</p>
                  </div>
                </div>
              </motion.div>

              {/* Staking Feature */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card border border-green1/20" : "bg-white border border-cyber-accent/20"}`}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">💹</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Staking DApp</h3>
                    <p>Lock tokens to generate real passive income</p>
                  </div>
                </div>
              </motion.div>

              {/* Marketplace Feature */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card border border-green1/20" : "bg-white border border-cyber-accent/20"}`}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">🛒</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Marketplace</h3>
                    <p>Spend BST inside the Beast Borne world</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div
              className={`mt-10 p-5 rounded-lg ${isDarkMode ? "bg-cyber-black/70 border border-green1/30" : "bg-gray-100"} text-center`}
            >
              <p className="text-xl font-bold">
                SBAL brings in energy. The ecosystem multiplies it.
              </p>
            </div>
          </div>
        </motion.div>

        {/* BST Coin Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              <span className="relative inline-block">
                💠 BST COIN — Usability, Utility & Vision
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

          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl text-center mb-10">
              BST Coin is the lifeblood of the entire ecosystem. Its use cases
              include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Gameplay Feature */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card border border-green1/20" : "bg-white border border-cyber-accent/20"}`}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">🎮</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Gameplay Currency
                    </h3>
                    <p>For Beast Borne PvP combat and rewards</p>
                  </div>
                </div>
              </motion.div>

              {/* Payment Feature */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card border border-green1/20" : "bg-white border border-cyber-accent/20"}`}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">🛍️</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Payment Method</h3>
                    <p>For NFTs, marketplace items, breeding, and merging</p>
                  </div>
                </div>
              </motion.div>

              {/* Staking Feature */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card border border-green1/20" : "bg-white border border-cyber-accent/20"}`}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">🏦</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Staking Token</h3>
                    <p>Used for staking and compounding returns</p>
                  </div>
                </div>
              </motion.div>

              {/* Utility Feature */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card border border-green1/20" : "bg-white border border-cyber-accent/20"}`}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">🔄</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Utility Token</h3>
                    <p>
                      For renting NFTs, battle upgrades, and cross-platform
                      integration
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Future Roadmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className={`p-8 rounded-xl shadow-lg ${isDarkMode ? "bg-gradient-to-br from-cyber-dark-card to-cyber-black border border-green1/20" : "bg-gradient-to-br from-white to-gray-100"} text-center`}
            >
              <h3 className="text-3xl font-bold mb-6 text-green1">
                Future Roadmap: 1 BST = $1,000?
              </h3>
              <p className="text-lg mb-6">
                This is not a guess. It's a challenge to the community.
              </p>
              <p className="text-lg mb-6">
                If 1 million active users use BST daily in gameplay, NFTs,
                staking, and reinvestment, demand will skyrocket. With only a
                limited token supply and unlimited utility, the community drives
                value.
              </p>
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold mb-2 text-green1">
                  The goal: $1,000 per BST.
                </p>
                <p className="text-lg">
                  🌐 Built not by speculation — but by massive adoption,
                  utility, and real demand.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Unshakeable by Design Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-12">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-[#0f0]" : "text-cyber-accent"}`}
            >
              <span className="relative inline-block">
                🛡️ Unshakeable by Design
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

          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-center mb-10">
              Even in volatile markets, SBAL stands strong:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* What we DON'T do */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card/80 border border-red-500/20" : "bg-white border border-red-500/20"}`}
              >
                <h3 className="text-xl font-bold mb-4 text-center text-red-500">
                  We Don't Use
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <span className="text-red-500 text-xl mr-2">❌</span>
                    <span>No rebuy pressure</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 text-xl mr-2">❌</span>
                    <span>No token locks</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 text-xl mr-2">❌</span>
                    <span>No staking tricks</span>
                  </li>
                </ul>
              </motion.div>

              {/* What we DO */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-dark-card/80 border border-green1/20" : "bg-white border border-green1/20"}`}
              >
                <h3 className="text-xl font-bold mb-4 text-center text-green1">
                  We Deliver
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <span className="text-green1 text-xl mr-2">✅</span>
                    <span>100% Real users</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green1 text-xl mr-2">✅</span>
                    <span>Instant liquidity</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green1 text-xl mr-2">✅</span>
                    <span>Transparent earnings</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`inline-block p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-cyber-black/80 border border-green1/30" : "bg-gray-100"} text-center font-bold text-xl`}
              >
                Your effort = your reward. Period.
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

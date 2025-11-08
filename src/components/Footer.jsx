import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";
import {
  FaTwitter,
  FaDiscord,
  FaTelegram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import { RiArrowRightUpLine } from "react-icons/ri";

const Footer = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const hoverEffect = `relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-green1 after:to-neon-blue hover:after:w-full after:transition-all after:duration-300 cursor-pointer`;

  return (
    <footer
      className={`${isDarkMode ? "bg-cyber-black" : "bg-cyber-white"} border-t ${isDarkMode ? "border-green1/50" : "border-green1/50"} py-16 px-4 relative overflow-hidden`}
    >
      {/* Background grid decoration */}
      <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>

      {/* Animated accent lines */}
      <div
        className={`absolute left-0 top-0 w-1 h-full ${isDarkMode ? "bg-green1/20" : "bg-green1/20"}`}
      ></div>
      <div
        className={`absolute right-0 top-0 w-1 h-full ${isDarkMode ? "bg-green1/20" : "bg-green1/20"}`}
      ></div>

      {/* Glowing orb decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-green1/20 to-neon-blue/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-neon-blue/20 to-green1/10 blur-3xl"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Column 1: Logo and Social Links */}
          <motion.div variants={itemVariants} className="relative">
            <div className="flex items-center mb-6">
              <div className="relative group mr-3">
                <div className="absolute -inset-2 bg-gradient-to-r from-green1/20 to-neon-blue/20 rounded-lg blur-sm group-hover:blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative">
                  <img
                    src="/logo.jpg"
                    className="w-14 h-14 rounded-lg border border-green1/50 p-1 bg-black/20 backdrop-blur-sm"
                    alt="SBAL Logo"
                  />
                </div>
              </div>
              <h3 className="text-xl font-display tracking-wider">
                <span className="text-green1 text-shadow-green1 font-bold">
                  SBAL SYSTEM
                </span>
              </h3>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-green1/80 to-transparent mb-5"></div>

            <p
              className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} mb-6 font-future text-sm leading-relaxed`}
            >
              {t("hero.title")} {t("hero.subtitle")}
            </p>

            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} hover:text-green1 transition-all duration-300 transform hover:scale-110`}
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} hover:text-neon-blue transition-all duration-300 transform hover:scale-110`}
                aria-label="Discord"
              >
                <FaDiscord className="h-5 w-5" />
              </a>
              <a
                href="#"
                className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} hover:text-green1 transition-all duration-300 transform hover:scale-110`}
                aria-label="Telegram"
              >
                <FaTelegram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} hover:text-neon-blue transition-all duration-300 transform hover:scale-110`}
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
            </div>

            <div className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-green1/10 to-neon-blue/10 border border-green1/30 backdrop-blur-sm">
              <span
                className={`${isDarkMode ? "text-white/80" : "text-cyber-dark/80"} text-xs font-mono`}
              >
                © {new Date().getFullYear()} BST SBAL
              </span>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="relative">
            <h4 className="text-lg font-display mb-6 tracking-wider text-green1 font-bold">
              {t("footer.quickLinks", "Quick Links")}
            </h4>
            <div className="h-px w-24 bg-gradient-to-r from-green1/80 to-transparent mb-5"></div>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} hover:text-green1 transition-colors flex items-center ${hoverEffect} font-future text-sm`}
                >
                  <HiChevronRight className="mr-2 text-green1" />
                  {t("header.features")}
                </a>
              </li>
              <li>
                <a
                  href="#income-streams"
                  className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} hover:text-green1 transition-colors flex items-center ${hoverEffect} font-future text-sm`}
                >
                  <HiChevronRight className="mr-2 text-green1" />
                  {t("header.income")}
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} hover:text-green1 transition-colors flex items-center ${hoverEffect} font-future text-sm`}
                >
                  <HiChevronRight className="mr-2 text-neon-blue" />
                  {t("header.how", "How it works")}
                </a>
              </li>
              <li>
                <a
                  href="#withdrawals"
                  className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} hover:text-green1 transition-colors flex items-center ${hoverEffect} font-future text-sm`}
                >
                  <HiChevronRight className="mr-2 text-neon-blue" />
                  {t("header.withdrawals", "Withdrawals")}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Features */}
          <motion.div variants={itemVariants} className="relative">
            <h4 className="text-lg font-display mb-6 tracking-wider text-green1 font-bold">
              {t("features.title")}
            </h4>
            <div className="h-px w-24 bg-gradient-to-r from-green1/80 to-transparent mb-5"></div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green1 mr-2 mt-0.5">✓</span>
                <span
                  className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} font-future text-sm`}
                >
                  {t("features.card1.title")}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2 mt-0.5">✓</span>
                <span
                  className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} font-future text-sm`}
                >
                  {t("features.card2.title")}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green1 mr-2 mt-0.5">✓</span>
                <span
                  className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} font-future text-sm`}
                >
                  {t("features.card3.title")}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2 mt-0.5">✓</span>
                <span
                  className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} font-future text-sm`}
                >
                  {t("features.card4.title")}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green1 mr-2 mt-0.5">✓</span>
                <span
                  className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} font-future text-sm`}
                >
                  {t("whysbal.reason1")}
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Contact & Newsletter */}
          <motion.div variants={itemVariants} className="relative">
            <h4 className="text-lg font-display mb-6 tracking-wider text-green1 font-bold">
              {t("footer.stayConnected", "Stay Connected")}
            </h4>
            <div className="h-px w-24 bg-gradient-to-r from-green1/80 to-transparent mb-5"></div>

            <div className="mb-6">
              <p
                className={`${isDarkMode ? "text-white/70" : "text-cyber-dark/70"} font-future text-sm mb-3`}
              >
                {
                  (t("footer.subscribeText"),
                  "Subscribe to our newsletter for updates")
                }
              </p>

              <div className="flex">
                <input
                  type="email"
                  placeholder={(t("footer.emailPlaceholder"), "Your email")}
                  className={`flex-1 px-4 py-2 rounded-l-md ${isDarkMode ? "bg-cyber-dark border-green1/30 text-white" : "bg-white border-green1/30 text-cyber-dark"} border focus:outline-none focus:border-green1 text-sm font-future`}
                />
                <button className="px-4 py-2 rounded-r-md bg-gradient-to-r from-green1 to-neon-blue text-white font-future text-sm hover:from-neon-blue hover:to-green1 transition-all duration-300">
                  {(t("footer.subscribe"), "Subscribe")}
                </button>
              </div>
            </div>

            <div className="flex space-y-6 flex-col">
              <a
                href="#"
                className={`${isDarkMode ? "text-white/50" : "text-cyber-dark/50"} hover:text-green1 transition-colors text-sm font-mono ${hoverEffect}`}
              >
                {t("footer.privacy", "Privacy Policy")}
              </a>
              <a
                href="#"
                className={`${isDarkMode ? "text-white/50" : "text-cyber-dark/50"} hover:text-neon-blue transition-colors text-sm font-mono ${hoverEffect}`}
              >
                {t("footer.terms", "Terms of Service")}
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className={`mt-16 pt-8 border-t ${isDarkMode ? "border-gray-800" : "border-gray-300"} text-center`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p
              className={`${isDarkMode ? "text-white/50" : "text-cyber-dark/50"} font-mono text-sm mb-4 md:mb-0`}
            >
              &copy; {new Date().getFullYear()} BST SBAL SYSTEM.{" "}
              {t("footer.rights")}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green1/5 to-neon-blue/5 border border-green1/10">
              <span
                className={`text-xs ${isDarkMode ? "text-white/30" : "text-cyber-dark/30"} font-mono`}
              >
                {t("footer.poweredBy", "Powered by")}{" "}
                <span className="text-green1">BST Coin</span> |{" "}
                {t("footer.web3", "Web3 Technology")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

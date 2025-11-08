import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../ThemeContext";
import ConnectWallet from "./ConnectWallet";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAccount } from "wagmi";
import { HiMenu, HiX } from "react-icons/hi";
import { RiArrowRightUpLine } from "react-icons/ri";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileButtonRef = useRef(null);

  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        mobileButtonRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !mobileButtonRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { href: "/#features", label: t("header.why") },
    { href: "/#income-streams", label: t("header.income") },
    { href: "/#packages", label: t("header.packages") },
    { href: "/#withdrawals", label: t("header.withdrawals") },
    { href: "/#timeline", label: t("header.timeline") },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDarkMode
              ? "bg-cyber-black/95 backdrop-blur-xl border-b border-green1/30 shadow-lg shadow-green1/10"
              : "bg-cyber-white/95 backdrop-blur-xl border-b border-green1/30 shadow-lg shadow-green1/10"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Background grid decoration */}
        <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>

        {/* Glowing accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-green1 to-transparent"
          initial={{ width: "0%" }}
          animate={{ width: scrolled ? "100%" : "0%" }}
          transition={{ duration: 0.5 }}
        />

        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <motion.div
              className="flex items-center relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-green1/20 to-neon-blue/20 rounded-lg blur-sm group-hover:blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <Link
                to="/"
                className="relative flex items-center gap-3 text-xl lg:text-2xl font-display tracking-wider"
              >
                <div className="relative">
                  <img
                    src="/logo.jpg"
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg border border-green1/50 p-1 bg-black/20 backdrop-blur-sm"
                    alt="SBAL Logo"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-green1/30 to-neon-blue/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                </div>
                <span
                  className={`${isDarkMode ? "text-green1" : "text-cyber-black"} font-bold bg-gradient-to-r from-green1 to-neon-blue bg-clip-text text-transparent`}
                >
                  SBAL SYSTEM
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <HashLink
                    to={item.href}
                    className={`font-future text-sm lg:text-base ${
                      isDarkMode ? "text-white/80" : "text-cyber-dark/80"
                    } hover:text-green1 transition-all duration-300 relative group py-2 px-3 rounded-md hover:bg-green1/5`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green1 to-neon-blue transition-all duration-300 group-hover:w-full"></span>
                  </HashLink>
                </motion.div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <ThemeToggle />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HashLink
                  to="/dapp"
                  className="inline-flex items-center px-4 py-2 text-sm font-display uppercase tracking-wider border-2 border-green1 bg-transparent text-green1 hover:bg-green1/10 transition-all duration-300 rounded-md relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    {t("header.dapp", "Dapp")}
                    <RiArrowRightUpLine className="ml-2 h-4 w-4" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green1/0 via-green1/5 to-green1/0 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </HashLink>
              </motion.div>
              <ConnectWallet />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              ref={mobileButtonRef}
              onClick={toggleMobileMenu}
              className={`lg:hidden p-2 rounded-md ${
                isDarkMode ? "text-white/80" : "text-cyber-dark/80"
              } hover:text-green1 transition-colors duration-300 relative`}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-6 h-6">
                <motion.div
                  animate={
                    mobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }
                  }
                  className="absolute w-6 h-0.5 bg-current rounded-full"
                />
                <motion.div
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute w-6 h-0.5 bg-current rounded-full top-1/2 -translate-y-1/2"
                />
                <motion.div
                  animate={
                    mobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }
                  }
                  className="absolute w-6 h-0.5 bg-current rounded-full bottom-0"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            className={`fixed inset-0 z-40 lg:hidden ${
              isDarkMode ? "bg-cyber-black/95" : "bg-cyber-white/95"
            } backdrop-blur-xl`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full pt-20 pb-8 px-6">
              {/* Background decoration */}
              <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>

              {/* Corner decorations */}
              <div
                className={`absolute top-20 left-6 w-8 h-8 border-t-2 border-l-2 ${isDarkMode ? "border-green1" : "border-green1"}`}
              ></div>
              <div
                className={`absolute top-20 right-6 w-8 h-8 border-t-2 border-r-2 ${isDarkMode ? "border-green1" : "border-green1"}`}
              ></div>
              <div
                className={`absolute bottom-8 left-6 w-8 h-8 border-b-2 border-l-2 ${isDarkMode ? "border-green1" : "border-green1"}`}
              ></div>
              <div
                className={`absolute bottom-8 right-6 w-8 h-8 border-b-2 border-r-2 ${isDarkMode ? "border-green1" : "border-green1"}`}
              ></div>

              {/* Navigation Items */}
              <nav className="flex-1 flex flex-col justify-center space-y-6 relative z-10">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <HashLink
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block font-future text-xl ${
                        isDarkMode ? "text-white/80" : "text-cyber-dark/80"
                      } hover:text-green1 transition-all duration-300 py-4 px-6 relative overflow-hidden group border border-transparent hover:border-green1/30 rounded-lg`}
                    >
                      <span className="relative z-10 flex items-center">
                        <span className="w-2 h-2 bg-green1 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {item.label}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green1/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    </HashLink>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Actions */}
              <motion.div
                className="space-y-4 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-green1/20">
                  <span
                    className={`font-future text-base ${isDarkMode ? "text-white/80" : "text-cyber-dark/80"}`}
                  >
                    Theme:
                  </span>
                  <ThemeToggle />
                </div>

                <HashLink
                  to="/dapp"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 text-base font-display uppercase tracking-wider border-2 border-green1 bg-transparent text-green1 hover:bg-green1/10 transition-all duration-300 rounded-lg relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {t("header.dapp", "Dapp")}
                    <RiArrowRightUpLine className="ml-2 h-5 w-5" />
                  </span>
                </HashLink>

                <div className="pt-4">
                  <ConnectWallet />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

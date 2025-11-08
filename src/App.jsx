/** @format */

import { useState, useEffect } from "react";
// We're using motion in the loading screen's motion.div
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { motion } from "framer-motion";

import { ThemeProvider } from "./ThemeContext";
import { UserProvider } from "./UserContext";
import UserHistory from "./pages/UserHistory";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HistoryLog from "./pages/HistoryLog";
import MatrixBackground from "./components/MatrixBackground";
import { useTranslation } from "react-i18next";
import Dapp from "./pages/Dapp";
import Login from "./components/Login";
function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        }
        return prevProgress;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
  if (loading) {
    return (
      <div
        className={`fixed inset-0 bg-cyber-black flex items-center justify-center z-50`}
      >
        <MatrixBackground opacity={0.05} speed={50} />

        <div className="text-center z-50 relative">
          <h1 className="text-5xl font-cyber text-[#0f0] mb-4">
            <span className="">BST</span> <span className="">SBAL</span>{" "}
            <span className="">SYSTEM</span>
          </h1>
          <p className={`font-future text-lg mb-6 z-50 relative`}>
            Smart Base Affiliate Loop for the Beast Borne Ecosystem{" "}
          </p>
          {/* Loading bar */}

          <div
            className={`z-50 w-64 h-2 bg-[#0f0]/20 mx-auto relative overflow-hidden rounded-full`}
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0f0] via-[#0f0] to-[#0f0]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 2, ease: "easeInOut", repeat: 1 }}
            />
          </div>
          {/* show loading percentage 0 to 100 */}
          <motion.p
            className="text-lg font-cyber text-[#0f0] mt-4 font-bold relative z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </div>
      </div>
    );
  }
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/user-history" element={<UserHistory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dapp/*" element={<Dapp />} />
            <Route path="/history-log" element={<HistoryLog />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import { useAccount } from "wagmi";
import { useUser } from "../UserContext";
import {
  FaChartLine,
  FaTable,
  FaNetworkWired,
  FaCheckCircle,
  FaFileSignature,
  FaBars,
  FaTimes,
  FaUser,
  FaHome,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const { address } = useAccount();
  const { user } = useUser();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Close sidebar when route changes on mobile
  // console.log(user);
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("mobile-sidebar");
      if (sidebar && !sidebar.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Menu items with icons
  const menuItems = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dapp",
      icon: <FaChartLine />,
      color: "green1",
    },
    {
      id: 2,
      name: "User History",
      path: "/dapp/user-history",
      icon: <FaTable />,
      color: "green1",
    },
    {
      id: 3,
      name: "Team Referral",
      path: "/dapp/team-referral",
      icon: <FaTable />,
      color: "green1",
    },
    // {
    //   id: 4,
    //   name: "Completed Matrix",
    //   path: "/dapp",
    //   icon: <FaCheckCircle />,
    //   color: "green1",
    // },
    // {
    //   id: 5,
    //   name: "Team Referral",
    //   path: "/dapp/team-referral",
    //   icon: <FaFileSignature />,
    //   color: "green1",
    // },
    {
      id: 4,
      name: "Home",
      path: "/",
      icon: <FaHome />,
      color: "green1",
    },
  ];

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-full bg-cyber-dark border border-green1 flex items-center justify-center"
          style={{
            boxShadow: "0 0 10px rgba(0, 170, 85, 0.3)",
          }}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-green1 text-xl" />
          ) : (
            <FaBars className="text-green1 text-xl" />
          )}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        id="mobile-sidebar"
        className={`sidebar bg-cyber-dark text-white  sticky top-0  h-screen z-40 flex flex-col overflow-y-auto overflow-x-hidden transition-all duration-300 ${isMobileMenuOpen ? "left-0 w-64" : "-left-full w-0 lg:w-64 lg:left-0"}`}
      >
        {/* Background grid decoration */}
        <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>

        {/* Animated accent lines */}
        <div className="absolute left-0 top-0 w-1 h-full bg-green1/20"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-green1/20"></div>

        {/* Profile Section */}
        <div className="profile-section p-6 flex flex-col items-center relative z-10">
          <div
            className="avatar relative overflow-hidden transition-all duration-300 transform hover:scale-105 mb-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(13,17,23,0.8) 0%, rgba(20,30,48,0.9) 100%)",
              clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
              border: "2px solid #0f0",
              width: "80px",
              height: "80px",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-green1"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaUser className="text-green1 text-3xl" />
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green1/10 rounded-tl-xl"></div>
          </div>
          <div className="user-id font-mono text-green1 mb-2 tracking-wider">
            {user ? (
              <>USER ID: {user.userId}</>
            ) : address ? (
              <>WALLET: {address?.slice(0, 6) + "..." + address?.slice(-4)}</>
            ) : (
              "Connect Wallet"
            )}
          </div>
          {user && (
            <div
              className="user-name text-xs px-4 py-1 font-future tracking-wider"
              style={{
                clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
                background: "rgba(0, 170, 85, 0.2)",
                border: "1px solid #0f0",
              }}
            >
              {user?.username}
            </div>
          )}{" "}
        </div>

        {/* Menu Items */}
        <div className="menu-items flex-1 mt-4 relative z-10 px-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-2 transition-all duration-300 relative overflow-hidden group`}
              style={{
                clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                background:
                  location.pathname === item.path
                    ? `linear-gradient(90deg, rgba(${
                        item.color === "green1"
                          ? "0, 170, 85"
                          : item.color === "green1"
                            ? "0, 170, 85"
                            : item.color === "green1"
                              ? "0, 170, 85"
                              : "0, 170, 85"
                      }, 0.2) 0%, rgba(13,17,23,0.8) 100%)`
                    : "rgba(13,17,23,0.4)",
                border:
                  location.pathname === item.path
                    ? `1px solid ${
                        item.color === "green1"
                          ? "#0f0"
                          : item.color === "green1"
                            ? "#0f0"
                            : item.color === "green1"
                              ? "#0f0"
                              : "#0f0"
                      }`
                    : "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Animated hover effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-${item.color}`}
              ></div>

              {/* Icon with glow effect */}
              <div
                className={`icon-container w-8 h-8 flex items-center justify-center rounded-sm`}
                style={{
                  background: `rgba(${
                    item.color === "green1"
                      ? "0, 170, 85"
                      : item.color === "green1"
                        ? "0, 170, 85"
                        : item.color === "green1"
                          ? "0, 170, 85"
                          : "0, 170, 85"
                  }, 0.1)`,
                  boxShadow:
                    hoveredItem === item.id || location.pathname === item.path
                      ? `0 0 8px ${
                          item.color === "green1"
                            ? "rgba(0, 170, 85, 0.5)"
                            : item.color === "green1"
                              ? "rgba(0, 170, 85, 0.5)"
                              : item.color === "green1"
                                ? "rgba(0, 170, 85, 0.5)"
                                : "rgba(0, 170, 85, 0.5)"
                        }`
                      : "none",
                }}
              >
                <span className={`text-${item.color}`}>{item.icon}</span>
              </div>

              {/* Menu text with glow on active */}
              <span
                className={`ml-3 font-future tracking-wide text-sm ${location.pathname === item.path ? `text-${item.color}` : "text-white/80"} group-hover:text-white transition-colors duration-300`}
                style={{
                  textShadow:
                    location.pathname === item.path
                      ? `0 0 5px ${
                          item.color === "green1"
                            ? "rgba(0, 170, 85, 0.5)"
                            : item.color === "green1"
                              ? "rgba(0, 170, 85, 0.5)"
                              : item.color === "green1"
                                ? "rgba(0, 170, 85, 0.5)"
                                : "rgba(0, 170, 85, 0.5)"
                        }`
                      : "none",
                }}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Wallet Section */}
        <div
          className="wallet-section p-4 mt-auto sticky bottom-0 left-0 w-full"
          style={{
            background:
              "linear-gradient(0deg, rgba(13,17,23,0.95) 0%, rgba(0,170,85,0.8) 100%)",
            borderTop: "1px solid rgba(0, 170, 85, 0.3)",
            backdropFilter: "blur(5px)",
            zIndex: 20,
          }}
        >
          <div className="flex items-center justify-center">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

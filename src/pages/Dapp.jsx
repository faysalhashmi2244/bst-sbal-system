import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import UserHistory from "../components/UserHistory";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import Dashboard from "../components/Dashboard";
import BackgroundEffects from "../components/BackgroundEffects";
import Refbnanner from "../components/Refbnanner";
// Import TeamReferral as lazy loading
const TeamReferral = React.lazy(() => import("../components/TeamReferral"));
import { useAccount } from "wagmi";
import { useUser } from "../UserContext";
import apiService from "../services/api";
import { Toaster } from "react-hot-toast";
import { useTheme } from "../ThemeContext";
import TreeShow from "../components/TreeShow";

const DappLayout = ({ children }) => {
  const { address } = useAccount();
  const { isDarkMode } = useTheme();
  return (
    <>
      <Refbnanner referrer={address} />
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <DashboardHeader />
          <div className="container mx-auto">{children}</div>
        </div>
      </div>
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? "#1a1a2e" : "#f0f0f5",
            color: isDarkMode ? "#fff" : "#1a1a2e",
            border: `1px solid ${isDarkMode ? "#0f0" : "#0f0"}`,
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#0f0",
              secondary: isDarkMode ? "#1a1a2e" : "#f0f0f5",
            },
          },
          error: {
            iconTheme: {
              primary: "#f00",
              secondary: isDarkMode ? "#1a1a2e" : "#f0f0f5",
            },
          },
        }}
      />
    </>
  );
};

const Dapp = () => {
  const { isConnected } = useAccount();
  const { user, loading } = useUser();
  const location = useLocation();
  const [referrerParams, setReferrerParams] = useState(null);

  // Extract referrer parameter from URL or localStorage
  const params = new URLSearchParams(location.search);
  const ref = params.get("ref");

  useEffect(() => {
    // If ref is in URL, save it to localStorage and state
    if (ref) {
      localStorage.setItem("referrerParam", ref);
      setReferrerParams(ref);
      // console.log("Dapp Saved ref :", ref);

      // If the ref looks like a wallet address, check if it's registered
      if (ref.startsWith("0x")) {
        const checkReferrerWallet = async () => {
          try {
            const response =
              await apiService.checkWalletAddressAndGetUserId(ref);
            if (response.success && response.exists) {
              // If the wallet address is registered, save its user ID
              localStorage.setItem("referrerUserId", response.userId);
              console.log(
                "Referrer wallet is registered with userId:",
                response.userId,
              );
            }
          } catch (error) {
            // console.error("Error checking referrer wallet:", error);
          }
        };

        checkReferrerWallet();
      }
    }
    // If no ref in URL but exists in localStorage, use that
    else {
      const savedRef = localStorage.getItem("referrerParam");
      if (savedRef) {
        setReferrerParams(savedRef);
        // console.log("Dapp Using ref:", savedRef);
      }
    }
  }, [location.search, ref]);

  // Debug log outside of useEffect
  // console.log("Dapp.jsx - Current referrerParams state:", referrerParams);

  // If wallet is connected but user data is still loading, show loading state
  if (isConnected && loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BackgroundEffects />
        <p className="text-white">Loading user data...</p>
      </div>
    );
  }

  // If wallet is connected but user is not registered, redirect to login/registration
  if (isConnected && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {isConnected && user ? (
        <DappLayout>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <BackgroundEffects />
                <p className="text-white"> Loading...</p>
              </div>
            }
          >
            <Routes>
              <Route index element={<Dashboard parms={referrerParams} />} />
              <Route path="user-history" element={<UserHistory />} />
              {/* <Route path="team-referral" element={<TeamReferral />} /> */}
              <Route path="team-referral" element={<TreeShow />} />
              <Route path="*" element={<Navigate to="/dapp" replace />} />
            </Routes>
          </Suspense>
        </DappLayout>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default Dapp;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import ConnectWallet from "./ConnectWallet";
import BackgroundEffects from "./BackgroundEffects";
import { useTheme } from "../ThemeContext";
import { useUser } from "../UserContext";
import { useTranslation } from "react-i18next";
import { FaLock, FaUserShield, FaUser, FaArrowRight } from "react-icons/fa";
import apiService from "../services/api";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { isConnected, address } = useAccount();
  const {
    user,
    isLoggedIn,
    loading: userLoading,
    error: userError,
    registerUser,
    loginUser,
    checkHealth,
  } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [sponsorId, setSponsorId] = useState(
    localStorage.getItem("sponsorId") || "",
  );
  const [sponsorAddress, setSponsorAddress] = useState(
    localStorage.getItem("sponsorAddress") || "",
  );
  const [sponsorType, setSponsorType] = useState("id"); // "id" or "address"
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Check for referrer parameter in URL and save to localStorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    const savedRef = localStorage.getItem("referrerParam");
    if (savedRef) {
      localStorage.setItem("referrerParam", savedRef);
      // console.log("Login.jsx - Saved ref to localStorage:", savedRef);

      // If the ref looks like a wallet address, check if it's registered
      if (savedRef.startsWith("0x")) {
        const checkReferrerWallet = async () => {
          try {
            const response =
              await apiService.checkWalletAddressAndGetUserId(savedRef);
            // console.log("Referrer wallet response: =>", response);
            if (response.success && response.exists) {
              // console.log(
              //   "Referrer wallet is registered with userId: =>",
              //   response.userId
              // );
              // If the wallet address is registered, save its user ID
              localStorage.setItem("referrerUserId", response.userId);

              // If we're on the registration page and sponsor type is ID, pre-fill the sponsor ID
              if (!isLogin && sponsorType === "id") {
                setSponsorId(response.userId);
              }
            }
          } catch (error) {
            console.error("Error checking referrer wallet:", error);
          }
        };

        checkReferrerWallet();
      }
    }
  }, [location.search, isLogin, sponsorType]);

  // Redirect to dashboard if user is logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      // Preserve the referrer parameter when redirecting to dashboard
      const savedRef = localStorage.getItem("referrerParam");
      if (savedRef) {
        navigate(`/dapp?ref=${savedRef}`);
        // console.log("Login.jsx - Redirecting to dashboard with ref:", savedRef);
      } else {
        navigate("/dapp");
      }
    } else if (isConnected && !isLoggedIn && !userLoading) {
      // User is connected but not registered
      setIsLogin(false);
    }
  }, [isLoggedIn, user, isConnected, userLoading, navigate]);

  // Reset error message when tab changes
  useEffect(() => {
    setError("");
    setSuccess("");
  }, [isLogin]);

  const handleRegister = async () => {
    if (!isConnected || !address) {
      setError("Please connect your wallet first");
      return;
    }

    // If nickname is not provided, show error
    if (!nickname) {
      setError("Please enter a nickname");
      return;
    }

    // Handle sponsor validation based on type
    if (sponsorType === "id") {
      // If sponsorId is not provided, set it to 0
      if (!sponsorId || String(sponsorId).trim() === "") {
        setSponsorId("0");
      } else {
        // Ensure sponsorId is a number
        const numericSponsorId = parseInt(sponsorId);
        if (isNaN(numericSponsorId)) {
          setError("Sponsor ID must be a valid number");
          return;
        }
        console.log("numericSponsorId", numericSponsorId);
      }
    } else if (sponsorType === "address") {
      // Validate wallet address format if provided
      if (sponsorAddress && !sponsorAddress.startsWith("0x")) {
        setError(
          "Sponsor address must be a valid wallet address starting with 0x",
        );
        return;
      }
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Prepare registration data based on sponsor type
      let registrationData;
      if (sponsorType === "id") {
        // Check if we have a referrer user ID from a wallet address in the URL
        const referrerUserId = localStorage.getItem("referrerUserId");

        // Use sponsorId in this priority:
        // 1. User entered sponsor ID
        // 2. Referrer user ID from wallet address in URL
        // 3. Default 1375
        let finalSponsorId;
        if (sponsorId && String(sponsorId).trim() !== "") {
          finalSponsorId = sponsorId;
        } else if (referrerUserId) {
          finalSponsorId = referrerUserId;
          console.log("Using referrer user ID as sponsor:", referrerUserId);
        } else {
          finalSponsorId = "0";
        }

        registrationData = { nickname, sponsorId: finalSponsorId };
      } else {
        // Use sponsorAddress
        registrationData = { nickname, sponsorAddress };
      }

      const result = await registerUser(
        registrationData.nickname,
        registrationData.sponsorId,
        registrationData.sponsorAddress,
      );

      if (result.success) {
        setSuccess("Registration successful!");
        // Redirect will happen automatically through the useEffect
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!isConnected || !address) {
      setError("Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const result = await loginUser(address);

      if (result.success) {
        setSuccess("Login successful!");
        // Redirect will happen automatically through the useEffect
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // console.log("sponsorId", sponsorId);
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundEffects />

      <div
        className={`max-w-md w-full p-8 rounded-xl shadow-2xl ${isDarkMode ? "bg-cyber-dark-card border border-green1/30" : "bg-white border border-gray-200"} z-10`}
      >
        {/* Tab Selector */}
        <div className="flex mb-8 relative">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green1/30"></div>
          <button
            className={`flex-1 py-3 font-future text-center relative ${isLogin ? "text-green1" : isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            onClick={() => setIsLogin(true)}
          >
            {t("login.login", "Login")}
            {isLogin && (
              <>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green1"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green1 rotate-45"></div>
              </>
            )}
          </button>
          <button
            className={`flex-1 py-3 font-future text-center relative ${!isLogin ? "text-green1" : isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            onClick={() => setIsLogin(false)}
          >
            {t("login.register", "Register")}
            {!isLogin && (
              <>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green1"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green1 rotate-45"></div>
              </>
            )}
          </button>
        </div>

        {isLogin ? (
          /* Login Section */
          <>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-green1/20">
                  <FaUserShield className="text-4xl text-green1" />
                </div>
              </div>
              <h2
                className={`text-2xl font-bold ${isDarkMode ? "text-green1" : "text-gray-800"}`}
              >
                {t("login.welcome", "Welcome to SBAL System")}
              </h2>
              <p
                className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {t(
                  "login.connectPrompt",
                  "Connect your wallet to access the dashboard",
                )}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center">
                <ConnectWallet />
              </div>

              {isConnected && (
                <button
                  onClick={handleLogin}
                  disabled={loading || userLoading}
                  className={`w-full py-3 px-4 flex items-center justify-center ${!loading && !userLoading ? "bg-green1/80 hover:bg-green1" : "bg-gray-500"} text-black font-future font-medium rounded-lg transition-all duration-300 mt-4`}
                  style={{
                    clipPath: "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)",
                  }}
                >
                  {loading || userLoading
                    ? "Processing..."
                    : t(
                        "login.loginButton",
                        "Login with Connected Wallet",
                      )}{" "}
                  {!loading && !userLoading && (
                    <FaArrowRight className="ml-2" />
                  )}
                </button>
              )}

              {error && (
                <div className="mt-3 text-white font-future text-sm text-center bg-red-500 p-2 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="mt-3 text-white font-future text-sm text-center bg-green-500 p-2 rounded">
                  {success}
                </div>
              )}

              <div
                className={`flex items-center justify-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                <FaLock className="mr-2" />
                {t("login.secureConnection", "Secure blockchain connection")}
              </div>
            </div>

            <div className="mt-8 text-center text-sm">
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                {t(
                  "login.disclaimer",
                  "By connecting, you agree to our Terms of Service",
                )}
              </p>
            </div>
          </>
        ) : (
          /* Register Section */
          <>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-green1/20">
                  <FaUserShield className="text-4xl text-green1" />
                </div>
              </div>
              <h2
                className={`text-2xl font-bold font-future ${isDarkMode ? "text-green1" : "text-gray-800"}`}
              >
                {t("register.title", "Register Account")}
              </h2>
              <p
                className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {t("register.subtitle", "Create your Web3 BST account")}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  className={`block mb-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  {t("register.sponsor", "Sponsor")}
                </label>

                {/* Sponsor Type Selection */}
                <div className="flex mb-2 space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sponsorIdType"
                      name="sponsorType"
                      checked={sponsorType === "id"}
                      onChange={() => setSponsorType("id")}
                      className="mr-2"
                    />
                    <label
                      htmlFor="sponsorIdType"
                      className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Sponsor ID
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sponsorAddressType"
                      name="sponsorType"
                      checked={sponsorType === "address"}
                      onChange={() => setSponsorType("address")}
                      className="mr-2"
                    />
                    <label
                      htmlFor="sponsorAddressType"
                      className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Wallet Address
                    </label>
                  </div>
                </div>

                {/* Sponsor Input Field - changes based on selected type */}
                {sponsorType === "id" ? (
                  <div
                    className={`flex items-center px-3 py-2 rounded-lg ${isDarkMode ? "bg-cyber-dark border border-green1/30" : "bg-gray-100 border border-gray-300"}`}
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
                    }}
                  >
                    <FaUser className="text-green1 mr-2" />
                    <input
                      type="number"
                      defaultValue={sponsorId}
                      onChange={(e) => setSponsorId(e.target.value)}
                      placeholder={t(
                        "register.sponsorPlaceholder",
                        "enter sponsor ID",
                      )}
                      min="0"
                      className={`w-full bg-transparent outline-none font-mono ${isDarkMode ? "text-white" : "text-gray-800"}`}
                    />
                  </div>
                ) : (
                  <div
                    className={`flex items-center px-3 py-2 rounded-lg ${isDarkMode ? "bg-cyber-dark border border-green1/30" : "bg-gray-100 border border-gray-300"}`}
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
                    }}
                  >
                    <FaUser className="text-green1 mr-2" />
                    <input
                      type="text"
                      value={sponsorAddress}
                      onChange={(e) => setSponsorAddress(e.target.value)}
                      placeholder="Enter sponsor wallet address (0x...)"
                      className={`w-full bg-transparent outline-none font-mono ${isDarkMode ? "text-white" : "text-gray-800"}`}
                    />
                  </div>
                )}
                <p
                  className={`mt-1 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  {sponsorType === "id"
                    ? "Enter sponsor ID "
                    : "Enter sponsor wallet address starting with 0x"}
                </p>
              </div>

              <div>
                <label
                  className={`block mb-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  {t("register.nickname", "Nick Name")}
                </label>
                <div
                  className={`flex items-center px-3 py-2 rounded-lg ${isDarkMode ? "bg-cyber-dark border border-green1/30" : "bg-gray-100 border border-gray-300"}`}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
                  }}
                >
                  <FaUser className="text-green1 mr-2" />
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder={t(
                      "register.nicknamePlaceholder",
                      "Enter a nickname to register",
                    )}
                    className={`w-full bg-transparent outline-none font-mono ${isDarkMode ? "text-white" : "text-gray-800"}`}
                  />
                </div>
              </div>

              <button
                onClick={handleRegister}
                disabled={!isConnected || loading || userLoading}
                className={`w-full py-3 px-4 flex items-center justify-center ${isConnected && !loading && !userLoading ? "bg-green1/80 hover:bg-green1" : "bg-gray-500"} text-black font-future font-medium rounded-lg transition-all duration-300`}
                style={{
                  clipPath: "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)",
                }}
              >
                {loading || userLoading
                  ? "Processing..."
                  : t("register.button", "Register")}{" "}
                {!loading && !userLoading && <FaArrowRight className="ml-2" />}
              </button>

              {error && (
                <div className="mt-3 text-white font-future text-sm text-center bg-red-500 p-2 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="mt-3 text-white font-future text-sm text-center bg-green-500 p-2 rounded">
                  {success}
                </div>
              )}

              {!isConnected && (
                <div className="text-center">
                  <p className="text-red-500 text-sm mb-2">
                    {t(
                      "register.connectFirst",
                      "Please connect your wallet first",
                    )}
                  </p>
                  <ConnectWallet />
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <p
                className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {t("register.haveAccount", "Already have an account?")}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-green1 ml-1 hover:underline"
                >
                  {t("register.loginHere", "Login here")}
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

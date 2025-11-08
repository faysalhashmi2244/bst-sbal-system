import { useTheme } from "../ThemeContext";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="flex items-center ml-4">
      <button
        onClick={handleToggle}
        className={`relative w-14 h-7 flex items-center transition-all duration-300 ${
          isDarkMode ? "bg-cyber-gray/70" : "bg-cyber-light/70"
        } rounded-full p-1 focus:outline-none overflow-hidden backdrop-blur-sm ${
          isDarkMode ? "border-green1" : "border-green1"
        } border ${isAnimating ? "scale-110" : ""}`}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {/* Track highlight */}
        <div
          className={`absolute inset-0 ${isDarkMode ? "bg-green1/10" : "bg-green1/10"} rounded-full`}
        />

        {/* Animated knob */}
        <div
          className={`absolute z-10 w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 backdrop-blur-md ${
            isDarkMode ? "translate-x-0 bg-green1" : "translate-x-7 bg-green1"
          }`}
          style={{
            boxShadow: isDarkMode
              ? "0 0 10px rgba(0, 240, 255, 0.7), 0 0 5px rgba(0, 240, 255, 0.5)"
              : "0 0 10px rgba(0, 255, 157, 0.7), 0 0 5px rgba(0, 255, 157, 0.5)",
          }}
        />

        {/* Background patterns/decorations */}
        {isDarkMode ? (
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute top-1 left-1 w-1 h-1 bg-green1 rounded-full"></div>
            <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-green1 rounded-full"></div>
            <div className="absolute bottom-1 right-3 w-1 h-1 bg-green1 rounded-full"></div>
            <div className="absolute top-3 right-5 w-0.5 h-0.5 bg-green1 rounded-full"></div>
          </div>
        ) : (
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute top-1 right-1 w-1 h-1 bg-green1 rounded-full"></div>
            <div className="absolute top-2 left-2 w-0.5 h-0.5 bg-green1 rounded-full"></div>
            <div className="absolute bottom-1 left-3 w-1 h-1 bg-green1 rounded-full"></div>
            <div className="absolute top-3 left-5 w-0.5 h-0.5 bg-green1 rounded-full"></div>
          </div>
        )}

        {/* Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 ${isDarkMode ? "text-white" : "text-cyber-dark/30"} transition-opacity duration-300 ${isDarkMode ? "opacity-100" : "opacity-40"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 ${isDarkMode ? "text-cyber-gray/30" : "text-cyber-dark"} transition-opacity duration-300 ${isDarkMode ? "opacity-40" : "opacity-100"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;

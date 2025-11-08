/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "cyber-black": "#0a0a0a",
        "cyber-dark": "#121212",
        "cyber-gray": "#1e1e1e",
        "cyber-light": "#f0f0f0",
        "cyber-white": "#ffffff",
        "neon-blue": "#00f0ff",
        "neon-purple": "#b300ff",
        "neon-pink": "#ff00e6",
        "neon-green": "#00aa55",
        green1: "#0f0",
        green2: "#00ff9f",
      },
      fontFamily: {
        cyber: ["Orbitron", "sans-serif"],
        future: ["Rajdhani", "sans-serif"],
        display: ["Oxanium", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        arabic: ["Tajawal", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        glitch: "glitch 1s linear infinite",
        "slide-in": "slide-in 1s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            textShadow:
              "0 0 5px rgba(0, 240, 255, 0.7), 0 0 10px rgba(0, 240, 255, 0.5), 0 0 15px rgba(0, 240, 255, 0.3)",
            boxShadow:
              "0 0 5px rgba(0, 240, 255, 0.7), 0 0 10px rgba(0, 240, 255, 0.5)",
          },
          "50%": {
            textShadow:
              "0 0 10px rgba(0, 240, 255, 0.9), 0 0 20px rgba(0, 240, 255, 0.7), 0 0 30px rgba(0, 240, 255, 0.5)",
            boxShadow:
              "0 0 10px rgba(0, 240, 255, 0.9), 0 0 20px rgba(0, 240, 255, 0.7)",
          },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)",
        "neon-gradient":
          "linear-gradient(45deg, #00f0ff, #b300ff, #ff00e6, #00ff9d)",
      },
      backgroundSize: {
        "cyber-grid-size": "30px 30px",
      },
      boxShadow: {
        "neon-blue":
          "0 0 5px rgba(0, 240, 255, 0.7), 0 0 10px rgba(0, 240, 255, 0.5)",
        "neon-purple":
          "0 0 5px rgba(179, 0, 255, 0.7), 0 0 10px rgba(179, 0, 255, 0.5)",
        "neon-pink":
          "0 0 5px rgba(255, 0, 230, 0.7), 0 0 10px rgba(255, 0, 230, 0.5)",
        "neon-green":
          "0 0 5px rgba(0, 170, 85, 0.7), 0 0 10px rgba(0, 170, 85, 0.5)",
      },
      textShadow: {
        "neon-blue":
          "0 0 5px rgba(0, 240, 255, 0.7), 0 0 10px rgba(0, 240, 255, 0.5)",
        "neon-purple":
          "0 0 5px rgba(179, 0, 255, 0.7), 0 0 10px rgba(179, 0, 255, 0.5)",
        "neon-pink":
          "0 0 5px rgba(255, 0, 230, 0.7), 0 0 10px rgba(255, 0, 230, 0.5)",
        "neon-green":
          "0 0 5px rgba(0, 170, 85, 0.7), 0 0 10px rgba(0, 170, 85, 0.5)",
        green1: "0 0 5px rgba(0, 170, 85, 0.7), 0 0 10px rgba(0, 170, 85, 0.5)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-neon-blue": {
          textShadow:
            "0 0 5px rgba(0, 170, 85, 0.7), 0 0 10px rgba(0, 170, 85, 0.5), 0 0 15px rgba(0, 170, 85, 0.3)",
        },
        ".text-shadow-neon-purple": {
          textShadow:
            "0 0 5px rgba(0, 170, 85, 0.7), 0 0 10px rgba(0, 170, 85, 0.5), 0 0 15px rgba(0, 170, 85, 0.3)",
        },
        ".text-shadow-neon-pink": {
          textShadow:
            "0 0 5px rgba(0, 170, 85, 0.7), 0 0 10px rgba(0, 170, 85, 0.5), 0 0 15px rgba(0, 170, 85, 0.3)",
        },
        ".text-shadow-green1": {
          textShadow:
            "0 0 5px rgba(0, 170, 85, 0.7), 0 0 10px rgba(0, 170, 85, 0.5), 0 0 15px rgba(0, 170, 85, 0.3)",
        },
        ".backdrop-blur-sm": {
          backdropFilter: "blur(4px)",
        },
        ".backdrop-blur": {
          backdropFilter: "blur(8px)",
        },
        ".backdrop-blur-md": {
          backdropFilter: "blur(12px)",
        },
        ".backdrop-blur-lg": {
          backdropFilter: "blur(16px)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n"; // Import i18n configuration
import { AppKitProvider } from "./config/AppKitProvider";

// Set initial dark mode preference based on system or saved preference
const setInitialColorMode = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.classList.add(savedTheme);
  } else if (prefersDark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
  }
};

// Run the function immediately
setInitialColorMode();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppKitProvider>
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center bg-cyber-black dark:bg-cyber-black light:bg-cyber-white text-green1">
            Loading...
          </div>
        }
      >
        <App />
      </Suspense>
    </AppKitProvider>
  </StrictMode>,
);

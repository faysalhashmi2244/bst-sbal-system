import { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeContext";
import { motion } from "framer-motion";

const MatrixRain = () => {
  const canvasRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);

    // Characters to be used in the rain
    const chars = "01010101BSTSBALWXYZCOIN".split("");

    // Position of the drops
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height;
    }

    // Time counter for fading in/out
    let time = 0;
    const maxTime = 600; // 10 seconds at 60fps

    const draw = () => {
      // Set initial opacity based on time
      let alpha = 0.05;

      // Fade in during first 2 seconds
      if (time < 120) {
        alpha = alpha * (time / 120);
      }
      // Fade out during last 2 seconds
      else if (time > maxTime - 120) {
        alpha = alpha * ((maxTime - time) / 120);
      }

      // Semi-transparent black to show trail
      ctx.fillStyle = isDarkMode
        ? `rgba(0, 0, 0, ${0.12 - alpha})`
        : `rgba(255, 255, 255, ${0.12 - alpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set color and font
      ctx.fillStyle = isDarkMode
        ? `rgba(0, 255, 170, ${alpha * 8})`
        : `rgba(0, 180, 255, ${alpha * 8})`;
      ctx.font = fontSize + "px monospace";

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Draw a random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * 1);

        // Move drops down
        drops[i] += 1;

        // Send drop back to top randomly after it crosses the screen
        // or randomly during the animation for variety
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      time++;

      // Reset animation after maxTime frames
      if (time > maxTime) {
        time = 0;
        // Randomize drops position for next cycle
        for (let i = 0; i < columns; i++) {
          drops[i] = Math.random() * -canvas.height;
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30"
    />
  );
};

const HolographicCircuit = () => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    const draw = () => {
      // Clear the canvas with transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Define colors based on theme
      const nodeColor = isDarkMode
        ? "rgba(0, 170, 85, 0.8)"
        : "rgba(0, 170, 85, 0.6)";
      const lineColor = isDarkMode
        ? "rgba(0, 170, 85, 0.3)"
        : "rgba(0, 170, 85, 0.2)";

      // Number of circuit nodes
      const numNodes = 10;

      // Store node positions
      const nodes = [];

      // Create a hexagonal-like pattern
      for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 2 + time * 0.001;
        const radius = Math.min(canvas.width, canvas.height) * 0.3;

        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;

        // Apply some oscillation effect
        const xOsc = Math.sin(time * 0.01 + i * 0.5) * 15;
        const yOsc = Math.cos(time * 0.015 + i * 0.5) * 15;

        nodes.push({
          x: x + xOsc,
          y: y + yOsc,
        });

        // Draw nodes
        ctx.beginPath();
        ctx.arc(x + xOsc, y + yOsc, 3, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Occasionally draw pulses
        if (Math.random() < 0.03) {
          ctx.beginPath();
          ctx.arc(x + xOsc, y + yOsc, 8, 0, Math.PI * 2);
          ctx.fillStyle = isDarkMode
            ? "rgba(0, 170, 85, 0.3)"
            : "rgba(0, 170, 85, 0.2)";
          ctx.fill();
        }
      }

      // Connect nodes
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);

      for (let i = 1; i < nodes.length; i++) {
        ctx.lineTo(nodes[i].x, nodes[i].y);
      }

      // Close the shape
      ctx.lineTo(nodes[0].x, nodes[0].y);

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Connect to center
      for (let i = 0; i < nodes.length; i++) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(nodes[i].x, nodes[i].y);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw data pulse effects along the circuit
      for (let i = 0; i < numNodes; i++) {
        if (Math.random() < 0.05) {
          const idx1 = Math.floor(Math.random() * nodes.length);
          const idx2 = (idx1 + 1) % nodes.length;

          const pulsePos = Math.random();
          const pulseX =
            nodes[idx1].x + (nodes[idx2].x - nodes[idx1].x) * pulsePos;
          const pulseY =
            nodes[idx1].y + (nodes[idx2].y - nodes[idx1].y) * pulsePos;

          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
          ctx.fillStyle = isDarkMode
            ? "rgba(0, 170, 85, 0.9)"
            : "rgba(0, 170, 85, 0.9)";
          ctx.fill();
        }
      }

      // Draw center node
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 6, 0, Math.PI * 2);
      ctx.fillStyle = isDarkMode
        ? "rgba(0, 170, 85, 0.8)"
        : "rgba(0, 170, 85, 0.8)";
      ctx.fill();

      time += 1;
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

const BackgroundEffects = () => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef(null);

  // Use a static background mode to reduce load
  const [effectsMode] = useState("grid"); // Only use 'grid' for better performance

  // Canvas-based grid animation - optimized for performance
  useEffect(() => {
    if (effectsMode !== "grid") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    let time = 0;
    const baseColor = isDarkMode
      ? "rgba(0, 170, 85, 0.1)" // Reduced opacity
      : "rgba(0, 255, 150, 0.08)"; // Reduced opacity
    const accentColor = isDarkMode
      ? "rgba(0, 170, 85, 0.1)" // Reduced opacity
      : "rgba(0, 170, 85, 0.08)"; // Reduced opacity

    // Track animation frame for cleanup
    let animationFrame;

    const drawGrid = () => {
      // Only redraw every 5 frames to reduce CPU load (increased from 3)
      if (time % 5 !== 0) {
        time += 1;
        animationFrame = requestAnimationFrame(drawGrid);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Main grid - increased grid size for better performance
      const gridSize = 120; // Increased from 100 for even better performance
      const offset = time % gridSize;

      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1;

      // Horizontal lines - draw fewer lines
      for (let y = offset; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical lines - draw fewer lines
      for (let x = offset; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Accent lines (diagonal) - reduced frequency
      ctx.strokeStyle = accentColor;
      const diagonalOffset = (time * 0.1) % (gridSize * 2); // Reduced animation speed further

      for (let i = -height; i < width + height; i += gridSize * 10) {
        // Increased spacing further
        ctx.beginPath();
        ctx.moveTo(i - diagonalOffset, 0);
        ctx.lineTo(i + height - diagonalOffset, height);
        ctx.stroke();
      }

      // Digital circuit path - simplified further
      ctx.strokeStyle = isDarkMode
        ? "rgba(0, 170, 85, 0.2)" // Reduced opacity
        : "rgba(0, 170, 85, 0.15)"; // Reduced opacity
      ctx.lineWidth = 1; // Reduced from 2

      const circuitY = (Math.sin(time * 0.0005) * 0.5 + 0.5) * height; // Slowed down animation further

      ctx.beginPath();
      ctx.moveTo(0, circuitY);

      // Create a jagged line with even fewer segments
      const segments = 4; // Reduced from 6
      const segmentWidth = width / segments;

      for (let i = 1; i <= segments; i++) {
        const x = i * segmentWidth;
        const yOffset = Math.sin(time * 0.001 + i * 0.5) * 30; // Reduced complexity further
        ctx.lineTo(x, circuitY + yOffset);
      }

      ctx.stroke();

      // Removed energy pulses completely to reduce load

      time += 1;
      animationFrame = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to cancel animation frame
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isDarkMode, effectsMode]);

  return (
    <>
      {/* Grid canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Simplified static gradient background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute w-[150vw] h-[150vh] rounded-full filter blur-[100px] opacity-5 ${isDarkMode ? "bg-green1" : "bg-green1"}`}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </>
  );
};

export default BackgroundEffects;

import { useEffect, useRef } from "react";

// Matrix background with binary and Japanese characters in separate lines
const MatrixBackground = ({ opacity = 0.05, speed = 33 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Setting the width and height of the canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    resizeCanvas();

    // Resize on window resize
    window.addEventListener("resize", resizeCanvas);

    // Setting up Japanese characters and binary digits
    const japaneseCharacters =
      "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ゙゚゛゜ゝゞゟ";
    const binaryDigits = "01";

    // Setting up the columns
    const fontSize = 10;
    let columns = canvas.width / fontSize;

    // Setting up the drops - separate arrays for binary and Japanese
    let binaryDrops = [];
    let japaneseDrops = [];

    // Determine which columns will be binary and which will be Japanese
    let columnTypes = [];

    for (let i = 0; i < columns; i++) {
      // Initialize drops for both types
      binaryDrops[i] = 1;
      japaneseDrops[i] = 1;

      // Determine if this column is binary or Japanese
      // Create distinct lines by assigning character types to columns
      // Every 3-5 columns will switch between binary and Japanese
      if (i % 4 === 0 || i % 4 === 1) {
        columnTypes[i] = "binary";
      } else {
        columnTypes[i] = "japanese";
      }
    }

    // Define multiple colors for the matrix effect
    const binaryColors = ["#0f0", "#00ff9f"];
    const japaneseColors = ["#90ee90", "#98fb98", "#00fa9a"];

    // Setting up the draw function
    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < columns; i++) {
        // Determine which character set to use based on column type
        if (columnTypes[i] === "binary") {
          // Draw binary characters
          const character =
            binaryDigits[Math.floor(Math.random() * binaryDigits.length)];
          ctx.fillStyle = binaryColors[i % binaryColors.length];
          ctx.fillText(character, i * fontSize, binaryDrops[i] * fontSize);
          binaryDrops[i]++;

          // Reset binary drops when they reach bottom
          if (
            binaryDrops[i] * fontSize > canvas.height &&
            Math.random() > 0.975
          ) {
            binaryDrops[i] = 0;
          }
        } else {
          // Draw Japanese characters
          const character =
            japaneseCharacters[
              Math.floor(Math.random() * japaneseCharacters.length)
            ];
          ctx.fillStyle = japaneseColors[i % japaneseColors.length];
          ctx.fillText(character, i * fontSize, japaneseDrops[i] * fontSize);
          japaneseDrops[i]++;

          // Reset Japanese drops when they reach bottom
          if (
            japaneseDrops[i] * fontSize > canvas.height &&
            Math.random() > 0.96
          ) {
            japaneseDrops[i] = 0;
          }
        }
      }
    };

    // Loop the animation
    const interval = setInterval(draw, speed);

    // Handle resize by recalculating columns and drops
    const handleResize = () => {
      resizeCanvas();
      columns = canvas.width / fontSize;
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("resize", handleResize);
    };
  }, [opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  );
};

export default MatrixBackground;

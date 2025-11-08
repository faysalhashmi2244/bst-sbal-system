import { useEffect, useRef } from "react";

const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Physics Shape class
    class PhysicsShape {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 3;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.color = this.getRandomColor();
        this.shape = this.getRandomShape();
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      getRandomColor() {
        const colors = [
          "0, 240, 255", // neon-blue
          "179, 0, 255", // neon-purple
          "255, 0, 230", // neon-pink
          "0, 255, 157", // neon-green
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      getRandomShape() {
        const shapes = ["triangle", "square", "pentagon", "hexagon"];
        return shapes[Math.floor(Math.random() * shapes.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Wrap around edges
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.strokeStyle = `rgba(${this.color}, ${this.opacity + 0.3})`;
        ctx.lineWidth = 1;

        // Draw different shapes
        switch (this.shape) {
          case "triangle":
            this.drawTriangle();
            break;
          case "square":
            this.drawSquare();
            break;
          case "pentagon":
            this.drawPolygon(5);
            break;
          case "hexagon":
            this.drawPolygon(6);
            break;
          default:
            this.drawSquare();
        }

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;

        ctx.restore();
      }

      drawTriangle() {
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(-this.size, this.size);
        ctx.lineTo(this.size, this.size);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      drawSquare() {
        ctx.beginPath();
        ctx.rect(-this.size, -this.size, this.size * 2, this.size * 2);
        ctx.fill();
        ctx.stroke();
      }

      drawPolygon(sides) {
        ctx.beginPath();
        const angle = (Math.PI * 2) / sides;
        for (let i = 0; i < sides; i++) {
          const x = this.size * Math.cos(angle * i);
          const y = this.size * Math.sin(angle * i);
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }

    // Create physics shapes array
    const shapeCount = Math.min(
      60,
      Math.floor((canvas.width * canvas.height) / 20000),
    );
    const shapes = [];

    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new PhysicsShape());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw shapes
      shapes.forEach((shape) => {
        shape.update();
        shape.draw();
      });

      // Draw connections between shapes
      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    };

    // Draw connections between nearby shapes
    const drawConnections = () => {
      const maxDistance = 180;

      for (let a = 0; a < shapes.length; a++) {
        for (let b = a; b < shapes.length; b++) {
          const dx = shapes[a].x - shapes[b].x;
          const dy = shapes[a].y - shapes[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            const gradient = ctx.createLinearGradient(
              shapes[a].x,
              shapes[a].y,
              shapes[b].x,
              shapes[b].y,
            );
            gradient.addColorStop(
              0,
              `rgba(${shapes[a].color}, ${0.8 - distance / maxDistance})`,
            );
            gradient.addColorStop(
              1,
              `rgba(${shapes[b].color}, ${0.8 - distance / maxDistance})`,
            );

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.moveTo(shapes[a].x, shapes[a].y);
            ctx.lineTo(shapes[b].x, shapes[b].y);
            ctx.stroke();
          }
        }
      }
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="particle-container">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
      <div className="cyber-grid-bg"></div>
    </div>
  );
};

export default Particles;

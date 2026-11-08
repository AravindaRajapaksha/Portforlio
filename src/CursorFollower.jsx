import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if device is a touchscreen / coarse pointer
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const sparkleColors = ["#ffffff", "#f5edff", "#e9d5ff", "#d8b4fe", "#c084fc"];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      // Spawn elegant twinkling star sparkles on mouse movement (no circle)
      if (Math.random() > 0.35) {
        spawnSparkle(e.clientX, e.clientY);
      }
    };

    const handleMouseDown = (e) => {
      // Small sparkle burst on click (pure stars, no circle ripples)
      for (let i = 0; i < 8; i++) {
        const angle = ((Math.PI * 2) / 8) * i + Math.random() * 0.4;
        const speed = Math.random() * 2.2 + 1.0;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4.5 + 2.5,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
          life: 1.0,
          decay: 0.032,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    function spawnSparkle(x, y) {
      if (particles.length > 40) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.9 + 0.25;
      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.1,
        size: Math.random() * 4.5 + 2.5,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        life: 1.0,
        decay: Math.random() * 0.022 + 0.018,
      });
    }

    // 4-point twinkling star shape
    function drawFourPointStar(x, y, radius, rotation, color, alpha) {
      const inner = radius * 0.24;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -radius);
      ctx.quadraticCurveTo(0, 0, inner, 0);
      ctx.quadraticCurveTo(0, 0, 0, radius);
      ctx.quadraticCurveTo(0, 0, -inner, 0);
      ctx.quadraticCurveTo(0, 0, 0, -radius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render only twinkling celestial star sparkles (zero circles)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        drawFourPointStar(p.x, p.y, p.size * p.life, p.rotation, p.color, p.life * 0.9);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

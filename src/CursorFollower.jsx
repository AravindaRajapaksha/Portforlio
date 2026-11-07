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

    const mouse = { x: -100, y: -100, isVisible: false };
    const trail = { x: -100, y: -100 };
    let isHovering = false;
    let isClicking = false;
    let currentRadius = 16;
    let targetRadius = 16;

    let particles = [];
    let ripples = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isVisible = true;

      // Spawn subtle cosmic stardust sparkles on movement
      if (Math.random() > 0.42) {
        spawnSparkle(e.clientX, e.clientY);
      }
    };

    const handleMouseLeave = () => {
      mouse.isVisible = false;
    };

    const handleMouseEnter = () => {
      mouse.isVisible = true;
    };

    const handleMouseDown = () => {
      isClicking = true;
      spawnClickShockwave(mouse.x, mouse.y);
    };

    const handleMouseUp = () => {
      isClicking = false;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        target.closest &&
        target.closest(
          "a, button, [role='button'], input, textarea, .card, .galleryCard, .pill, .iconPill, .tag, .contactProfileCard, .directContactCard, .socialBentoCard, .contactCvMiniBtn, .galleryBtnView, .galleryBtnDetails"
        )
      ) {
        isHovering = true;
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target &&
        target.closest &&
        target.closest(
          "a, button, [role='button'], input, textarea, .card, .galleryCard, .pill, .iconPill, .tag, .contactProfileCard, .directContactCard, .socialBentoCard, .contactCvMiniBtn, .galleryBtnView, .galleryBtnDetails"
        )
      ) {
        isHovering = false;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    const sparkleColors = ["#ffffff", "#f3e8ff", "#d8b4fe", "#c084fc", "#a855f7"];

    function spawnSparkle(x, y) {
      if (particles.length > 35) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.1 + 0.3;
      const isStar = Math.random() > 0.35;
      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.15,
        size: isStar ? Math.random() * 4.5 + 3 : Math.random() * 2 + 1,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        isStar,
        life: 1.0,
        decay: Math.random() * 0.024 + 0.018,
      });
    }

    function spawnClickShockwave(x, y) {
      ripples.push({
        x,
        y,
        radius: 8,
        maxRadius: 38,
        alpha: 0.85,
        decay: 0.045,
      });

      // Burst of sparkling micro-stars
      for (let i = 0; i < 7; i++) {
        const angle = ((Math.PI * 2) / 7) * i + Math.random() * 0.3;
        const speed = Math.random() * 2.4 + 1.2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 5 + 3,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
          isStar: true,
          life: 1.0,
          decay: 0.035,
        });
      }
    }

    function drawFourPointStar(x, y, radius, rotation, color, alpha) {
      const inner = radius * 0.25;
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

      // 1. Draw and update shockwave ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.2;
        r.alpha -= r.decay;
        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(192, 132, 252, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#c084fc";
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Draw and update stardust sparkles
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

        if (p.isStar) {
          drawFourPointStar(p.x, p.y, p.size * p.life, p.rotation, p.color, p.life * 0.9);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life * 0.75;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.restore();
        }
      }

      // 3. Smooth Lerp for Cursor Trailing Ring
      if (mouse.isVisible && mouse.x > 0 && mouse.y > 0) {
        if (trail.x === -100) {
          trail.x = mouse.x;
          trail.y = mouse.y;
        }

        trail.x += (mouse.x - trail.x) * 0.18;
        trail.y += (mouse.y - trail.y) * 0.18;

        if (isClicking) {
          targetRadius = 12;
        } else if (isHovering) {
          targetRadius = 26;
        } else {
          targetRadius = 16;
        }

        currentRadius += (targetRadius - currentRadius) * 0.15;

        // Draw Outer Cosmic Ring / Halo
        ctx.save();
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, currentRadius, 0, Math.PI * 2);

        if (isHovering) {
          ctx.fillStyle = "rgba(168, 85, 247, 0.15)";
          ctx.fill();
          ctx.strokeStyle = "rgba(216, 180, 254, 0.95)";
          ctx.lineWidth = 1.8;
          ctx.shadowColor = "rgba(192, 132, 252, 0.85)";
          ctx.shadowBlur = 14;
        } else {
          ctx.strokeStyle = "rgba(192, 132, 252, 0.65)";
          ctx.lineWidth = 1.4;
          ctx.shadowColor = "rgba(168, 85, 247, 0.5)";
          ctx.shadowBlur = 8;
        }
        ctx.stroke();
        ctx.restore();

        // Draw Center Glowing Pinpoint Core
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, isHovering ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#c084fc";
        ctx.shadowBlur = 8;
        ctx.fill();

        // Subtle soft core glow
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, isHovering ? 8 : 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(192, 132, 252, 0.35)";
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
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

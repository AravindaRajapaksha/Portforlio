import { useEffect, useRef } from "react";

export default function CursorFollower() {
    const canvasRef = useRef(null);
    // Use a ref to store mouse position so the animation loop can access the latest without re-renders
    const mouseRef = useRef({ x: -100, y: -100 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let animationFrameId;
        let particles = [];

        // Resize handling
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Initial resize
        handleResize();

        // Mouse movement
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            // Optional: Add particles immediately on move for responsiveness
            // but the loop handles it consistently
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        // Particle class-like structure (using plain objects for perf)
        const createParticle = (x, y) => {
            const hue = Math.random() > 0.5 ? 260 : 190; // Approx purples and cyans
            return {
                x,
                y,
                size: Math.random() * 2 + 1, // small dots
                color: `hsla(${hue}, 100%, 70%, 1)`,
                vX: (Math.random() - 0.5) * 0.5,
                vY: (Math.random() - 0.5) * 0.5,
                life: 1.0,
                decay: 0.02 + Math.random() * 0.02,
            };
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Add new particle at current mouse position
            // Only if mouse is on screen
            if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
                // Add a few particles per frame for a denser trail or just one
                particles.push(createParticle(mouseRef.current.x, mouseRef.current.y));
            }

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                p.x += p.vX;
                p.y += p.vY;
                p.life -= p.decay;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    i--;
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);

                // Convert HSLA to string with current alpha
                // We stored color as full string, let's just cheat and use globalCompositeOperation or simple opacity
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
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
                pointerEvents: "none",
                zIndex: 9999,
            }}
        />
    );
}

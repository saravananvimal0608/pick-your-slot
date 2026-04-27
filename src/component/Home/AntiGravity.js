import React, { useRef, useEffect } from "react";

const Antigravity = ({
  count = 600,
  color = "#5227FF",
  particleSize = 2,
  magnetRadius = 120,
}) => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    const isMobile = window.innerWidth < 768; // 🔥 mobile detect

    let time = 0;

    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        vx: 0,
        vy: 0,
        angle: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.005, // 🐢 slow for mobile float
      });
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      particles.forEach((p) => {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < magnetRadius) {
          // 🔥 ORIGINAL DESKTOP EFFECT (UNCHANGED)
          const angle = Math.atan2(dy, dx);

          const wave = Math.sin(time * 2 + p.angle) * 10;

          const targetX =
            mouse.current.x +
            Math.cos(angle + time) * (40 + wave);
          const targetY =
            mouse.current.y +
            Math.sin(angle + time) * (40 + wave);

          p.vx += (targetX - p.x) * 0.05;
          p.vy += (targetY - p.y) * 0.05;
        } else {
          if (isMobile) {
            // 🔥 MOBILE ONLY: slow floating movement
            p.angle += p.speed;

            const floatX = Math.cos(p.angle) * 0.2;
            const floatY = Math.sin(p.angle) * 0.2;

            p.vx += (p.baseX - p.x) * 0.001 + floatX;
            p.vy += (p.baseY - p.y) * 0.001 + floatY;
          } else {
            // 🔥 DESKTOP SAME (no change)
            p.vx += (p.baseX - p.x) * 0.002;
            p.vy += (p.baseY - p.y) * 0.002;
          }
        }

        // smooth
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        // draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [count, color, particleSize, magnetRadius]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
};

export default Antigravity;
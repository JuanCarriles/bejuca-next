"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

/**
 * Isla cliente con la animación de partículas del Hero.
 * Vive aparte para que la sección Hero pueda ser un server component:
 * lo único que se hidrata acá es un <canvas> vacío.
 */
export default function HeroCanvas() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 80;
    const connectionDistance = 150;
    const maxConnections = isMobile ? 2 : 3;

    const resizeCanvas = () => {
      const section = canvas.parentElement;
      canvas.width = section?.offsetWidth || window.innerWidth;
      canvas.height = section?.offsetHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;
    let frameCount = 0;
    const skipFrames = isMobile ? 2 : 0; // Skip every 2nd frame on mobile

    const animate = () => {
      frameCount++;
      if (skipFrames > 0 && frameCount % (skipFrames + 1) !== 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = theme === 'dark'
        ? 'rgba(26, 42, 58, 0.1)'
        : 'rgba(248, 250, 252, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particleColor = theme === 'dark' ? '60, 180, 216' : '8, 145, 178';

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
        ctx.fill();

        let connections = 0;
        for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleColor}, ${0.15 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            connections++;
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

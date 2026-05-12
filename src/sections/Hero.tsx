"use client";

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/context/ThemeContext';
import { ArrowRight, Cpu, Code2, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const t = useTranslations();
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

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className={`relative min-h-screen flex items-center justify-center overflow-hidden ${theme === 'dark'
      ? 'bg-gradient-to-br from-[#0d1b2a] via-[#1a2a3a] to-[#243447]'
      : 'bg-gradient-to-br from-[#f0f9ff] via-[#f8fafc] to-[#e0f2fe]'
      }`}>
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${theme === 'dark' ? 'to-[#1a2a3a]/80' : 'to-[#f8fafc]/80'
        }`} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3CB4D8]/10 border border-[#3CB4D8]/30">
              <span className="w-2 h-2 rounded-full bg-[#3CB4D8] animate-pulse" />
              <span className="text-[#3CB4D8] text-sm font-medium">{t('hero.location')}</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              {t('hero.title')}{' '}
              <span className="text-gradient">{t('hero.titleHighlight')}</span>
            </h1>

            <p className={`text-lg max-w-xl leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => scrollToSection('#contacto')}
                className="bg-[#3CB4D8] hover:bg-[#2a9bc0] text-white px-8 py-6 text-lg group"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollToSection('#servicios')}
                variant="outline"
                className={`px-8 py-6 text-lg ${theme === 'dark'
                  ? 'border-gray-600 text-white hover:bg-white/10'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {t('hero.ctaSecondary')}
              </Button>
            </div>

            {/* Stats */}
            <div className={`flex flex-wrap gap-6 sm:gap-8 pt-8 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
              <div>
                <div className="text-3xl font-bold text-[#3CB4D8]">15+</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{t('hero.stats.years')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#3CB4D8]">200+</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{t('hero.stats.projects')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#3CB4D8]">50+</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{t('hero.stats.clients')}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Central Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-48 h-48 rounded-full flex items-center justify-center glow-cyan ${theme === 'dark'
                  ? 'bg-gradient-to-br from-[#3CB4D8]/20 to-[#3CB4D8]/5 border border-[#3CB4D8]/30'
                  : 'bg-gradient-to-br from-[#3CB4D8]/30 to-[#3CB4D8]/10 border border-[#3CB4D8]/40'
                  }`}>
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#3CB4D8] to-[#2a9bc0] flex items-center justify-center">
                    <Cpu className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg ${theme === 'dark'
                    ? 'bg-[#1a2a3a] border border-[#3CB4D8]/40'
                    : 'bg-white border border-[#3CB4D8]/30'
                    }`}>
                    <Code2 className="w-8 h-8 text-[#3CB4D8]" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg ${theme === 'dark'
                    ? 'bg-[#1a2a3a] border border-[#3CB4D8]/40'
                    : 'bg-white border border-[#3CB4D8]/30'
                    }`}>
                    <LineChart className="w-8 h-8 text-[#3CB4D8]" />
                  </div>
                </div>
              </div>

              {/* Decorative Rings */}
              <div className="absolute inset-8 rounded-full border border-[#3CB4D8]/10" />
              <div className="absolute inset-16 rounded-full border border-[#3CB4D8]/10" />
              <div className="absolute inset-24 rounded-full border border-[#3CB4D8]/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${theme === 'dark' ? 'from-[#1a2a3a]' : 'from-[#f8fafc]'
        } to-transparent`} />
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/context/ThemeContext';
import { Target, Lightbulb, Users, Award } from 'lucide-react';

export default function About() {
  const t = useTranslations();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Target,
      title: t('about.values.mision.title'),
      description: t('about.values.mision.description'),
    },
    {
      icon: Lightbulb,
      title: t('about.values.vision.title'),
      description: t('about.values.vision.description'),
    },
    {
      icon: Users,
      title: t('about.values.valores.title'),
      description: t('about.values.valores.description'),
    },
    {
      icon: Award,
      title: t('about.values.experiencia.title'),
      description: t('about.values.experiencia.description'),
    },
  ];

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className={`relative py-24 section-divider ${theme === 'dark' ? 'bg-[#1a2a3a]' : 'bg-[#f8fafc]'
        }`}
    >
      {/* Background Pattern */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-5' : 'opacity-[0.03]'}`}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${theme === 'dark' ? '#3CB4D8' : '#0891b2'} 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#3CB4D8]/10 text-[#3CB4D8] text-sm font-medium mb-4">
            {t('about.label')}
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            {t('about.title')} <span className="text-gradient">{t('about.titleHighlight')}</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
            {t('about.description')}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`group relative p-6 rounded-2xl border transition-all duration-500 ${theme === 'dark'
                ? 'bg-gradient-to-br from-[#243447] to-[#1a2a3a] border-gray-700/50 hover:border-[#3CB4D8]/50'
                : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#3CB4D8]/50 shadow-sm'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'dark' ? 'bg-[#3CB4D8]/5' : 'bg-[#3CB4D8]/5'
                }`} />

              <div className="relative">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#3CB4D8]/10 group-hover:bg-[#3CB4D8]/20' : 'bg-[#3CB4D8]/10 group-hover:bg-[#3CB4D8]/20'
                  }`}>
                  <value.icon className="w-7 h-7 text-[#3CB4D8]" />
                </div>

                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>

                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('about.history.title')}
            </h3>
            <div className={`space-y-4 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>{t('about.history.p1')}</p>
              <p>{t('about.history.p2')}</p>
              <p>{t('about.history.p3')}</p>
              <p>{t('about.history.p4')}</p>
              <p>{t('about.history.p5')}</p>

            </div>
          </div>

          <div
            className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              {/* Abstract Tech Visual */}
              <div className={`aspect-[4/3] rounded-2xl border flex items-center justify-center ${theme === 'dark'
                ? 'bg-gradient-to-br from-[#243447] to-[#0d1b2a] border-gray-700/50'
                : 'bg-gradient-to-br from-white to-gray-100 border-gray-200'
                }`}>
                <div className="relative">
                  {/* Central Element */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#3CB4D8] to-[#2a9bc0] flex items-center justify-center glow-cyan">
                    <span className="text-white font-bold text-4xl">B</span>
                  </div>

                  {/* Orbiting Dots */}
                  <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '15s' }}>
                    <div className="absolute -top-4 left-1/2 w-4 h-4 rounded-full bg-[#3CB4D8]" />
                  </div>
                  <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                    <div className="absolute top-1/2 -right-4 w-3 h-3 rounded-full bg-[#5DD3F0]" />
                  </div>
                  <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '25s' }}>
                    <div className="absolute -bottom-4 left-1/2 w-2 h-2 rounded-full bg-white" />
                  </div>

                  {/* Decorative Lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full border border-[#3CB4D8]/20" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border border-[#3CB4D8]/15" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className={`absolute -bottom-6 -right-6 rounded-xl p-4 shadow-xl border ${theme === 'dark' ? 'bg-[#243447] border-gray-700/50' : 'bg-white border-gray-200'
              }`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#3CB4D8]/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#3CB4D8]" />
                </div>
                <div>
                  <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>15+ {t('about.history.badge')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

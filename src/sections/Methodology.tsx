"use client";

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { useTheme } from '@/context/ThemeContext';
import {
  Workflow,
  Zap,
  Layers,
  RefreshCw,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function Methodology() {
  const t = useTranslations();
  const messages = useMessages();
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const methods = [
    { icon: Workflow, key: 'agile' },
    { icon: Zap, key: 'rapid' },
    { icon: Layers, key: 'scalable' },
    { icon: RefreshCw, key: 'ci' },
  ];

  const benefitsRaw = (messages as Record<string, unknown>)?.methodology as Record<string, unknown> | undefined;
  const benefitsObj = benefitsRaw?.benefits as Record<string, unknown> | undefined;
  const benefits = (benefitsObj?.items as string[]) || [];

  return (
    <section
      id="metodologia"
      ref={sectionRef}
      className={`relative py-24 section-divider ${theme === 'dark' ? 'bg-[#1a2a3a]' : 'bg-[#f8fafc]'
        }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${theme === 'dark'
          ? 'bg-gradient-to-b from-[#1a2a3a] via-[#1e3040] to-[#1a2a3a]'
          : 'bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc]'
          }`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#3CB4D8]/10 text-[#3CB4D8] text-sm font-medium mb-4">
            {t('methodology.label')}
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            {t('methodology.title')} <span className="text-gradient">{t('methodology.titleHighlight')}</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
            {t('methodology.description')}
          </p>
        </div>

        {/* Methodologies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {methods.map((method, index) => (
            <div
              key={method.key}
              className={`group p-6 rounded-2xl border transition-all duration-500 ${theme === 'dark'
                ? 'bg-gradient-to-br from-[#243447] to-[#1a2a3a] border-gray-700/50 hover:border-[#3CB4D8]/50'
                : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#3CB4D8]/50 shadow-sm'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${theme === 'dark' ? 'bg-[#3CB4D8]/10 group-hover:bg-[#3CB4D8]/20' : 'bg-[#3CB4D8]/10 group-hover:bg-[#3CB4D8]/20'
                }`}>
                <method.icon className="w-6 h-6 text-[#3CB4D8]" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t(`methodology.methods.${method.key}.title`)}
              </h3>
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t(`methodology.methods.${method.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#3CB4D8]/20 to-[#2a9bc0]/10" />
          <div className={`absolute inset-0 backdrop-blur-sm ${theme === 'dark' ? 'bg-[#243447]/80' : 'bg-white/80'
            }`} />

          <div className="relative p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-[#3CB4D8]" />
                  <span className="text-[#3CB4D8] font-medium">
                    {t('methodology.benefits.label')}
                  </span>
                </div>
                <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('methodology.benefits.title')}
                </h3>
                <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('methodology.benefits.description')}
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${theme === 'dark'
                      ? 'bg-[#1a2a3a]/50 border-gray-700/30'
                      : 'bg-white/50 border-gray-200'
                      }`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#3CB4D8] flex-shrink-0" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

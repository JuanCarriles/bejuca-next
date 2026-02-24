"use client";

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/context/ThemeContext';
import {
  Brain, GraduationCap,
  Code,
  Database,
  Cloud,
  Shield, ScreenShare,
  BarChart3, Server,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resolveTranslation } from '@/hooks/useServicesData';
import ServiceDetailModal from '@/components/ServiceDetailModal';
import type { Service } from '@/types/services.types';

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Code,
  Database, ScreenShare, GraduationCap,
  Cloud, Server,
  Shield,
  BarChart3,
};

export default function Services({ services }: { services: Service[] }) {
  const t = useTranslations();
  const lang = useLocale();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openServiceModal = (service: Service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

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

  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className={`relative py-24 section-divider ${theme === 'dark' ? 'bg-[#1e3040]' : 'bg-[#e9eef4]'
        }`}
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3CB4D8]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3CB4D8]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#3CB4D8]/10 text-[#3CB4D8] text-sm font-medium mb-4">
            {t('services.label')}
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            {t('services.title')} <span className="text-gradient">{t('services.titleHighlight')}</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
            {t('services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className={`group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col ${theme === 'dark'
                  ? 'bg-gradient-to-br from-[#243447] to-[#1a2a3a] border-gray-700/50 hover:border-[#3CB4D8]/50'
                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#3CB4D8]/50 shadow-sm'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${activeService === index ? 'ring-2 ring-[#3CB4D8]/50' : ''
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
                onClick={() => openServiceModal(service)}
              >
                {/* Gradient Overlay on Hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}08 0%, transparent 100%)`,
                  }}
                />

                <div className="relative flex flex-col flex-1">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    {IconComponent && (
                      <IconComponent
                        className="w-7 h-7 transition-colors duration-300"
                        style={{ color: service.color }}
                      />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-semibold mb-3 group-hover:text-[#3CB4D8] transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    {resolveTranslation(service.title, lang)}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    {resolveTranslation(service.description, lang)}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {service.features.map((feature: string) => (
                      <span
                        key={feature}
                        className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/${lang}/servicios/${service.slug}`;
                    }}
                    className={`mt-auto inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${theme === 'dark'
                      ? 'text-gray-400 hover:text-[#3CB4D8]'
                      : 'text-gray-500 hover:text-[#0891b2]'
                      }`}
                  >
                    {lang === 'en' ? 'Learn more' : 'Saber más'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div
          className={`mt-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className={`inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-2xl border ${theme === 'dark'
            ? 'bg-gradient-to-r from-[#243447] to-[#1a2a3a] border-gray-700/50'
            : 'bg-gradient-to-r from-white to-gray-50 border-gray-200 shadow-sm'
            }`}>
            <div className="text-left">
              <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('services.cta.title')}
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('services.cta.description')}
              </p>
            </div>
            <Button
              onClick={scrollToContact}
              className="bg-[#3CB4D8] hover:bg-[#2a9bc0] text-white px-6 whitespace-nowrap"
            >
              {t('services.cta.button')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}

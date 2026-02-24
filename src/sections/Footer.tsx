"use client";

import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/context/ThemeContext';
import { Facebook, Instagram, ArrowUp } from 'lucide-react';
import { resolveTranslation } from '@/hooks/useServicesData';
import type { Service } from '@/types/services.types';

export default function Footer({ services }: { services: Service[] }) {
  const t = useTranslations();
  const lang = useLocale();
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${lang}${href}`;
    }
  };

  const goToHome = () => {
    window.location.href = `/${lang}#inicio`;
  };

  const footerLinks = {
    services: services.map((s) => ({
      name: resolveTranslation(s.title, lang),
      href: `/${lang}/servicios/${s.slug}`,
    })),
    company: [
      { name: t('about.label'), href: '#nosotros' },
      { name: t('about.values.experiencia.title'), href: '#nosotros' },
      { name: t('nav.metodologia'), href: '#metodologia' },
      { name: t('footer.links.company'), href: '#contacto' },
    ],
    support: [
      { name: t('nav.contacto'), href: '#contacto' },
      { name: 'FAQ', href: '#' },
      { name: t('footer.links.support'), href: '#' },
      { name: 'Política de Privacidad', href: '#' },
    ],
  };

  return (
    <footer className={`border-t ${theme === 'dark' ? 'bg-[#0d1b2a] border-gray-800' : 'bg-white border-gray-200'
      }`}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <button onClick={goToHome} className="flex items-center gap-3 mb-6 cursor-pointer">
              <img
                src={theme === 'dark' ? '/bejuca-logo-reducido-claro.png' : '/bejuca-logo-reducido-oscuro.png'}
                alt="Bejuca Consulting"
                className="w-12 h-12 rounded-xl object-contain"
              />
              <div className="flex flex-col text-left">
                <span className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Bejuca</span>
                <span className="text-[#3CB4D8] text-xs tracking-wider uppercase">
                  Consulting
                </span>
              </div>
            </button>

            <p className={`text-sm leading-relaxed mb-6 max-w-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
              {t('footer.description')}
            </p>

            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-[#243447] hover:bg-[#3CB4D8]/20' : 'bg-gray-100 hover:bg-[#3CB4D8]/10'
                  }`}
              >
                <Facebook className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400 hover:text-[#3CB4D8]' : 'text-gray-500'}`} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-[#243447] hover:bg-[#3CB4D8]/20' : 'bg-gray-100 hover:bg-[#3CB4D8]/10'
                  }`}
              >
                <Instagram className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400 hover:text-[#3CB4D8]' : 'text-gray-500'}`} />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-[#243447] hover:bg-[#3CB4D8]/20' : 'bg-gray-100 hover:bg-[#3CB4D8]/10'
                  }`}
              >
                <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('footer.links.services')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`transition-colors text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-[#3CB4D8]' : 'text-gray-600 hover:text-[#0891b2]'
                      }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('footer.links.company')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`transition-colors text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-[#3CB4D8]' : 'text-gray-600 hover:text-[#0891b2]'
                      }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('footer.links.support')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`transition-colors text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-[#3CB4D8]' : 'text-gray-600 hover:text-[#0891b2]'
                      }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>

            <div className="flex items-center gap-6">
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                {t('footer.location')}
              </span>
              <button
                onClick={scrollToTop}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-[#243447] hover:bg-[#3CB4D8]/20' : 'bg-gray-100 hover:bg-[#3CB4D8]/10'
                  }`}
                aria-label="Volver arriba"
              >
                <ArrowUp className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

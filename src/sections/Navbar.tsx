"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/context/ThemeContext';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    // Navigate to the same page in the new locale
    window.location.pathname = `/${lng}`;
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to landing page with the section hash
      window.location.href = `/${locale}${href}`;
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav.inicio'), href: '#inicio' },
    { name: t('nav.nosotros'), href: '#nosotros' },
    { name: t('nav.servicios'), href: '#servicios' },
    { name: t('nav.equipo'), href: '#equipo' },
    { name: t('nav.contacto'), href: '#contacto' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? theme === 'dark'
          ? 'bg-[#1a2a3a]/95 backdrop-blur-md shadow-lg'
          : 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#inicio')}
            className="flex items-center cursor-pointer"
          >
            <img
              src={theme === 'dark' ? '/bejuca-logo-claro.png' : '/bejuca-logo-oscuro.png'}
              alt="Bejuca Consulting"
              className="h-12 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`transition-colors duration-200 text-sm font-medium ${theme === 'dark'
                  ? 'text-gray-300 hover:text-[#3CB4D8]'
                  : 'text-gray-600 hover:text-[#0891b2]'
                  }`}
              >
                {link.name}
              </button>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                ? 'bg-[#243447] text-gray-300 hover:text-[#3CB4D8]'
                : 'bg-gray-100 text-gray-600 hover:text-[#0891b2]'
                }`}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${theme === 'dark'
                  ? 'bg-[#243447] text-gray-300 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}>
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase">{locale}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={theme === 'dark' ? 'bg-[#243447] border-gray-700' : 'bg-white border-gray-200'}>
                <DropdownMenuItem
                  onClick={() => changeLanguage('es')}
                  className={`cursor-pointer ${locale === 'es' ? (theme === 'dark' ? 'bg-[#3CB4D8]/20' : 'bg-cyan-50') : ''} ${theme === 'dark' ? 'text-white hover:bg-[#3CB4D8]/20' : 'text-gray-700 hover:bg-cyan-50'}`}
                >
                  🇪🇸 Español
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => changeLanguage('en')}
                  className={`cursor-pointer ${locale === 'en' ? (theme === 'dark' ? 'bg-[#3CB4D8]/20' : 'bg-cyan-50') : ''} ${theme === 'dark' ? 'text-white hover:bg-[#3CB4D8]/20' : 'text-gray-700 hover:bg-cyan-50'}`}
                >
                  🇺🇸 English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => scrollToSection('#contacto')}
              className="bg-[#3CB4D8] hover:bg-[#2a9bc0] text-white px-6"
            >
              {t('nav.consultar')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden backdrop-blur-md border-t ${theme === 'dark'
          ? 'bg-[#1a2a3a]/98 border-gray-700'
          : 'bg-white/98 border-gray-200'
          }`}>
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`block w-full text-left transition-colors duration-200 py-2 ${theme === 'dark'
                  ? 'text-gray-300 hover:text-[#3CB4D8]'
                  : 'text-gray-600 hover:text-[#0891b2]'
                  }`}
              >
                {link.name}
              </button>
            ))}

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${theme === 'dark'
                ? 'bg-[#243447] text-gray-300'
                : 'bg-gray-100 text-gray-600'
                }`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{theme === 'dark' ? 'Modo Claro' : 'Dark Mode'}</span>
            </button>

            {/* Mobile Language Selector */}
            <div className="flex gap-2 py-2">
              <button
                onClick={() => changeLanguage('es')}
                className={`flex-1 py-2 rounded-lg text-sm ${locale === 'es' ? 'bg-[#3CB4D8] text-white' : theme === 'dark' ? 'bg-[#243447] text-gray-300' : 'bg-gray-100 text-gray-600'}`}
              >
                🇪🇸 Español
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`flex-1 py-2 rounded-lg text-sm ${locale === 'en' ? 'bg-[#3CB4D8] text-white' : theme === 'dark' ? 'bg-[#243447] text-gray-300' : 'bg-gray-100 text-gray-600'}`}
              >
                🇺🇸 English
              </button>
            </div>

            <Button
              onClick={() => scrollToSection('#contacto')}
              className="w-full bg-[#3CB4D8] hover:bg-[#2a9bc0] text-white mt-4"
            >
              {t('nav.consultar')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/context/ThemeContext';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
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
    const pathname = window.location.pathname;
    const search = window.location.search;
    const hash = window.location.hash;
    const newUrl = `/${lng}${pathname.replace(/^\/[^/]+/, '')}${search}${hash}`;
    window.location.href = newUrl;
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: t('nav.inicio'), hash: '#inicio' },
    { name: t('nav.nosotros'), hash: '#nosotros' },
    { name: t('nav.servicios'), hash: '#servicios' },
    // { name: 'Cursos', hash: '/cursos' }, // Oculto temporalmente para pruebas en producción
    { name: t('nav.contacto'), hash: '#contacto' },
  ];

  const linkClasses = `transition-colors duration-200 text-sm font-medium ${theme === 'dark'
    ? 'text-gray-300 hover:text-[#3CB4D8]'
    : 'text-gray-600 hover:text-[#0891b2]'
    }`;

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
          <Link href="/" className="flex items-center cursor-pointer relative h-12 w-[160px]">
            <Image
              src={theme === 'dark' ? '/bejuca-logo-claro.png' : '/bejuca-logo-oscuro.png'}
              alt="Logo Bejuca Consulting - Consultora de transformación digital en Tucumán"
              fill
              className="object-contain"
              priority
              sizes="160px"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`/${locale}${link.hash}`}
                className={linkClasses}
              >
                {link.name}
              </a>
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

            <a href={`/${locale}#contacto`}>
              <Button className="bg-[#3CB4D8] hover:bg-[#2a9bc0] text-gray-900 font-semibold px-6">
                {t('nav.consultar')}
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú principal"}
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
              <a
                key={link.name}
                href={`/${locale}${link.hash}`}
                onClick={closeMobileMenu}
                className={`block w-full text-left transition-colors duration-200 py-2 ${theme === 'dark'
                  ? 'text-gray-300 hover:text-[#3CB4D8]'
                  : 'text-gray-600 hover:text-[#0891b2]'
                  }`}
              >
                {link.name}
              </a>
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

            <a href={`/${locale}#contacto`} onClick={closeMobileMenu} className="block">
              <Button className="w-full bg-[#3CB4D8] hover:bg-[#2a9bc0] text-gray-900 font-semibold mt-4">
                {t('nav.consultar')}
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

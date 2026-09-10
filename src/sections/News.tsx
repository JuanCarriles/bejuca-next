"use client";

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/context/ThemeContext';
import { ArrowRight, Server } from 'lucide-react';
import Link from 'next/link';

export default function News() {
    const t = useTranslations('news');
    const { theme } = useTheme();
    const locale = useLocale();
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Si la sección intersecta, o si ya quedó arriba (el usuario scrolleó rápido o recargó la página más abajo)
                if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "50px" }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
            // Fallback inmediato por si acaso el observador falla o la página carga ya scrolleada
            if (sectionRef.current.getBoundingClientRect().top <= window.innerHeight) {
                setIsVisible(true);
            }
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block px-4 py-1 rounded-full bg-[#3CB4D8]/10 text-[#3CB4D8] text-sm font-medium mb-4">
                        {t('label')}
                    </span>
                    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {t('title')} <span className="text-gradient">{t('titleHighlight')}</span>
                    </h2>
                    <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* First News Card - Proxmox Course */}
                    <div 
                        className={`group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col overflow-hidden ${theme === 'dark'
                            ? 'bg-gradient-to-br from-[#243447] to-[#1a2a3a] border-gray-700/50 hover:border-[#3CB4D8]/50 hover:-translate-y-1 hover:shadow-xl'
                            : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#3CB4D8]/50 shadow-sm hover:-translate-y-1 hover:shadow-xl'
                        } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '100ms' }}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity duration-300 group-hover:opacity-20">
                            <Server className={`w-24 h-24 ${theme === 'dark' ? 'text-[#3CB4D8]' : 'text-[#009EE3]'}`} />
                        </div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="mb-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'bg-[#3CB4D8]/20 text-[#3CB4D8]' : 'bg-[#e0f2fe] text-[#0369a1]'}`}>
                                    {t('items.course1.tag')}
                                </span>
                            </div>
                            
                            <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {t('items.course1.title')}
                            </h3>
                            
                            <p className={`mb-8 flex-grow leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                {t('items.course1.description')}
                            </p>
                            
                            <Link 
                                href={`/${locale}/cursos/proxmox-inicial`}
                                className={`inline-flex items-center gap-2 font-bold transition-colors w-fit ${theme === 'dark' ? 'text-[#3CB4D8] hover:text-white' : 'text-[#009EE3] hover:text-[#0369a1]'}`}
                            >
                                {t('items.course1.button')}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

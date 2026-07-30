"use client"

import { useTheme } from '@/context/ThemeContext';
import { Link } from '@/i18n/navigation';
import {
    Brain,
    Code,
    Database,
    Cloud, ScreenShare, GraduationCap,
    Shield,
    BarChart3,
    CheckCircle2, Server,
    Lightbulb,
    Cpu,
    ArrowLeft,
    Mail,
    type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resolveTranslation } from '@/hooks/useServicesData';
import type { Service } from '@/types/services.types';

const iconMap: Record<string, LucideIcon> = {
    Brain,
    Code,
    Database, ScreenShare, GraduationCap,
    Cloud, Server,
    Shield,
    BarChart3,
};

interface ServicePageContentProps {
    service: Service;
    lang: string;
}

export default function ServicePageContent({ service, lang }: ServicePageContentProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const IconComponent = iconMap[service.icon];
    const serviceName = resolveTranslation(service.title, lang);

    const scrollToContact = () => {
        window.location.href = `/${lang}#contacto`;
    };

    const goBack = () => {
        window.location.href = `/${lang}#servicios`;
    };

    const backHref = `/${lang}#servicios`;

    return (
        <main className={`min-h-screen ${isDark ? 'bg-[#0f1b2a] text-white' : 'bg-white text-gray-900'}`}>
            {/* Back Button */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-2">
                <a
                    href={`/${lang}#servicios`}
                    className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-500 hover:text-gray-900'
                        }`}
                >
                    <ArrowLeft className="w-4 h-4" />
                    {lang === 'en' ? 'Back to services' : 'Volver a servicios'}
                </a>
            </div>

            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex items-center gap-5 mb-6">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${service.color}20` }}
                    >
                        {IconComponent && (
                            <IconComponent className="w-8 h-8" style={{ color: service.color }} />
                        )}
                    </div>
                    <div>
                        <h1 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {resolveTranslation(service.title, lang)}
                        </h1>
                    </div>
                </div>

                <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {resolveTranslation(service.description, lang)}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                        <span
                            key={feature}
                            className="px-4 py-1.5 rounded-full text-sm font-medium"
                            style={{
                                backgroundColor: `${service.color}15`,
                                color: service.color,
                            }}
                        >
                            {feature}
                        </span>
                    ))}
                </div>
            </section>

            {/* Divider */}
            <div className={`max-w-4xl mx-auto px-4 sm:px-6 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`} />
            </div>

            {/* About This Service */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
                <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {lang === 'en' ? `More about: ${serviceName}` : `Mas sobre: ${serviceName}`}
                </h2>
                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {resolveTranslation(service.longDescription, lang)}
                </p>
            </section>

            {/* Use Cases */}
            <section className={`py-12 ${isDark ? 'bg-[#1a2a3a]/50' : 'bg-gray-50'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className={`flex items-center gap-3 text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <Lightbulb className="w-6 h-6" style={{ color: service.color }} />
                        {lang === 'en' ? 'Use Cases' : 'Casos de Uso'}
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {service.useCases.map((useCase, i) => (
                            <div
                                key={i}
                                className={`p-5 rounded-xl border ${isDark
                                    ? 'bg-[#243447]/60 border-gray-700/50'
                                    : 'bg-white border-gray-200'
                                    }`}
                            >
                                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {resolveTranslation(useCase.title, lang)}
                                </h3>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {resolveTranslation(useCase.description, lang)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
                <h2 className={`flex items-center gap-3 text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <Cpu className="w-6 h-6" style={{ color: service.color }} />
                    {lang === 'en' ? 'Technologies We Use' : 'Tecnologías que Usamos'}
                </h2>
                <div className="flex flex-wrap gap-3">
                    {service.technologies.map((tech) => (
                        <span
                            key={tech}
                            className={`px-4 py-2 rounded-lg text-sm font-medium border ${isDark
                                ? 'bg-[#243447]/60 border-gray-700/50 text-gray-300'
                                : 'bg-white border-gray-200 text-gray-700 shadow-sm'
                                }`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </section>

            {/* Divider */}
            <div className={`max-w-4xl mx-auto px-4 sm:px-6`}>
                <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`} />
            </div>

            {/* Benefits */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
                <h2 className={`flex items-center gap-3 text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <CheckCircle2 className="w-6 h-6" style={{ color: service.color }} />
                    {lang === 'en' ? 'Benefits of this service' : 'Beneficios de este servicio'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, i) => (
                        <div
                            key={i}
                            className={`flex items-start gap-3 p-4 rounded-xl ${isDark
                                ? 'bg-[#1a2a3a]/80'
                                : 'bg-gray-50'
                                }`}
                        >
                            <CheckCircle2
                                className="w-5 h-5 mt-0.5 shrink-0"
                                style={{ color: service.color }}
                            />
                            <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {resolveTranslation(benefit, lang)}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Dynamic CTA Section */}
            {service.cta && (
                <>
                    <div className={`max-w-4xl mx-auto px-4 sm:px-6`}>
                        <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`} />
                    </div>
                    
                    <section className="py-16">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                            {service.cta.title && (
                                <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {resolveTranslation(service.cta.title, lang)}
                                </h2>
                            )}
                            {service.cta.description && (
                                <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {resolveTranslation(service.cta.description, lang)}
                                </p>
                            )}
                            <Button
                                onClick={() => {
                                    if (service.cta?.isExternal) {
                                        window.open(service.cta.link, '_blank');
                                    } else {
                                        window.location.href = `/${lang}${service.cta?.link}`;
                                    }
                                }}
                                className="text-white px-8 py-6 text-base rounded-xl font-semibold shadow-md hover:brightness-95 transition-all"
                                style={{ backgroundColor: service.color }}
                            >
                                {resolveTranslation(service.cta.text, lang)}
                            </Button>
                        </div>
                    </section>
                </>
            )}

            {/* CTA Section */}
            <section className={`py-16 ${isDark ? 'bg-[#1a2a3a]/50' : 'bg-gray-50'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {lang === 'en'
                            ? 'Need a Custom Solution?'
                            : '¿Necesitás una Solución a Medida?'}
                    </h2>
                    <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {lang === 'en'
                            ? 'Contact us, we\'ll quote and design a solution tailored to your needs.'
                            : 'Contactanos, cotizamos y diseñamos una solución a medida para tus necesidades.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={scrollToContact}
                            className={`px-8 py-6 text-base rounded-xl font-semibold transition-colors ${isDark ? 'bg-[#243447] hover:bg-[#324559] text-white' : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 shadow-sm'}`}
                        >
                            <Mail className="w-5 h-5 mr-3 text-[#3CB4D8]" />
                            {lang === 'en' ? 'Contact us' : 'Formulario'}
                        </Button>
                        <Button
                            onClick={() => window.open('https://wa.me/5491123456789', '_blank')}
                            className="bg-[#25D366] hover:bg-[#1da851] text-white px-8 py-6 text-base rounded-xl font-semibold shadow-md"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            WhatsApp
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}

"use client"

import { useTheme } from '@/context/ThemeContext';
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
    MessageCircle,
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

    return (
        <main className={`min-h-screen ${isDark ? 'bg-[#0f1b2a] text-white' : 'bg-white text-gray-900'}`}>
            {/* Back Button */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-2">
                <button
                    onClick={goBack}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-500 hover:text-gray-900'
                        }`}
                >
                    <ArrowLeft className="w-4 h-4" />
                    {lang === 'en' ? 'Back to services' : 'Volver a servicios'}
                </button>
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

            {/* CTA Section */}
            <section className={`py-16 ${isDark ? 'bg-[#1a2a3a]/50' : 'bg-gray-50'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {lang === 'en'
                            ? 'Need a Custom Solution?'
                            : '¿Necesitás una Solución a Medida?'}
                    </h2>
                    <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {lang === 'en'
                            ? 'Contact us, we\'ll quote and design a solution tailored to your needs.'
                            : 'Contactanos, cotizamos y diseñamos una solución a medida para tus necesidades.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                            onClick={scrollToContact}
                            className="bg-[#3CB4D8] hover:bg-[#2a9bc0] text-white px-8 py-3 text-base"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            {lang === 'en' ? 'Contact us' : 'Contactanos'}
                        </Button>
                        <Button
                            onClick={() => window.open('https://wa.me/5491123456789', '_blank')}
                            variant="outline"
                            className={`px-8 py-3 text-base ${isDark
                                ? 'border-gray-600 text-gray-300 hover:bg-[#243447]'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            WhatsApp
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}

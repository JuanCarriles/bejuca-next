"use client"

import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/context/ThemeContext';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import {
    Brain,
    Code,
    Database,
    Cloud,
    Shield,
    BarChart3,
    CheckCircle2,
    Lightbulb,
    Cpu,
    ArrowRight,
    type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resolveTranslation } from '@/hooks/useServicesData';
import type { Service } from '@/types/services.types';

const iconMap: Record<string, LucideIcon> = {
    Brain,
    Code,
    Database,
    Cloud,
    Shield,
    BarChart3,
};

interface ServiceDetailModalProps {
    service: Service | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ServiceDetailModal({ service, open, onOpenChange }: ServiceDetailModalProps) {
    const t = useTranslations();
    const lang = useLocale();
    const { theme } = useTheme();

    if (!service) return null;

    const IconComponent = iconMap[service.icon];
    const isDark = theme === 'dark';

    const scrollToContact = () => {
        onOpenChange(false);
        setTimeout(() => {
            const element = document.querySelector('#contacto');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={`sm:max-w-2xl max-h-[85vh] overflow-y-auto p-0 border-0 ${isDark
                    ? 'bg-[#1a2a3a] text-white'
                    : 'bg-white text-gray-900'
                    }`}
            >
                {/* Header with Gradient */}
                <div
                    className="relative px-6 pt-8 pb-6"
                    style={{
                        background: `linear-gradient(135deg, ${service.color}15 0%, transparent 100%)`,
                    }}
                >
                    <DialogHeader className="gap-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `${service.color}20` }}
                            >
                                {IconComponent && (
                                    <IconComponent className="w-7 h-7" style={{ color: service.color }} />
                                )}
                            </div>
                            <div>
                                <DialogTitle className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {resolveTranslation(service.title, lang)}
                                </DialogTitle>
                                <DialogDescription className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {resolveTranslation(service.description, lang)}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {service.features.map((feature) => (
                            <span
                                key={feature}
                                className="px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                    backgroundColor: `${service.color}15`,
                                    color: service.color,
                                }}
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div className="px-6 pb-6 space-y-8">
                    {/* Long Description */}
                    <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {resolveTranslation(service.longDescription, lang)}
                    </p>

                    {/* Use Cases */}
                    <div>
                        <h4 className={`flex items-center gap-2 text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <Lightbulb className="w-5 h-5" style={{ color: service.color }} />
                            {lang === 'en' ? 'Use Cases' : 'Casos de Uso'}
                        </h4>
                        <div className="grid sm:grid-cols-1 gap-3">
                            {service.useCases.map((useCase, i) => (
                                <div
                                    key={i}
                                    className={`p-4 rounded-xl border ${isDark
                                        ? 'bg-[#243447]/60 border-gray-700/50'
                                        : 'bg-gray-50 border-gray-100'
                                        }`}
                                >
                                    <h5 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {resolveTranslation(useCase.title, lang)}
                                    </h5>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {resolveTranslation(useCase.description, lang)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technologies */}
                    <div>
                        <h4 className={`flex items-center gap-2 text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <Cpu className="w-5 h-5" style={{ color: service.color }} />
                            {lang === 'en' ? 'Technologies' : 'Tecnologías'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${isDark
                                        ? 'bg-[#243447]/60 border-gray-700/50 text-gray-300'
                                        : 'bg-white border-gray-200 text-gray-700'
                                        }`}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Benefits */}
                    <div>
                        <h4 className={`flex items-center gap-2 text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <CheckCircle2 className="w-5 h-5" style={{ color: service.color }} />
                            {lang === 'en' ? 'Benefits' : 'Beneficios'}
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {service.benefits.map((benefit, i) => (
                                <div
                                    key={i}
                                    className={`flex items-start gap-3 p-3 rounded-lg ${isDark
                                        ? 'bg-[#243447]/40'
                                        : 'bg-gray-50'
                                        }`}
                                >
                                    <CheckCircle2
                                        className="w-4 h-4 mt-0.5 shrink-0"
                                        style={{ color: service.color }}
                                    />
                                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {resolveTranslation(benefit, lang)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className={`p-5 rounded-xl border text-center ${isDark
                        ? 'bg-[#243447]/60 border-gray-700/50'
                        : 'bg-gray-50 border-gray-100'
                        }`}
                    >
                        <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {t('services.cta.description')}
                        </p>
                        <Button
                            onClick={scrollToContact}
                            className="bg-[#3CB4D8] hover:bg-[#2a9bc0] text-white px-6"
                        >
                            {t('services.cta.button')}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

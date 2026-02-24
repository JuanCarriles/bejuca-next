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
    Database, ScreenShare, GraduationCap,
    Cloud, Server,
    Shield,
    BarChart3,
    CheckCircle2,
    ArrowRight,
    MessageCircle,
    type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resolveTranslation } from '@/hooks/useServicesData';
import type { Service } from '@/types/services.types';

const iconMap: Record<string, LucideIcon> = {
    Brain,
    Code, ScreenShare, GraduationCap,
    Database,
    Cloud, Server,
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

    const goToServicePage = () => {
        onOpenChange(false);
        window.location.href = `/${lang}/servicios/${service.slug}`;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={`sm:max-w-lg max-h-[85vh] overflow-y-auto p-0 border-0 ${isDark
                    ? 'bg-[#1a2a3a] text-white'
                    : 'bg-white text-gray-900'
                    }`}
            >
                {/* Header with Icon + Title */}
                <div
                    className="relative px-6 pt-8 pb-4"
                    style={{
                        background: `linear-gradient(135deg, ${service.color}15 0%, transparent 100%)`,
                    }}
                >
                    <DialogHeader className="gap-3">
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
                </div>

                {/* Body */}
                <div className="px-6 pb-6 space-y-5">
                    {/* Questions Section */}
                    <div>
                        <h4 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            {lang === 'en' ? 'Do you need this service?' : '¿Necesitás este servicio?'}
                        </h4>
                        <div className="space-y-2.5">
                            {service.questions.map((question, i) => (
                                <div
                                    key={i}
                                    className={`flex items-start gap-3 p-3 rounded-lg ${isDark
                                        ? 'bg-[#243447]/60'
                                        : 'bg-gray-50'
                                        }`}
                                >
                                    <CheckCircle2
                                        className="w-5 h-5 mt-0.5 shrink-0"
                                        style={{ color: service.color }}
                                    />
                                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {resolveTranslation(question, lang)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className={`border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200'}`} />

                    {/* Modal Description */}
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {resolveTranslation(service.modalDescription, lang)}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button
                            onClick={goToServicePage}
                            variant="outline"
                            className={`flex-1 ${isDark
                                ? 'border-gray-600 text-gray-300 hover:bg-[#243447]'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {lang === 'en' ? 'Learn more' : 'Saber más'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                            onClick={scrollToContact}
                            className="flex-1 bg-[#3CB4D8] hover:bg-[#2a9bc0] text-white"
                        >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {lang === 'en' ? 'Contact us' : 'Contactar'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

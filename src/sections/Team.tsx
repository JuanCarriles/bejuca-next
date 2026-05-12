"use client";

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

interface TeamMember {
    key: string;
    image: string;
    accentColor: string;
}

const teamMembers: TeamMember[] = [
    { key: 'silvana', image: '/images/team/silvana.jpg', accentColor: '#3CB4D8' },
    { key: 'luis', image: '/images/team/luis.jpg', accentColor: '#2a9bc0' },
    { key: 'belen', image: '/images/team/belen.jpg', accentColor: '#E91E90' },
    { key: 'juan', image: '/images/team/juan.jpg', accentColor: '#6C63FF' },
];

export default function Team() {
    const t = useTranslations();
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

    return (
        <section
            id="equipo"
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
                        {t('team.label')}
                    </span>
                    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        {t('team.title')} <span className="text-gradient">{t('team.titleHighlight')}</span>
                    </h2>
                    <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {t('team.description')}
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.key}
                            className={`group relative p-8 rounded-2xl border text-center transition-all duration-500 hover:scale-[1.03] hover:shadow-xl ${theme === 'dark'
                                ? 'bg-gradient-to-br from-[#243447] to-[#1a2a3a] border-gray-700/50 hover:border-[#3CB4D8]/50'
                                : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#3CB4D8]/50 shadow-sm'
                                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${index * 120}ms` }}
                        >
                            {/* Decorative top accent */}
                            <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity"
                                style={{ backgroundColor: member.accentColor }}
                            />

                            {/* Avatar */}
                            <div className="relative mx-auto mb-6 w-36 h-36 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105"
                                style={{
                                    border: `3px solid ${member.accentColor}50`,
                                }}
                            >
                                <Image
                                    src={member.image}
                                    alt={`${t(`team.members.${member.key}.name`)}, ${t(`team.members.${member.key}.role`)} en Bejuca Consulting`}
                                    fill
                                    className="object-cover"
                                    sizes="144px"
                                />
                            </div>

                            {/* Name */}
                            <h3 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {t(`team.members.${member.key}.name`)}
                            </h3>

                            {/* Role */}
                            <p
                                className="text-sm font-semibold mb-2"
                                style={{ color: member.accentColor }}
                            >
                                {t(`team.members.${member.key}.role`)}
                            </p>

                            {/* Degree */}
                            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {t(`team.members.${member.key}.degree`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

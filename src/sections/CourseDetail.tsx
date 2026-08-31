"use client";

import { useTheme } from '@/context/ThemeContext';
import { Course } from '@/data/courses';
import { Calendar, Clock, GraduationCap, CheckCircle2, ChevronDown, ChevronRight, FileText, MonitorPlay, CalendarDays, ArrowLeft, Mail, MessageCircle, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
    course: Course;
    locale: string;
}

export default function CourseDetail({ course, locale }: Props) {
    const { theme } = useTheme();
    const currentLocale = locale as 'es' | 'en';
    const t = useTranslations('courses');
    const tContact = useTranslations('contact');

    return (
        <>
            <main className={`min-h-screen pt-24 pb-20 ${theme === 'dark' ? 'bg-[#0d1b2a]' : 'bg-gray-50'}`}>
                {/* Hero Section */}
                <section className={`border-b ${theme === 'dark' ? 'bg-[#1a2a3a] border-gray-800' : 'bg-white border-gray-200'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                        <div className="grid lg:grid-cols-3 gap-12 items-start">
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <Link
                                        href={`/${locale}/cursos`}
                                        className={`inline-flex items-center gap-2 mb-6 text-sm font-medium transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-[#3CB4D8]' : 'text-gray-500 hover:text-[#3CB4D8]'}`}
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        {currentLocale === 'es' ? 'Volver a cursos' : 'Back to courses'}
                                    </Link>
                                    <br />
                                    <span className="inline-block px-3 py-1 bg-[#3CB4D8]/10 text-[#3CB4D8] rounded-full text-sm font-semibold uppercase tracking-wider">
                                        {course.modality.replace(/-/g, ' ')}
                                    </span>
                                </div>
                                <h1 className={`text-4xl md:text-5xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {course.title[currentLocale]}
                                </h1>
                                <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {course.subtitle[currentLocale]}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                                    <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${theme === 'dark' ? 'bg-[#3CB4D8]/10' : 'bg-cyan-50'}`}>
                                            <Calendar className="w-5 h-5 text-[#3CB4D8]" />
                                        </div>
                                        <div>
                                            <p className={`text-xs uppercase tracking-wider font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{currentLocale === 'es' ? 'Inicio' : 'Start Date'}</p>
                                            <p className="font-bold">{course.startDate[currentLocale]}</p>
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${theme === 'dark' ? 'bg-[#3CB4D8]/10' : 'bg-cyan-50'}`}>
                                            <Clock className="w-5 h-5 text-[#3CB4D8]" />
                                        </div>
                                        <div>
                                            <p className={`text-xs uppercase tracking-wider font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{currentLocale === 'es' ? 'Duración' : 'Duration'}</p>
                                            <p className="font-bold">{course.duration[currentLocale]}</p>
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${theme === 'dark' ? 'bg-[#3CB4D8]/10' : 'bg-cyan-50'}`}>
                                            <CalendarDays className="w-5 h-5 text-[#3CB4D8]" />
                                        </div>
                                        <div>
                                            <p className={`text-xs uppercase tracking-wider font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{currentLocale === 'es' ? 'Horario' : 'Schedule'}</p>
                                            <p className="font-bold">{course.schedule[currentLocale]}</p>
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${theme === 'dark' ? 'bg-[#3CB4D8]/10' : 'bg-cyan-50'}`}>
                                            <MonitorPlay className="w-5 h-5 text-[#3CB4D8]" />
                                        </div>
                                        <div>
                                            <p className={`text-xs uppercase tracking-wider font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{currentLocale === 'es' ? 'Modalidad' : 'Modality'}</p>
                                            <p className="font-bold capitalize">{course.modality.replace(/-/g, ' ')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sticky Checkout Card */}
                            <div className={`lg:sticky lg:top-32 rounded-2xl p-8 border shadow-xl ${theme === 'dark' ? 'bg-[#243447] border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Inversión</p>
                                <div className="space-y-4 mb-6 mt-2">
                                    {currentLocale === 'es' ? (
                                        <>
                                            <div className={`p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'bg-[#009EE3]/10 border-[#009EE3]/30' : 'bg-white border-[#009EE3]/20 shadow-sm'}`}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-[#38bdf8]' : 'text-[#009EE3]'}`}>Mercado Pago (Argentina)</span>
                                                    <img src="/marcadologo.png" alt="Mercado Pago" className="h-5 opacity-90" />
                                                </div>
                                                <div className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                    ${course.priceARS.toLocaleString('es-AR')} <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>ARS</span>
                                                </div>
                                            </div>

                                            {course.priceTransferARS && (
                                                <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-md ${theme === 'dark' ? 'bg-[#10b981]/10 border-[#10b981]/30' : 'bg-[#ecfdf5] border-[#10b981]/30 shadow-sm'}`}>
                                                    <a href={`https://wa.me/${(course.instructor.phone || tContact('info.phone.content')).replace(/\D/g, '')}?text=${encodeURIComponent(`Hola, quisiera inscribirme al curso de ${course.title[currentLocale]} pagando por transferencia bancaria.`)}`} target="_blank" rel="noopener noreferrer" className="block">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-[#34d399]' : 'text-[#059669]'}`}>
                                                                {t('transferBank')}
                                                            </span>
                                                        </div>
                                                        
                                                        <div className="flex flex-col mb-1">
                                                            <div className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                                ${course.priceTransferARS.toLocaleString('es-AR')} <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>ARS</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className={`text-sm font-medium line-through ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                                                                    ${course.priceARS.toLocaleString('es-AR')}
                                                                </span>
                                                                <span className="text-[10px] font-bold bg-[#10b981] text-white px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                                                                    {t('transferDiscount', { discount: Math.round((1 - course.priceTransferARS / course.priceARS) * 100) })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className={`mt-3 pt-3 border-t ${theme === 'dark' ? 'border-[#10b981]/20' : 'border-[#10b981]/20'} flex items-center gap-1.5 text-xs font-bold ${theme === 'dark' ? 'text-[#34d399]' : 'text-[#059669]'}`}>
                                                            <MessageCircle className="w-3.5 h-3.5" />
                                                            {t('coordinateWhatsapp')}
                                                        </div>
                                                    </a>
                                                </div>
                                            )}

                                            <div className={`p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'bg-[#0070BA]/10 border-[#0070BA]/30' : 'bg-white border-[#0070BA]/20 shadow-sm'}`}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#0070BA]'}`}>PayPal (Internacional)</span>
                                                    <span className={`text-sm font-extrabold italic ${theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#0070BA]'}`}>PayPal</span>
                                                </div>
                                                <div className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                    US$ {course.priceUSD}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className={`p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'bg-[#0070BA]/10 border-[#0070BA]/30' : 'bg-white border-[#0070BA]/20 shadow-sm'}`}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#0070BA]'}`}>PayPal (International)</span>
                                                <span className={`text-sm font-extrabold italic ${theme === 'dark' ? 'text-[#60a5fa]' : 'text-[#0070BA]'}`}>PayPal</span>
                                            </div>
                                            <div className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                US$ {course.priceUSD}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <Link href={`/${locale}/cursos/${course.slug}/inscripcion`} className="block w-full">
                                    <Button
                                        className="w-full bg-[#3CB4D8] hover:bg-[#2a9bc0] text-gray-900 font-bold px-10 py-6 text-lg rounded-xl shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        {currentLocale === 'es' ? 'Inscribirme Ahora' : 'Enroll Now'}
                                    </Button>
                                </Link>
                                <p className={`text-xs text-center mt-3 mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {currentLocale === 'es' ? 'Pagos seguros por Mercado Pago o PayPal' : 'Secure payments via PayPal'}
                                </p>

                                <div className={`p-4 rounded-xl flex items-start gap-3 ${theme === 'dark' ? 'bg-[#3CB4D8]/10 border border-[#3CB4D8]/20' : 'bg-[#e0f2fe] border border-[#bae6fd]'}`}>
                                    <Mail className="w-5 h-5 text-[#0284c7] dark:text-[#3CB4D8] shrink-0 mt-0.5" />
                                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-[#0369a1]'}`}>
                                        {t('emailNotification')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 flex flex-col gap-12">

                            {/* About */}
                            <section>
                                <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Acerca del Curso</h2>
                                <p className={`leading-relaxed text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {course.fullDescription[currentLocale]}
                                </p>
                            </section>

                            {/* What you'll learn */}
                            <section className={`rounded-2xl p-8 border ${theme === 'dark' ? 'bg-[#1a2a3a] border-gray-800' : 'bg-white border-gray-100'}`}>
                                <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Lo que aprenderás</h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {course.objectives.map((obj, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#3CB4D8] shrink-0 mt-0.5" />
                                            <span className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{obj[currentLocale]}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Syllabus */}
                            <section>
                                <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Temario</h2>
                                <div className="space-y-4">
                                    {course.syllabus.map((mod, i) => (
                                        <details key={i} className={`group rounded-xl border ${theme === 'dark' ? 'bg-[#1a2a3a] border-gray-800' : 'bg-white border-gray-200'}`}>
                                            <summary className={`flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                {mod.title[currentLocale]}
                                                <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:-rotate-180" />
                                            </summary>
                                            <div className={`px-6 pb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                <ul className="list-disc pl-5 space-y-2">
                                                    {mod.topics.map((topic, j) => (
                                                        <li key={j}>{topic[currentLocale]}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* Sidebar details */}
                        <div className="space-y-8">

                            {/* Includes */}
                            <div className={`rounded-2xl p-6 border ${theme === 'dark' ? 'bg-[#1a2a3a] border-gray-800' : 'bg-white border-gray-100'}`}>
                                <h3 className={`font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>El curso incluye:</h3>
                                <ul className="space-y-4">
                                    {course.includes.map((inc, i) => (
                                        <li key={i} className={`flex items-start gap-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#3CB4D8] shrink-0 mt-1.5" />
                                            <span className="leading-relaxed">{inc[currentLocale]}</span>
                                        </li>
                                    ))}
                                    <li className={`flex items-start gap-3 text-sm pt-4 border-t ${theme === 'dark' ? 'text-gray-300 border-gray-800' : 'text-gray-600 border-gray-100'}`}>
                                        <GraduationCap className="w-5 h-5 text-[#3CB4D8] shrink-0" />
                                        <span className="leading-relaxed">{course.certificate[currentLocale]}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Instructor */}
                            <div className={`rounded-2xl p-6 border ${theme === 'dark' ? 'bg-[#1a2a3a] border-gray-800' : 'bg-white border-gray-100'}`}>
                                <h3 className={`font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Tu Docente</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={course.instructor.photo} alt={course.instructor.name} className="w-16 h-16 rounded-full" />
                                    <div>
                                        <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{course.instructor.name}</p>
                                        <p className="text-sm text-[#3CB4D8]">{course.instructor.role[currentLocale]}</p>
                                    </div>
                                </div>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {course.instructor.bio[currentLocale]}
                                </p>

                                {course.instructor.social && (
                                    <div className="flex items-center gap-3 mt-4">
                                        {course.instructor.social.linkedin && (
                                            <a href={course.instructor.social.linkedin} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-[#0a66c2]' : 'bg-gray-100 text-gray-500 hover:text-white hover:bg-[#0a66c2]'}`}>
                                                <Linkedin className="w-4 h-4" />
                                            </a>
                                        )}
                                        {course.instructor.social.instagram && (
                                            <a href={course.instructor.social.instagram} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-[#E1306C]' : 'bg-gray-100 text-gray-500 hover:text-white hover:bg-[#E1306C]'}`}>
                                                <Instagram className="w-4 h-4" />
                                            </a>
                                        )}
                                        {course.instructor.social.facebook && (
                                            <a href={course.instructor.social.facebook} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-[#1877F2]' : 'bg-gray-100 text-gray-500 hover:text-white hover:bg-[#1877F2]'}`}>
                                                <Facebook className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                )}
                                <a 
                                    href={`https://wa.me/${(course.instructor.phone || tContact('info.phone.content')).replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${course.instructor.name}, tengo una consulta sobre el curso de ${course.title[currentLocale]}.`)}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`mt-6 w-full flex items-center justify-center gap-2 text-sm font-bold px-4 py-3 rounded-xl transition-colors ${theme === 'dark' ? 'bg-[#3CB4D8]/10 text-[#3CB4D8] hover:bg-[#3CB4D8]/20 border border-[#3CB4D8]/20' : 'bg-[#e0f2fe] text-[#0369a1] hover:bg-[#bae6fd] border border-[#bae6fd]'}`}
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    {t('consultTeacher')}
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

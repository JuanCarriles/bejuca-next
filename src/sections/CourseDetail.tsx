"use client";

import { useTheme } from '@/context/ThemeContext';
import { Course } from '@/data/courses';
import { Calendar, Clock, GraduationCap, CheckCircle2, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import EnrollmentModal from '@/components/EnrollmentModal';

interface Props {
    course: Course;
    locale: string;
}

export default function CourseDetail({ course, locale }: Props) {
    const { theme } = useTheme();
    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
    const currentLocale = locale as 'es' | 'en';

    return (
        <>
            <main className={`min-h-screen pt-24 pb-20 ${theme === 'dark' ? 'bg-[#0d1b2a]' : 'bg-gray-50'}`}>
                {/* Hero Section */}
                <section className={`border-b ${theme === 'dark' ? 'bg-[#1a2a3a] border-gray-800' : 'bg-white border-gray-200'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                        <div className="grid lg:grid-cols-3 gap-12 items-start">
                            <div className="lg:col-span-2 space-y-6">
                                <span className="inline-block px-3 py-1 bg-[#3CB4D8]/10 text-[#3CB4D8] rounded-full text-sm font-semibold uppercase tracking-wider">
                                    {course.modality}
                                </span>
                                <h1 className={`text-4xl md:text-5xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {course.title[currentLocale]}
                                </h1>
                                <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {course.subtitle[currentLocale]}
                                </p>
                                
                                <div className="flex flex-wrap gap-6 pt-6">
                                    <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${theme === 'dark' ? 'bg-[#3CB4D8]/10' : 'bg-cyan-50'}`}>
                                            <Calendar className="w-5 h-5 text-[#3CB4D8]" />
                                        </div>
                                        <div>
                                            <p className={`text-xs uppercase tracking-wider font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Inicio</p>
                                            <p className="font-bold">{course.startDate[currentLocale]}</p>
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${theme === 'dark' ? 'bg-[#3CB4D8]/10' : 'bg-cyan-50'}`}>
                                            <Clock className="w-5 h-5 text-[#3CB4D8]" />
                                        </div>
                                        <div>
                                            <p className={`text-xs uppercase tracking-wider font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Duración</p>
                                            <p className="font-bold">{course.duration[currentLocale]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Sticky Checkout Card */}
                            <div className={`lg:sticky lg:top-32 rounded-2xl p-8 border shadow-xl ${theme === 'dark' ? 'bg-[#243447] border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Inversión</p>
                                <div className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {currentLocale === 'es' ? `$${course.priceARS.toLocaleString('es-AR')}` : `US$${course.priceUSD}`}
                                </div>
                                <Button 
                                    onClick={() => setIsEnrollModalOpen(true)}
                                    className="w-full sm:w-auto bg-[#3CB4D8] hover:bg-[#2a9bc0] text-gray-900 font-bold px-10 py-6 text-lg rounded-xl shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl"
                                >
                                    {currentLocale === 'es' ? 'Inscribirme Ahora' : 'Enroll Now'}
                                </Button>
                                <p className={`text-xs text-center mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {currentLocale === 'es' ? 'Pagos seguros por Mercado Pago o PayPal' : 'Secure payments via PayPal'}
                                </p>
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
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <EnrollmentModal 
                isOpen={isEnrollModalOpen} 
                onClose={() => setIsEnrollModalOpen(false)} 
                course={course} 
                locale={locale} 
            />
        </>
    );
}

"use client";

import { useTheme } from '@/context/ThemeContext';
import { Course } from '@/data/courses';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Props {
    courses: Course[];
    locale: string;
}

export default function CourseCatalog({ courses, locale }: Props) {
    const { theme } = useTheme();
    const currentLocale = locale as 'es' | 'en';

    return (
        <main className={`min-h-screen pt-24 pb-20 ${theme === 'dark' ? 'bg-[#0d1b2a]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 pt-10">
                    <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Nuestros <span className="text-[#3CB4D8]">Cursos</span>
                    </h1>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Impulsa tu carrera con capacitación práctica, dictada por expertos de la industria.
                    </p>
                </div>

                {/* Catalog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {courses.map(course => (
                        <div key={course.id} className={`rounded-2xl overflow-hidden shadow-lg border transition-transform hover:-translate-y-1 ${theme === 'dark' ? 'bg-[#1a2a3a] border-gray-800' : 'bg-white border-gray-100'}`}>
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#3CB4D8]/10 text-[#3CB4D8] rounded-full text-xs font-semibold uppercase tracking-wider">
                                        {course.modality}
                                    </span>
                                </div>
                                <h2 className={`text-2xl font-bold mb-3 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {course.title[currentLocale]}
                                </h2>
                                <p className={`mb-6 line-clamp-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {course.description[currentLocale]}
                                </p>
                                
                                <div className="space-y-4 mb-8">
                                    <div className={`flex items-center gap-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${theme === 'dark' ? 'bg-[#3CB4D8]/10' : 'bg-cyan-50'}`}>
                                            <Calendar className="w-4 h-4 text-[#3CB4D8]" />
                                        </div>
                                        <span>{course.startDate[currentLocale]}</span>
                                    </div>
                                    <div className={`flex items-center gap-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${theme === 'dark' ? 'bg-[#3CB4D8]/10' : 'bg-cyan-50'}`}>
                                            <Clock className="w-4 h-4 text-[#3CB4D8]" />
                                        </div>
                                        <span>{course.duration[currentLocale]} ({course.totalHours} hs)</span>
                                    </div>
                                    <div className={`flex items-center gap-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${theme === 'dark' ? 'bg-[#3CB4D8]/10' : 'bg-cyan-50'}`}>
                                            <BookOpen className="w-4 h-4 text-[#3CB4D8]" />
                                        </div>
                                        <span>{course.syllabus.length} módulos</span>
                                    </div>
                                </div>

                                <div className={`flex items-center justify-between mt-auto pt-6 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
                                    <div>
                                        <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Precio</p>
                                        <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                            {currentLocale === 'es' ? `$${course.priceARS.toLocaleString('es-AR')}` : `US$${course.priceUSD}`}
                                        </p>
                                    </div>
                                    <Link href={`/${locale}/cursos/${course.slug}`}>
                                        <Button className="bg-[#3CB4D8] hover:bg-[#2a9bc0] text-gray-900 font-semibold">
                                            Ver Detalle
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}

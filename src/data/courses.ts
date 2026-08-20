export type Modality = 'presencial' | 'online-en-vivo' | 'asincronico' | 'hibrido';

export interface FAQ {
    question: { es: string; en: string };
    answer: { es: string; en: string };
}

export interface SyllabusModule {
    title: { es: string; en: string };
    topics: { es: string; en: string }[];
}

export interface Instructor {
    name: string;
    role: { es: string; en: string };
    bio: { es: string; en: string };
    photo: string;
    email: string;
    phone?: string;
}

export interface Course {
    id: string;
    slug: string;
    title: { es: string; en: string };
    subtitle: { es: string; en: string };
    description: { es: string; en: string }; // Short summary
    fullDescription: { es: string; en: string }; // Detailed description
    modality: Modality;
    startDate: { es: string; en: string };
    schedule: { es: string; en: string };
    duration: { es: string; en: string };
    totalHours: number;
    priceARS: number;
    priceUSD: number;
    priceTransferARS?: number;
    prerequisites: { es: string; en: string }[];
    targetAudience: { es: string; en: string }[];
    objectives: { es: string; en: string }[];
    syllabus: SyllabusModule[];
    instructor: Instructor;
    certificate: { es: string; en: string };
    includes: { es: string; en: string }[];
    whatsappGroupLink: string;
    faq: FAQ[];
}

import coursesData from '../../public/data/courses.json';

export const courses: Course[] = coursesData as Course[];

export function getCourseBySlug(slug: string): Course | undefined {
    return courses.find(course => course.slug === slug);
}

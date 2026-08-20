import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getCourseBySlug, courses } from '@/data/courses';
import EnrollmentPage from '@/components/EnrollmentPage';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    return courses.flatMap(course => [
        { locale: 'es', slug: course.slug },
        { locale: 'en', slug: course.slug }
    ]);
}

export async function generateMetadata({ params }: Props) {
    const { locale, slug } = await params;
    const course = getCourseBySlug(slug);
    if (!course) return {};

    const currentLocale = locale as 'es' | 'en';
    
    return {
        title: `${currentLocale === 'es' ? 'Inscripción' : 'Enrollment'} - ${course.title[currentLocale]} | Bejuca`,
        description: currentLocale === 'es' 
            ? `Inscribite al curso ${course.title[currentLocale]} de Bejuca Consulting`
            : `Enroll in ${course.title[currentLocale]} at Bejuca Consulting`,
    };
}

export default async function InscripcionPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const course = getCourseBySlug(slug);

    if (!course) {
        notFound();
    }

    return <EnrollmentPage course={course} locale={locale} />;
}

import { notFound } from 'next/navigation';
import { getCourseBySlug, courses } from '@/data/courses';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CourseDetail from '@/sections/CourseDetail';
import servicesData from '../../../../../public/data/services.json';
import type { Service } from '@/types/services.types';

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
        title: `${course.title[currentLocale]} | Bejuca Cursos`,
        description: course.description[currentLocale],
    };
}

export default async function CourseDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    const services = servicesData as Service[];
    const course = getCourseBySlug(slug);
    const currentLocale = locale as 'es' | 'en';

    if (!course) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <CourseDetail course={course} locale={locale} />
            <Footer services={services} />
            <WhatsAppButton />
        </>
    );
}

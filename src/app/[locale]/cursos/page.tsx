import { getTranslations, setRequestLocale } from 'next-intl/server';
import { courses } from '@/data/courses';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CourseCatalog from '@/sections/CourseCatalog';
import servicesData from '../../../../public/data/services.json';
import type { Service } from '@/types/services.types';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'courses' });
    
    return {
        title: `Cursos | Bejuca Consulting`,
        description: 'Capacitación en marketing digital, programación y negocios.',
        alternates: {
            canonical: `https://bejuca.com.ar/${locale}/cursos`,
            languages: {
                es: 'https://bejuca.com.ar/es/cursos',
                en: 'https://bejuca.com.ar/en/cursos',
            },
        },
    };
}

export default async function CoursesCatalogPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const services = servicesData as Service[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentLocale = locale as any;

    return (
        <>
            <Navbar />
            <CourseCatalog courses={courses} locale={locale} />
            <Footer services={services} />
            <WhatsAppButton />
        </>
    );
}

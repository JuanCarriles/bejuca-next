import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import servicesData from '../../../../../public/data/services.json';
import type { Service } from '@/types/services.types';
import ServicePageContent from '@/components/ServicePageContent';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { resolveTranslation } from '@/hooks/useServicesData';

const services = servicesData as Service[];

function getServiceBySlug(slug: string): Service | undefined {
    return services.find((s) => s.slug === slug);
}

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) return {};

    const title = resolveTranslation(service.title, locale);
    const description = resolveTranslation(service.description, locale);

    return {
        title: `${title} | Bejuca Consulting`,
        description,
        alternates: {
            canonical: `https://bejuca.com/${locale}/servicios/${slug}`,
            languages: {
                es: `https://bejuca.com/es/servicios/${slug}`,
                en: `https://bejuca.com/en/servicios/${slug}`,
            },
        },
        openGraph: {
            title: `${title} | Bejuca Consulting`,
            description,
            url: `https://bejuca.com/${locale}/servicios/${slug}`,
            siteName: 'Bejuca Consulting',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
    };
}

export function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export default async function ServicePage({ params }: Props) {
    const { locale, slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <ServicePageContent service={service} lang={locale} />
            <Footer services={services} />
        </>
    );
}

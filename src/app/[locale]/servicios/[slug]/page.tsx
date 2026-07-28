import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import servicesData from '../../../../../public/data/services.json';
import type { Service } from '@/types/services.types';
import ServicePageContent from '@/components/ServicePageContent';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { resolveTranslation } from '@/hooks/useServicesData';
import {
    serviceSchema,
    breadcrumbSchema,
    faqPageSchema,
} from '@/lib/seo/schemas';

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
        authors: [{ name: 'Bejuca Consulting' }],
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: `https://bejuca.com.ar/${locale}/servicios/${slug}`,
            languages: {
                es: `https://bejuca.com.ar/es/servicios/${slug}`,
                en: `https://bejuca.com.ar/en/servicios/${slug}`,
            },
        },
        openGraph: {
            title: `${title} | Bejuca Consulting`,
            description,
            url: `https://bejuca.com.ar/${locale}/servicios/${slug}`,
            siteName: 'Bejuca Consulting',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
            images: [
                {
                    url: 'https://bejuca.com.ar/bejuca-logo-oscuro.png',
                    width: 800,
                    height: 800,
                    alt: `${title} | Bejuca Consulting`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Bejuca Consulting`,
            description,
            site: '@bejucatuc',
            images: ['https://bejuca.com.ar/bejuca-logo-oscuro.png'],
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

    const title = resolveTranslation(service.title, locale);
    const isEs = locale === 'es';

    const breadcrumbItems = [
        {
            name: isEs ? 'Inicio' : 'Home',
            url: `https://bejuca.com.ar/${locale}`,
        },
        {
            name: isEs ? 'Servicios' : 'Services',
            url: `https://bejuca.com.ar/${locale}/servicios`,
        },
        {
            name: title,
            url: `https://bejuca.com.ar/${locale}/servicios/${slug}`,
        },
    ];

    const faqAnswers = service.questions.map(() => service.modalDescription);

    const schemas = [
        serviceSchema(locale, service),
        breadcrumbSchema(locale, breadcrumbItems),
        faqPageSchema(locale, service.questions, faqAnswers),
    ];

    return (
        <>
            {schemas.map((s, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
                />
            ))}
            <Navbar />
            <ServicePageContent service={service} lang={locale} />
            <Footer services={services} />
        </>
    );
}

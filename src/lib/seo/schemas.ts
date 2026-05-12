/**
 * Helper functions to generate Schema.org JSON-LD structured data.
 */

const BASE_URL = 'https://bejuca.com';

export function organizationSchema(locale: string) {
    const isEs = locale === 'es';
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Bejuca Consulting',
        alternateName: isEs
            ? 'Bejuca Consulting - Transformación Digital'
            : 'Bejuca Consulting - Digital Transformation',
        url: `${BASE_URL}/${locale}`,
        logo: `${BASE_URL}/bejuca-logo-oscuro.png`,
        sameAs: [
            'https://www.facebook.com/bejuca',
            'https://www.instagram.com/bejucatuc/',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+54-381-532-6666',
            contactType: 'customer service',
            email: 'informes@bejuca.com.ar',
            availableLanguage: ['Spanish', 'English'],
            areaServed: 'AR',
        },
    };
}

export function localBusinessSchema(locale: string) {
    const isEs = locale === 'es';
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Bejuca Consulting',
        description: isEs
            ? 'Consultora de transformación digital e ingeniería de software en Tucumán, Argentina.'
            : 'Digital transformation and software engineering consultancy in Tucumán, Argentina.',
        url: `${BASE_URL}/${locale}`,
        logo: `${BASE_URL}/bejuca-logo-oscuro.png`,
        image: `${BASE_URL}/bejuca-logo-oscuro.png`,
        telephone: '+54-381-532-6666',
        email: 'informes@bejuca.com.ar',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Tucumán',
            addressRegion: 'Tucumán',
            addressCountry: 'AR',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: -26.8083,
            longitude: -65.2176,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
            },
        ],
        priceRange: '$$$',
        areaServed: {
            '@type': 'Country',
            name: 'Argentina',
        },
        sameAs: [
            'https://www.facebook.com/bejuca',
            'https://www.instagram.com/bejucatuc/',
        ],
    };
}

export function personSchema(
    locale: string,
    member: {
        key: string;
        name: string;
        role: string;
        degree: string;
    }
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: member.name,
        jobTitle: member.role,
        alumniOf: member.degree,
        worksFor: {
            '@type': 'Organization',
            name: 'Bejuca Consulting',
            url: `${BASE_URL}/${locale}`,
        },
        url: `${BASE_URL}/${locale}#equipo`,
    };
}

export function serviceSchema(
    locale: string,
    service: {
        slug: string;
        title: { es: string; en: string };
        description: { es: string; en: string };
        features: string[];
        technologies: string[];
    }
) {
    const isEs = locale === 'es';
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: isEs ? service.title.es : service.title.en,
        description: isEs ? service.description.es : service.description.en,
        provider: {
            '@type': 'Organization',
            name: 'Bejuca Consulting',
            url: `${BASE_URL}/${locale}`,
        },
        url: `${BASE_URL}/${locale}/servicios/${service.slug}`,
        areaServed: {
            '@type': 'Country',
            name: 'Argentina',
        },
        serviceType: isEs ? 'Consultoría Tecnológica' : 'Technology Consulting',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: isEs ? 'Servicios incluidos' : 'Included services',
            itemListElement: service.features.map((feature, i) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: feature,
                },
                position: i + 1,
            })),
        },
    };
}

export function breadcrumbSchema(
    locale: string,
    items: Array<{ name: string; url: string }>
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function faqPageSchema(
    locale: string,
    questions: Array<{ es: string; en: string }>,
    answers: Array<{ es: string; en: string }>
) {
    const isEs = locale === 'es';
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map((q, i) => ({
            '@type': 'Question',
            name: isEs ? q.es : q.en,
            acceptedAnswer: {
                '@type': 'Answer',
                text: isEs ? answers[i]?.es : answers[i]?.en,
            },
        })),
    };
}

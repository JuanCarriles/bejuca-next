import type { MetadataRoute } from 'next';
import servicesData from '../../public/data/services.json';

const BASE_URL = 'https://bejuca.com.ar';

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ['es', 'en'];
    const serviceSlugs = (servicesData as Array<{ slug: string }>).map(
        (s) => s.slug
    );

    const entries: MetadataRoute.Sitemap = [];

    for (const locale of locales) {
        // Homepage
        entries.push({
            url: `${BASE_URL}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
            alternates: {
                languages: {
                    es: `${BASE_URL}/es`,
                    en: `${BASE_URL}/en`,
                },
            },
        });

        // Service pages
        for (const slug of serviceSlugs) {
            entries.push({
                url: `${BASE_URL}/${locale}/servicios/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: {
                    languages: {
                        es: `${BASE_URL}/es/servicios/${slug}`,
                        en: `${BASE_URL}/en/servicios/${slug}`,
                    },
                },
            });
        }
    }

    return entries;
}

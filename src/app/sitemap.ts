import type { MetadataRoute } from 'next';
import servicesData from '../../public/data/services.json';

const BASE_URL = 'https://bejuca.com.ar';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const locales = ['es', 'en'];
    const serviceSlugs = (servicesData as Array<{ slug: string }>).map(
        (s) => s.slug
    );
    
    // Obtener cursos dinámicos
    const { courses } = await import('@/data/courses');
    const courseSlugs = courses.map((c) => c.slug);

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

        // Course Catalog
        entries.push({
            url: `${BASE_URL}/${locale}/cursos`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
            alternates: {
                languages: {
                    es: `${BASE_URL}/es/cursos`,
                    en: `${BASE_URL}/en/cursos`,
                },
            },
        });

        // Course Detail pages
        for (const slug of courseSlugs) {
            entries.push({
                url: `${BASE_URL}/${locale}/cursos/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
                alternates: {
                    languages: {
                        es: `${BASE_URL}/es/cursos/${slug}`,
                        en: `${BASE_URL}/en/cursos/${slug}`,
                    },
                },
            });
        }
    }

    return entries;
}

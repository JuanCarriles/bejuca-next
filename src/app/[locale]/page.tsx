import type { Metadata } from 'next';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Team from '@/sections/Team';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import servicesData from '../../../public/data/services.json';
import type { Service } from '@/types/services.types';
import {
    organizationSchema,
    localBusinessSchema,
    personSchema,
} from '@/lib/seo/schemas';
import messagesEs from '../../../messages/es.json';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isEs = locale === 'es';

    const title = isEs
        ? 'Bejuca Consulting | Transformación Digital y Software en Tucumán'
        : 'Bejuca Consulting | Digital Transformation & Software in Tucumán';

    const description = isEs
        ? 'Consultora de transformación digital e ingeniería de software en Tucumán, Argentina. Desarrollo a medida, infraestructura IT, marketing digital y e-learning desde 2010.'
        : 'Digital transformation and software engineering consultancy in Tucumán, Argentina. Custom development, IT infrastructure, digital marketing and e-learning since 2010.';

    return {
        title,
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
            canonical: `https://bejuca.com/${locale}`,
            languages: {
                es: 'https://bejuca.com/es',
                en: 'https://bejuca.com/en',
            },
        },
        openGraph: {
            title,
            description,
            url: `https://bejuca.com/${locale}`,
            siteName: 'Bejuca Consulting',
            locale: isEs ? 'es_AR' : 'en_US',
            type: 'website',
            images: [
                {
                    url: 'https://bejuca.com/bejuca-logo-oscuro.png',
                    width: 800,
                    height: 800,
                    alt: 'Bejuca Consulting Logo',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            site: '@bejucatuc',
            images: ['https://bejuca.com/bejuca-logo-oscuro.png'],
        },
    };
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    const services = servicesData as Service[];

    const teamMembers = [
        { key: 'silvana', ...messagesEs.team.members.silvana },
        { key: 'luis', ...messagesEs.team.members.luis },
        { key: 'belen', ...messagesEs.team.members.belen },
        { key: 'juan', ...messagesEs.team.members.juan },
    ];

    const schemas = [
        organizationSchema(locale),
        localBusinessSchema(locale),
        ...teamMembers.map((m) => personSchema(locale, m)),
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
            <main>
                <Hero />
                <About />
                <Services services={services} />
                <Team />
                <Contact services={services} />
            </main>
            <Footer services={services} />
            <WhatsAppButton />
        </>
    );
}

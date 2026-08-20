import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Geist } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import '../globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Habilita el renderizado estático: sin esto next-intl fuerza render dinámico
    // y el HTML se arma en el servidor en cada visita.
    setRequestLocale(locale);

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} antialiased`}
            >
                <NextIntlClientProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

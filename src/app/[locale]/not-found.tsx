'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFound() {
    const locale = useLocale();
    const isEs = locale === 'es';

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d1b2a] text-white px-4">
            <div className="text-center max-w-lg">
                <h1 className="text-6xl font-bold text-[#3CB4D8] mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-4">
                    {isEs ? 'Página no encontrada' : 'Page not found'}
                </h2>
                <p className="text-gray-400 mb-8">
                    {isEs
                        ? 'La página que estás buscando no existe o ha sido movida.'
                        : 'The page you are looking for does not exist or has been moved.'}
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#3CB4D8] hover:bg-[#2a9bc0] text-white rounded-lg transition-colors"
                >
                    {isEs ? 'Volver al inicio' : 'Back to home'}
                </Link>
            </div>
        </div>
    );
}

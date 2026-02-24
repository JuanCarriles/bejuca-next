/**
 * Helper to resolve a Translation object to the current language.
 */
export function resolveTranslation(
    translation: { es: string; en: string },
    lang: string
): string {
    const key = lang as keyof typeof translation;
    return translation[key] || translation.es;
}

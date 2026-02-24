export interface Translation {
    es: string;
    en: string;
}

export interface ServiceUseCase {
    title: Translation;
    description: Translation;
}

export interface Service {
    id: string;
    slug: string;
    icon: string;
    color: string;
    title: Translation;
    description: Translation;
    features: string[];
    // Modal fields
    questions: Translation[];
    modalDescription: Translation;
    // Page fields
    longDescription: Translation;
    useCases: ServiceUseCase[];
    technologies: string[];
    benefits: Translation[];
}

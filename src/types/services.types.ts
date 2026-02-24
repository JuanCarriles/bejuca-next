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
    icon: string;
    color: string;
    title: Translation;
    description: Translation;
    features: string[];
    // Modal fields
    longDescription: Translation;
    useCases: ServiceUseCase[];
    technologies: string[];
    benefits: Translation[];
}

"use client";

import { useEffect, useRef, useState } from 'react';
import {
  Workflow,
  Zap,
  Layers,
  RefreshCw,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const technologies = [
  { name: 'Python', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'PyTorch', category: 'AI/ML' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
];

const methodologies = [
  {
    icon: Workflow,
    title: 'Metodología Ágil',
    description: 'Scrum y Kanban para entregas iterativas y adaptación continua a los cambios.',
  },
  {
    icon: Zap,
    title: 'Desarrollo Rápido',
    description: 'Ciclos de desarrollo cortos que permiten validar y ajustar rápidamente.',
  },
  {
    icon: Layers,
    title: 'Arquitectura Escalable',
    description: 'Diseños modulares que crecen junto con tu negocio sin comprometer el rendimiento.',
  },
  {
    icon: RefreshCw,
    title: 'Integración Continua',
    description: 'CI/CD automatizado para despliegues frecuentes y confiables.',
  },
];

const benefits = [
  'Reducción de costos operativos hasta un 40%',
  'Mejora en la eficiencia de procesos en un 60%',
  'Time-to-market reducido en un 50%',
  'Escalabilidad garantizada para el crecimiento',
  'Seguridad y compliance integrados',
  'Soporte técnico especializado 24/7',
];

export default function Technology() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tecnologia"
      ref={sectionRef}
      className="relative py-24 bg-[#1a2a3a]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a2a3a] via-[#1e3040] to-[#1a2a3a]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#3CB4D8]/10 text-[#3CB4D8] text-sm font-medium mb-4">
            Tecnología & Metodología
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Stack <span className="text-gradient">Tecnológico</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Utilizamos las tecnologías más avanzadas del mercado combinadas con
            metodologías probadas para garantizar el éxito de cada proyecto.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div
          className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="group relative p-4 rounded-xl bg-[#243447] border border-gray-700/50 hover:border-[#3CB4D8]/50 transition-all duration-300 text-center"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="text-white font-medium text-sm group-hover:text-[#3CB4D8] transition-colors">
                {tech.name}
              </div>
              <div className="text-gray-500 text-xs mt-1">{tech.category}</div>
            </div>
          ))}
        </div>

        {/* Methodologies */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {methodologies.map((method, index) => (
            <div
              key={method.title}
              className={`group p-6 rounded-2xl bg-gradient-to-br from-[#243447] to-[#1a2a3a] border border-gray-700/50 hover:border-[#3CB4D8]/50 transition-all duration-500 ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#3CB4D8]/10 flex items-center justify-center mb-4 group-hover:bg-[#3CB4D8]/20 transition-colors">
                <method.icon className="w-6 h-6 text-[#3CB4D8]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {method.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {method.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '700ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#3CB4D8]/20 to-[#2a9bc0]/10" />
          <div className="absolute inset-0 bg-[#243447]/80 backdrop-blur-sm" />

          <div className="relative p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-[#3CB4D8]" />
                  <span className="text-[#3CB4D8] font-medium">
                    Resultados Medibles
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Beneficios de trabajar con nosotros
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Nuestro enfoque orientado a resultados garantiza que cada proyecto
                  genere un impacto tangible en tu negocio, medible y sostenible en el tiempo.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#1a2a3a]/50 border border-gray-700/30"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#3CB4D8] flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
};

/**
 * Isla cliente mínima para las animaciones de entrada.
 *
 * Observa su contenedor y le agrega `.is-visible`; el resto lo hace el CSS
 * (ver `[data-reveal]` en globals.css). Los hijos llegan como payload ya
 * renderizado en el servidor, así que no se hidratan: lo único que React
 * maneja en el cliente es este div.
 */
export default function Reveal({ children, className = '', threshold = 0.2 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} data-reveal className={`${isVisible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Methodology from '@/sections/Methodology';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import servicesData from '../../../public/data/services.json';
import type { Service } from '@/types/services.types';

export default function HomePage() {
    const services = servicesData as Service[];

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Services services={services} />
                <Methodology />
                <Contact services={services} />
            </main>
            <Footer services={services} />
            <WhatsAppButton />
        </>
    );
}

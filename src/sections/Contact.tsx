"use client";

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/context/ThemeContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Instagram,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { resolveTranslation } from '@/hooks/useServicesData';
import type { Service } from '@/types/services.types';

export default function Contact({ services }: { services: Service[] }) {
  const t = useTranslations();
  const lang = useLocale();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);

    try {
      const selectedService = services.find((s) => s.id === formData.service);
      const serviceName = selectedService
        ? resolveTranslation(selectedService.title, lang)
        : formData.service === 'other'
          ? 'Otro'
          : t('contact.form.servicePlaceholder');

      // CREDENCIALES DE EMAILJS DESDE EL .ENV
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.error('Faltan cargar las variables de EmailJS en el archivo .env');
        throw new Error('Faltan credenciales de EmailJS');
      }

      // Los parámetros que se envían a la plantilla de EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'No proporcionada',
        service: serviceName,
        message: formData.message,
      };

      // Se carga bajo demanda: el SDK no viaja en el bundle inicial de la home.
      const { default: emailjs } = await import('@emailjs/browser');

      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );
      console.log('EmailJS response:', result.text);

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Email send error:', error);
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    { icon: MapPin, key: 'location' },
    { icon: Mail, key: 'email' },
    { icon: Phone, key: 'phone' },
    { icon: Clock, key: 'hours' },
  ];

  const serviceOptions = [
    ...services.map((s) => ({ key: s.id, value: s.id, label: resolveTranslation(s.title, lang) })),
    { key: 'other', value: 'other', label: lang === 'en' ? 'Other' : 'Otro' },
  ];

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className={`relative py-24 section-divider ${theme === 'dark' ? 'bg-[#1e3040]' : 'bg-[#e9eef4]'
        }`}
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3CB4D8]/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#3CB4D8]/10 text-[#3CB4D8] text-sm font-medium mb-4">
            {t('contact.label')}
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            {t('contact.title')} <span className="text-gradient">{t('contact.titleHighlight')}</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.key}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-colors duration-300 ${theme === 'dark'
                    ? 'bg-[#243447] border-gray-700/50 hover:border-[#3CB4D8]/30'
                    : 'bg-white border-gray-200 hover:border-[#3CB4D8]/30 shadow-sm'
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-[#3CB4D8]/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-[#3CB4D8]" />
                  </div>
                  <div>
                    <h3 className={`text-base font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t(`contact.info.${info.key}.title`)}
                    </h3>
                    <p className="text-[#3CB4D8] font-semibold">{t(`contact.info.${info.key}.content`)}</p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      {t(`contact.info.${info.key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#243447] border-gray-700/50' : 'bg-white border-gray-200 shadow-sm'
              }`}>
              <h3 className={`text-base font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('contact.social')}
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/bejuca"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar Facebook de Bejuca"
                  className="w-10 h-10 rounded-lg bg-[#3CB4D8]/10 flex items-center justify-center hover:bg-[#3CB4D8]/20 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-[#3CB4D8]" />
                </a>
                <a
                  href="https://www.instagram.com/bejucatuc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar Instagram de Bejuca"
                  className="w-10 h-10 rounded-lg bg-[#3CB4D8]/10 flex items-center justify-center hover:bg-[#3CB4D8]/20 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-[#3CB4D8]" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className={`p-8 rounded-2xl border ${theme === 'dark'
              ? 'bg-gradient-to-br from-[#243447] to-[#1a2a3a] border-gray-700/50'
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-sm'
              }`}>
              <h3 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('contact.form.title')}
              </h3>

              {hasError && (
                <div className="flex items-center gap-3 p-4 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{t('contact.form.error')}</p>
                </div>
              )}

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#3CB4D8]/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-[#3CB4D8]" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {t('contact.form.success')}
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {t('contact.form.successDescription')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        {t('contact.form.name')} *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('contact.form.namePlaceholder')}
                        required
                        className={`${theme === 'dark'
                          ? 'bg-[#1a2a3a] border-gray-700 text-white placeholder:text-gray-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                          } focus:border-[#3CB4D8] focus:ring-[#3CB4D8]/20`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        {t('contact.form.email')} *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('contact.form.emailPlaceholder')}
                        required
                        className={`${theme === 'dark'
                          ? 'bg-[#1a2a3a] border-gray-700 text-white placeholder:text-gray-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                          } focus:border-[#3CB4D8] focus:ring-[#3CB4D8]/20`}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="company" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        {t('contact.form.company')} <span className="text-xs opacity-50">({t('contact.form.optional')})</span>
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t('contact.form.companyPlaceholder')}
                        className={`${theme === 'dark'
                          ? 'bg-[#1a2a3a] border-gray-700 text-white placeholder:text-gray-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                          } focus:border-[#3CB4D8] focus:ring-[#3CB4D8]/20`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        {t('contact.form.service')} <span className="text-xs opacity-50">({t('contact.form.optional')})</span>
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, service: value }))
                        }
                      >
                        <SelectTrigger 
                          aria-label={t('contact.form.servicePlaceholder')}
                          className={`${theme === 'dark'
                          ? 'bg-[#1a2a3a] border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-[#3CB4D8]/20`}>
                          <SelectValue placeholder={t('contact.form.servicePlaceholder')} />
                        </SelectTrigger>
                        <SelectContent className={theme === 'dark' ? 'bg-[#243447] border-gray-700' : 'bg-white border-gray-200'}>
                          {serviceOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className={`${theme === 'dark' ? 'text-white hover:bg-[#3CB4D8]/20 focus:bg-[#3CB4D8]/20' : 'text-gray-700 hover:bg-cyan-50 focus:bg-cyan-50'}`}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      {t('contact.form.message')} *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.form.messagePlaceholder')}
                      required
                      rows={5}
                      className={`${theme === 'dark'
                        ? 'bg-[#1a2a3a] border-gray-700 text-white placeholder:text-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                        } focus:border-[#3CB4D8] focus:ring-[#3CB4D8]/20 resize-none`}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#3CB4D8] hover:bg-[#2a9bc0] text-gray-900 font-semibold py-6"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('contact.form.sending')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {t('contact.form.submit')}
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>

                  <p className={`text-xs text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    {t('contact.form.privacy')}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

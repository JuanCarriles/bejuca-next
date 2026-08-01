"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Course } from "@/data/courses";
import { useTheme } from "@/context/ThemeContext";
import { Loader2, ArrowLeft, ShieldCheck, MessageCircle } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  fullName: z.string().min(3, "El nombre completo es requerido"),
  email: z.string().email("Debe ser un email válido"),
  phone: z.string().min(8, "El teléfono es requerido"),
  dni: z.string().min(7, "El DNI/Pasaporte es requerido"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  course: Course;
  locale: string;
}

export default function EnrollmentPage({ course, locale }: Props) {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'paypal' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const currentLocale = locale as "en" | "es";
  const isDark = theme === "dark";

  const onSubmit = async (data: FormData) => {
    if (!paymentMethod) return;
    setIsSubmitting(true);
    setError(null);
    try {
      if (paymentMethod === 'mercadopago') {
        const res = await fetch('/api/checkout/mercadopago', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, courseSlug: course.slug })
        });
        const json = await res.json();
        if (json.init_point) {
          window.location.href = json.init_point;
        } else {
          throw new Error("No init_point returned");
        }
      } else if (paymentMethod === 'paypal') {
        const res = await fetch('/api/checkout/paypal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, courseSlug: course.slug })
        });
        const json = await res.json();
        if (json.approveLink) {
          window.location.href = json.approveLink;
        } else {
          throw new Error("No approve link returned");
        }
      }
    } catch (err: any) {
      setError("Ocurrió un error al procesar tu solicitud. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0d1b2a]' : 'bg-gray-100'}`}>
      {/* Top bar with back button */}
      <div className={`sticky top-0 z-40 backdrop-blur-xl border-b ${isDark ? 'bg-[#0d1b2a]/90 border-gray-800' : 'bg-white/90 border-gray-200'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link
            href={`/${locale}/cursos/${course.slug}`}
            className={`flex items-center gap-2 text-sm font-medium rounded-lg px-3 py-2 transition-colors ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === "en" ? "Back to course" : "Volver al curso"}
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Page header */}
        <div className="mb-8 md:mb-10">
          <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {locale === "en" ? "Enrollment" : "Inscripción al Curso"}
          </h1>
          <p className={`text-base md:text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {course.title[currentLocale]}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10">

            {/* ── LEFT: Form Fields (3 cols) ── */}
            <div className="lg:col-span-3">
              <div className={`rounded-2xl p-6 md:p-8 border ${isDark ? 'bg-[#1a2a3a] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <h2 className={`font-semibold text-lg mb-6 pb-3 border-b ${isDark ? 'text-gray-100 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                  {locale === "en" ? "Your Details" : "Tus Datos"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      {locale === "en" ? "Full Name" : "Nombre Completo"}
                    </label>
                    <Input
                      {...register("fullName")}
                      className={`h-11 ${isDark ? "bg-[#0d1b2a] border-gray-700" : "bg-gray-50"} ${errors.fullName ? "border-[#ef4444] focus-visible:ring-[#ef4444]" : ""}`}
                      placeholder="Juan Pérez"
                    />
                    {errors.fullName && <p className="text-[#ef4444] text-xs mt-1.5">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <Input
                      {...register("email")}
                      type="email"
                      className={`h-11 ${isDark ? "bg-[#0d1b2a] border-gray-700" : "bg-gray-50"} ${errors.email ? "border-[#ef4444] focus-visible:ring-[#ef4444]" : ""}`}
                      placeholder="juan@ejemplo.com"
                    />
                    {errors.email && <p className="text-[#ef4444] text-xs mt-1.5">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      {locale === "en" ? "Phone" : "Teléfono / WhatsApp"}
                    </label>
                    <Input
                      {...register("phone")}
                      type="tel"
                      className={`h-11 ${isDark ? "bg-[#0d1b2a] border-gray-700" : "bg-gray-50"} ${errors.phone ? "border-[#ef4444] focus-visible:ring-[#ef4444]" : ""}`}
                      placeholder="+54 9 11 1234 5678"
                    />
                    {errors.phone && <p className="text-[#ef4444] text-xs mt-1.5">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      {locale === "en" ? "ID / Passport" : "DNI / Pasaporte"}
                    </label>
                    <Input
                      {...register("dni")}
                      className={`h-11 ${isDark ? "bg-[#0d1b2a] border-gray-700" : "bg-gray-50"} ${errors.dni ? "border-[#ef4444] focus-visible:ring-[#ef4444]" : ""}`}
                      placeholder="12345678"
                    />
                    {errors.dni && <p className="text-[#ef4444] text-xs mt-1.5">{errors.dni.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Pricing & Pay buttons (2 cols) ── */}
            <div className="lg:col-span-2">
              <div className={`rounded-2xl p-6 md:p-8 border lg:sticky lg:top-20 ${isDark ? 'bg-[#1a2a3a] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <h2 className={`font-semibold text-lg mb-5 pb-3 border-b ${isDark ? 'text-gray-100 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                  {locale === "en" ? "Payment Method" : "Método de Pago"}
                </h2>

                {/* Price cards */}
                <div className="flex flex-col gap-3 mb-6">
                  {locale === "es" && (
                    <div className={`flex justify-between items-center p-4 rounded-xl border-2 ${isDark ? 'border-[#009EE3]/40 bg-[#009EE3]/10' : 'border-[#009EE3]/25 bg-[#009EE3]/5'}`}>
                      <div>
                        <span className={`text-xs font-bold uppercase block ${isDark ? 'text-[#38bdf8]' : 'text-[#009EE3]'}`}>Mercado Pago</span>
                        <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Argentina</span>
                      </div>
                      <span className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ${course.priceARS.toLocaleString('es-AR')} <span className="text-sm font-normal opacity-60">ARS</span>
                      </span>
                    </div>
                  )}
                  <div className={`flex justify-between items-center p-4 rounded-xl border-2 ${isDark ? 'border-[#0070BA]/40 bg-[#0070BA]/10' : 'border-[#0070BA]/25 bg-[#0070BA]/5'}`}>
                    <div>
                      <span className={`text-xs font-bold uppercase block ${isDark ? 'text-[#60a5fa]' : 'text-[#0070BA]'}`}>PayPal</span>
                      <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{locale === "es" ? "Internacional" : "International"}</span>
                    </div>
                    <span className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      US$ {course.priceUSD}
                    </span>
                  </div>
                </div>

                {error && (
                  <p className="text-[#ef4444] font-semibold text-sm text-center bg-red-500/10 p-3 rounded-lg mb-4">{error}</p>
                )}

                {/* Pay buttons */}
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    onClick={() => setPaymentMethod('mercadopago')}
                    disabled={isSubmitting}
                    style={{ backgroundColor: '#009EE3', color: 'white' }}
                    className="w-full h-14 flex items-center hover:opacity-90 transition-all hover:-translate-y-0.5 hover:shadow-lg border-0 rounded-xl"
                  >
                    {isSubmitting && paymentMethod === 'mercadopago' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <div className="flex items-center w-full px-3">
                        <img src="/marcadologo.png" alt="MP" className="h-7 w-auto shrink-0 object-contain" />
                        <span className="font-bold text-base flex-1 text-center">
                          {locale === "en" ? "Pay with Mercado Pago" : "Pagar con Mercado Pago"}
                        </span>
                      </div>
                    )}
                  </Button>

                  <Button
                    type="submit"
                    onClick={() => setPaymentMethod('paypal')}
                    disabled={isSubmitting}
                    style={{ backgroundColor: '#FFC439', color: '#003087' }}
                    className="w-full h-14 flex items-center hover:opacity-90 transition-all hover:-translate-y-0.5 hover:shadow-lg border-0 rounded-xl"
                  >
                    {isSubmitting && paymentMethod === 'paypal' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <div className="flex items-center w-full px-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg" alt="PayPal" className="h-7 shrink-0 object-contain" />
                        <span className="font-bold text-base flex-1 text-center">
                          {locale === "en" ? "Pay with PayPal" : "Pagar con PayPal"}
                        </span>
                      </div>
                    )}
                  </Button>
                </div>

                {/* Security badge */}
                <div className={`flex items-center justify-center gap-2 mt-5 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {locale === "en" ? "Secure encrypted payment" : "Pago seguro y encriptado"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Contact help section */}
        <div className={`mt-16 md:mt-20 mb-8 rounded-2xl p-6 md:p-8 border text-center ${isDark ? 'bg-[#1a2a3a]/60 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex flex-col items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
              <MessageCircle className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {locale === "en" ? "Need help?" : "¿Tenés alguna duda?"}
            </h3>
            <p className={`text-sm max-w-md ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {locale === "en"
                ? "If you have any questions or issues with your enrollment, don't hesitate to contact us. We're here to help!"
                : "Si tenés alguna duda o problema con tu inscripción, no dudes en contactarnos. ¡Estamos para ayudarte!"}
            </p>
            <a
              href="https://wa.me/543815326666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: '#25D366' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {locale === "en" ? "Chat with us on WhatsApp" : "Escribinos por WhatsApp"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

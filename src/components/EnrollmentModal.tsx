"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Course } from "@/data/courses";
import { useTheme } from "@/context/ThemeContext";
import { Loader2, AlertCircle, CheckCircle2, Handshake } from "lucide-react";

// Schema for validation
const schema = z.object({
  fullName: z.string().min(3, "El nombre completo es requerido"),
  email: z.string().email("Debe ser un email válido"),
  phone: z.string().min(8, "El teléfono es requerido"),
  dni: z.string().min(7, "El DNI/Pasaporte es requerido"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  locale: string;
}

export default function EnrollmentModal({ isOpen, onClose, course, locale }: Props) {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'paypal' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
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
          // MercadoPago para ARS
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
          // PayPal para USD
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

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className={`${isDark ? "bg-[#1a2a3a] text-white border-gray-800" : "bg-white text-gray-900 border-gray-200"}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {locale === "en" ? "Enroll in Course" : "Inscripción al Curso"}
          </DialogTitle>
          <DialogDescription className={isDark ? "text-gray-400" : "text-gray-500"}>
            {course.title[currentLocale]}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              {locale === "en" ? "Full Name" : "Nombre Completo"}
            </label>
            <Input
              {...register("fullName")}
              className={`${isDark ? "bg-[#0d1b2a] border-gray-700" : ""} ${errors.fullName ? "border-[#ef4444] focus-visible:ring-[#ef4444]" : ""}`}
              placeholder="Juan Pérez"
            />
            {errors.fullName && (
              <p className="text-[#ef4444] font-semibold text-xs mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <Input
              {...register("email")}
              type="email"
              className={`${isDark ? "bg-[#0d1b2a] border-gray-700" : ""} ${errors.email ? "border-[#ef4444] focus-visible:ring-[#ef4444]" : ""}`}
              placeholder="juan@ejemplo.com"
            />
            {errors.email && (
              <p className="text-[#ef4444] font-semibold text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              {locale === "en" ? "Phone" : "Teléfono / WhatsApp"}
            </label>
            <Input
              {...register("phone")}
              type="tel"
              className={`${isDark ? "bg-[#0d1b2a] border-gray-700" : ""} ${errors.phone ? "border-[#ef4444] focus-visible:ring-[#ef4444]" : ""}`}
              placeholder="+54 9 11 1234 5678"
            />
            {errors.phone && (
              <p className="text-[#ef4444] font-semibold text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              {locale === "en" ? "ID / Passport" : "DNI / Pasaporte"}
            </label>
            <Input
              {...register("dni")}
              className={`${isDark ? "bg-[#0d1b2a] border-gray-700" : ""} ${errors.dni ? "border-[#ef4444] focus-visible:ring-[#ef4444]" : ""}`}
              placeholder="12345678"
            />
            {errors.dni && (
              <p className="text-[#ef4444] font-semibold text-xs mt-1">{errors.dni.message}</p>
            )}
          </div>

          {error && <p className="text-[#ef4444] font-semibold text-sm">{error}</p>}

          <div className="pt-4 flex flex-col gap-4">
            {/* Caja de Precio Total */}
            <div className={`p-4 rounded-lg flex justify-between items-center ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
              <span className="font-medium text-lg">
                {locale === "en" ? "Total to pay:" : "Total a pagar:"}
              </span>
              <span className="text-2xl font-bold text-[#3CB4D8]">
                {locale === "en" 
                  ? `US$${course.priceUSD}`
                  : `$${course.priceARS.toLocaleString('es-AR')} ARS`
                }
              </span>
            </div>

            <Button
              type="submit"
              onClick={() => setPaymentMethod('mercadopago')}
              disabled={isSubmitting}
              style={{ backgroundColor: '#009EE3', color: 'white', padding: '0 1rem' }}
              className="w-full h-12 flex items-center hover:opacity-90 transition-opacity border-0"
            >
              {isSubmitting && paymentMethod === 'mercadopago' ? (
                <div className="w-full flex justify-center"><Loader2 className="w-5 h-5 animate-spin" /></div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div className="w-8 flex justify-start items-center">
                    <Handshake className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-base flex-1 text-center">
                    {locale === "en" ? "Pay with Mercado Pago" : "Pagar con Mercado Pago"}
                  </span>
                  <div className="w-8" /> {/* Spacer to perfectly center the text */}
                </div>
              )}
            </Button>

            <Button
              type="submit"
              onClick={() => setPaymentMethod('paypal')}
              disabled={isSubmitting}
              style={{ backgroundColor: '#FFC439', color: '#003087', padding: '0 1rem' }}
              className="w-full h-12 flex items-center hover:opacity-90 transition-opacity border-0"
            >
              {isSubmitting && paymentMethod === 'paypal' ? (
                <div className="w-full flex justify-center"><Loader2 className="w-5 h-5 animate-spin" /></div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div className="w-8 flex justify-start">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg" 
                      alt="PayPal" 
                      className="h-6 object-contain" 
                    />
                  </div>
                  <span className="font-bold text-base flex-1 text-center">
                    {locale === "en" ? "Pay with PayPal" : "Pagar con PayPal"}
                  </span>
                  <div className="w-8" /> {/* Spacer to perfectly center the text */}
                </div>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className={`w-full h-12 mt-2 ${isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-300' : ''}`}
            >
              {locale === "en" ? "Cancel" : "Cancelar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

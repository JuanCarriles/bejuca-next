"use client";

import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PagoExitosoPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { locale } = useParams();

  const isEn = locale === "en";

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)' }} className="w-full flex flex-col items-center justify-center p-6">
      <div className={`max-w-lg w-full text-center p-10 md:p-14 rounded-3xl shadow-xl transition-all ${isDark ? "bg-[#1a2a3a] border border-gray-800 text-white" : "bg-white border border-gray-100 text-gray-900"}`}>
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-green-500/10 p-5 inline-flex items-center justify-center ring-[12px] ring-green-500/5">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          {isEn ? "Payment Successful!" : "¡Pago Exitoso!"}
        </h1>
        
        <p className={`text-lg mb-10 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {isEn 
            ? "Your enrollment has been confirmed. You will receive an email shortly with all the details to access the course."
            : "Tu inscripción ha sido confirmada. En breve recibirás un correo electrónico con todos los detalles para acceder al curso."}
        </p>

        <Link href={`/${locale}`}>
          <Button className="w-full h-14 text-xl font-bold bg-gradient-to-r from-[#3CB4D8] to-[#2A9AB9] hover:opacity-90 text-white rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">
            {isEn ? "Return to Home" : "Volver al Inicio"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PagoFallidoPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { locale } = useParams();

  const isEn = locale === "en";

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)' }} className="w-full flex flex-col items-center justify-center p-6">
      <div className={`max-w-lg w-full text-center p-10 md:p-14 rounded-3xl shadow-xl transition-all ${isDark ? "bg-[#1a2a3a] border border-gray-800 text-white" : "bg-white border border-gray-100 text-gray-900"}`}>
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-red-500/10 p-5 inline-flex items-center justify-center ring-[12px] ring-red-500/5">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          {isEn ? "Payment Failed" : "Pago Rechazado"}
        </h1>
        
        <p className={`text-lg mb-10 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {isEn 
            ? "Unfortunately, we couldn't process your payment. Please verify your payment details and try again."
            : "Lamentablemente, no pudimos procesar tu pago. Por favor verifica los datos de tu tarjeta e inténtalo de nuevo."}
        </p>

        <Link href={`/${locale}`}>
          <Button className="w-full h-14 text-xl font-bold bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">
            {isEn ? "Return to Home" : "Volver al Inicio"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

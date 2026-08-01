import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { yaFueProcesado, marcarComoProcesado } from '@/lib/db';
import { getCourseBySlug } from '@/data/courses';
import { sendWelcomeEmail, sendProfessorNotification } from '@/lib/email';

export async function POST(req: Request) {
    console.log("==================================================");
    console.log("🔔 [Webhook MP] ¡ALGUIEN TOCÓ LA PUERTA DEL WEBHOOK!");
    console.log("==================================================");
    
    try {
        let body: any = {};
        try {
            body = await req.json();
        } catch(e) {
            // A veces el IPN legacy no manda JSON sino form-urlencoded o nada en el body
        }
        
        console.log("[Webhook MP] Payload recibido:", JSON.stringify(body, null, 2));
        
        const url = new URL(req.url);
        console.log("[Webhook MP] Query params recibidos:", url.search);

        const typeOrTopic = url.searchParams.get('topic') || url.searchParams.get('type') || body.topic || body.type || body.action;
        const paymentId = url.searchParams.get('id') || url.searchParams.get('data.id') || body.data?.id || body.id;

        // Validamos que sea de tipo pago
        if (typeOrTopic !== 'payment' && typeOrTopic !== 'payment.created') {
            console.log(`[Webhook MP] Ignorado por no ser un evento de pago. Topic/Type: ${typeOrTopic}`);
            return NextResponse.json({ received: true });
        }

        if (!paymentId) {
            console.error('[Webhook MP] Error: No se encontró el ID del pago en la notificación');
            return NextResponse.json({ error: 'No payment ID' }, { status: 400 });
        }

        console.log(`[Webhook MP] Recibida notificación de pago ID: ${paymentId}`);

        // Verificamos en DB si ya fue procesado para cumplir con idempotencia
        const yaProcesado = await yaFueProcesado(paymentId.toString());
        if (yaProcesado) {
            console.log(`[Webhook MP] Pago ${paymentId} ignorado (Ya estaba procesado).`);
            return NextResponse.json({ received: true, status: 'already_processed' });
        }

        // Consultamos a la API oficial de Mercado Pago para evitar fraudes (Spoofing)
        const token = process.env.MERCADOPAGO_ACCESS_TOKEN || '';
        const client = new MercadoPagoConfig({ accessToken: token });
        const paymentAPI = new Payment(client);
        
        const paymentData = await paymentAPI.get({ id: paymentId });

        if (paymentData.status !== 'approved') {
            console.log(`[Webhook MP] Pago ${paymentId} no está aprobado. Estado actual: ${paymentData.status}`);
            return NextResponse.json({ received: true });
        }

        console.log(`[Webhook MP] Pago ${paymentId} confirmado y APROBADO.`);

        // Extraemos los metadatos inyectados en la fase de checkout
        const externalRef = paymentData.external_reference;
        if (!externalRef) {
            console.error(`[Webhook MP] Error: Pago ${paymentId} no tiene external_reference`);
            return NextResponse.json({ received: true });
        }

        let email = "";
        let courseSlug = "";
        let fullName = "No provisto";
        let phone = "No provisto";
        let dni = "No provisto";
        
        try {
            const meta = JSON.parse(externalRef);
            email = meta.e;
            courseSlug = meta.c;
            if (meta.n) fullName = meta.n;
            if (meta.p) phone = meta.p;
            if (meta.d) dni = meta.d;
        } catch (e) {
            console.error(`[Webhook MP] Error parseando external_reference: ${externalRef}`);
            return NextResponse.json({ received: true });
        }

        const course = getCourseBySlug(courseSlug);
        if (!course) {
            console.error(`[Webhook MP] Curso no encontrado: ${courseSlug}`);
            return NextResponse.json({ received: true });
        }

        // Marcar en DB como procesado PRIMERO para evitar enviar 2 veces si hay una condición de carrera
        const guardado = await marcarComoProcesado(paymentId.toString(), email, courseSlug);
        
        if (!guardado) {
            console.log(`[Webhook MP] Pago ${paymentId} ya existía en la Base de Datos. Omitiendo envío de correos duplicados.`);
            return NextResponse.json({ received: true, status: 'already_processed_race_condition' });
        }

        console.log(`[Webhook MP] Pago ${paymentId} registrado en DB con éxito. Procediendo a enviar correos...`);

        // Enviar Correos!
        await sendWelcomeEmail(email, course.title.es, course.whatsappGroupLink);
        await sendProfessorNotification(course.instructor.email, { email, fullName, phone, dni }, course.title.es);

        return NextResponse.json({ received: true, status: 'processed' });

    } catch (error) {
        console.error("[Webhook MP] Error general:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

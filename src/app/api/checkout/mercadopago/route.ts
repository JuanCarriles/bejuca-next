import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { getCourseBySlug } from '@/data/courses';

export async function POST(req: Request) {
    console.log("=== INICIANDO CHECKOUT MERCADO PAGO ===");
    try {
        const body = await req.json();
        console.log("Datos recibidos del frontend:", body);
        const { courseSlug, fullName, email, dni } = body;

        const course = getCourseBySlug(courseSlug);
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        // Initialize MercadoPago client
        const token = process.env.MERCADOPAGO_ACCESS_TOKEN || '';
        console.log("Token configurado:", token ? `Sí (Longitud: ${token.length})` : "NO ENCONTRADO");
        const client = new MercadoPagoConfig({ accessToken: token });

        const names = fullName.split(' ');
        const firstName = names[0];
        const lastName = names.slice(1).join(' ');

        const preference = new Preference(client);

        const preferenceData = {
            items: [
                {
                    id: course.id,
                    title: `Inscripción: ${course.title.es}`,
                    quantity: 1,
                    unit_price: course.priceARS,
                    currency_id: 'ARS',
                }
            ],
            payer: {
                name: firstName,
                surname: lastName,
                email: email,
                identification: {
                    type: 'DNI',
                    number: dni
                }
            },
            back_urls: {
                success: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/es/cursos/pago-exitoso`,
                failure: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/es/cursos/pago-fallido`,
                pending: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/es/cursos/pago-pendiente`
            },
            // Mercado Pago requiere que la URL de retorno sea HTTPS segura o pública para habilitar el auto_return.
            // Si detectamos localhost, lo apagamos para que no tire error 400.
            auto_return: (process.env.NEXT_PUBLIC_APP_URL || '').startsWith('https') ? 'approved' : undefined,
            external_reference: JSON.stringify({ e: email, c: course.slug }),
            notification_url: (process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL.startsWith('https'))
                ? `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`
                : undefined,
        };

        console.log("Creando preferencia en Mercado Pago con los siguientes datos:");
        console.log(JSON.stringify(preferenceData, null, 2));

        const response = await preference.create({ body: preferenceData });

        console.log("Respuesta de Mercado Pago Exitosa. Init Point:", response.init_point);
        return NextResponse.json({ init_point: response.init_point });
    } catch (error: any) {
        console.error("=== ERROR EN MERCADOPAGO CHECKOUT ===");
        console.error("Mensaje de error:", error.message);
        console.error("Detalles del error (si existen):", error.cause || error.response || error);
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
}

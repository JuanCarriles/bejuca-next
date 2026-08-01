import { NextResponse } from 'next/server';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';
import { getCourseBySlug } from '@/data/courses';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { courseSlug, email, fullName, phone, dni } = body;

        const course = getCourseBySlug(courseSlug);
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        // Set up PayPal environment
        const clientId = process.env.PAYPAL_CLIENT_ID || '';
        const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
        const isLive = process.env.PAYPAL_MODE === 'live';
        const environment = isLive 
            ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
            : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
        const client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

        const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    reference_id: course.id,
                    custom_id: JSON.stringify({ e: email, c: course.slug, n: fullName, p: phone, d: dni }),
                    description: `Course Enrollment: ${course.title.en}`,
                    amount: {
                        currency_code: 'USD',
                        value: course.priceUSD.toString(),
                    }
                }
            ],
            application_context: {
                return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/checkout/paypal/capture`,
                cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/es/cursos/pago-fallido`,
            }
        });

        const response = await client.execute(request);

        // Find the approve link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const approveLink = response.result.links.find((link: any) => link.rel === 'approve')?.href;

        return NextResponse.json({ approveLink, orderId: response.result.id });
    } catch (error) {
        console.error("PayPal Checkout Error:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

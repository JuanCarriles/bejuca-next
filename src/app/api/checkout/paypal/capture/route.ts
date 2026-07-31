import { NextResponse } from 'next/server';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    if (!token) {
        return NextResponse.redirect(`${baseUrl}/es/cursos/pago-fallido`);
    }

    try {
        const clientId = process.env.PAYPAL_CLIENT_ID || '';
        const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
        const isLive = process.env.PAYPAL_MODE === 'live';
        const environment = isLive 
            ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
            : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
        const client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

        // PayPal API: Capture the order using the token
        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(token);
        // @ts-ignore - The SDK types might be incomplete for requestBody on Capture
        request.requestBody({});

        const response = await client.execute(request);
        
        if (response.result.status === 'COMPLETED') {
            return NextResponse.redirect(`${baseUrl}/es/cursos/pago-exitoso`);
        } else {
            console.error("Order not completed:", response.result);
            return NextResponse.redirect(`${baseUrl}/es/cursos/pago-fallido`);
        }
    } catch (error) {
        console.error("PayPal Capture Error:", error);
        return NextResponse.redirect(`${baseUrl}/es/cursos/pago-fallido`);
    }
}

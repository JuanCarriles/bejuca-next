import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(req: Request) {
    const report: any = {
        title: "Bejuca System Diagnostic Report",
        env: {
            DB_HOST: process.env.DB_HOST ? `SET (${process.env.DB_HOST})` : 'MISSING',
            DB_USER: process.env.DB_USER ? `SET (${process.env.DB_USER})` : 'MISSING',
            DB_PASSWORD: process.env.DB_PASSWORD ? 'SET (****)' : 'MISSING',
            DB_NAME: process.env.DB_NAME ? `SET (${process.env.DB_NAME})` : 'MISSING',
            RESEND_API_KEY: process.env.RESEND_API_KEY ? `SET (starts with ${process.env.RESEND_API_KEY.substring(0, 5)}...)` : 'MISSING',
            MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN ? 'SET' : 'MISSING',
            NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'MISSING',
        },
        dbConnectionResult: 'pending...',
    };

    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'test',
        });
        
        const [rows]: any = await pool.query("SELECT 1 as connected");
        report.dbConnectionResult = '✅ EXITO: La conexión a la base de datos funciona perfectamente.';
        report.dbDetails = rows;
    } catch (error: any) {
        report.dbConnectionResult = '❌ ERROR CRÍTICO: No se pudo conectar a la base de datos.';
        report.dbErrorDetails = {
            message: error.message,
            code: error.code,
            errno: error.errno,
            sqlState: error.sqlState
        };
    }

    return NextResponse.json(report, { status: 200 });
}

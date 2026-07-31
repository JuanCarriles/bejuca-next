import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function yaFueProcesado(idPago: string): Promise<boolean> {
    try {
        const [rows]: any = await pool.query(
            "SELECT id_pago FROM pagos_procesados WHERE id_pago = ?",
            [idPago]
        );
        return Array.isArray(rows) && rows.length > 0;
    } catch (error: any) {
        console.error("Error al consultar pago procesado en BD:", error.message);
        // Si estamos probando en local sin base de datos, simulamos que no fue procesado
        if (error.code === 'ECONNREFUSED') {
            console.log("⚠️ [Modo Local] Base de datos no encontrada. Simulando que el pago es NUEVO.");
            return false; 
        }
        throw error;
    }
}

export async function marcarComoProcesado(idPago: string, email: string, courseSlug: string): Promise<boolean> {
    try {
        await pool.query(
            "INSERT INTO pagos_procesados (id_pago, email, course_slug) VALUES (?, ?, ?)",
            [idPago, email, courseSlug]
        );
        return true;
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.log(`El pago ${idPago} ya estaba procesado (detectado por duplicidad PRIMARY KEY)`);
            return false;
        }
        console.error("Error al marcar pago como procesado:", error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log("⚠️ [Modo Local] Omitiendo guardado en BD porque no hay conexión local. Permitiendo correos.");
            return true; // En modo local permitimos que siga para poder testear los correos
        }
        throw error;
    }
}

export default pool;

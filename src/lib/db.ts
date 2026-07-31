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

// Caché en memoria para evitar correos duplicados incluso si la base de datos se cae
const processedCache = new Set<string>();

export async function yaFueProcesado(idPago: string): Promise<boolean> {
    if (processedCache.has(idPago)) {
        console.log(`[Cache] Pago ${idPago} detectado en memoria. Bloqueando duplicado.`);
        return true;
    }

    try {
        const [rows]: any = await pool.query(
            "SELECT id_pago FROM pagos_procesados WHERE id_pago = ?",
            [idPago]
        );
        const existe = Array.isArray(rows) && rows.length > 0;
        if (existe) processedCache.add(idPago);
        return existe;
    } catch (error: any) {
        console.error("⚠️ Error crítico al consultar BD (yaFueProcesado):", error.message);
        // Si la base de datos falla por CUALQUIER motivo, asumimos que NO fue procesado
        // para garantizar que el alumno reciba su correo.
        return false; 
    }
}

export async function marcarComoProcesado(idPago: string, email: string, courseSlug: string): Promise<boolean> {
    // Registramos en la caché en memoria instantáneamente
    processedCache.add(idPago);

    try {
        await pool.query(
            "INSERT INTO pagos_procesados (id_pago, email, curso) VALUES (?, ?, ?)",
            [idPago, email, courseSlug]
        );
        return true;
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.log(`El pago ${idPago} ya estaba procesado (detectado por duplicidad PRIMARY KEY)`);
            return false;
        }
        console.error("⚠️ Error crítico al guardar en BD (marcarComoProcesado):", error.message);
        // Retornamos TRUE a pesar del error de BD, para que el Webhook no se detenga 
        // y continúe con el envío del correo electrónico. ¡El alumno siempre es prioridad!
        return true; 
    }
}

export default pool;

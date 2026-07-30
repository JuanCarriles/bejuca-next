import { Resend } from 'resend';

// Solo funcionará si la API key está presente (ej. en producción o con .env local)
const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key');

export async function sendWelcomeEmail(studentEmail: string, courseName: string, whatsappUrl: string) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.log(`[SIMULACIÓN EMAIL] A alumno ${studentEmail}: Bienvenido a ${courseName}. Grupo: ${whatsappUrl}`);
            return;
        }

        const data = await resend.emails.send({
            from: 'Bejuca Cursos <onboarding@resend.dev>', // Debe ser un dominio verificado en Resend para producción
            to: studentEmail,
            subject: `¡Bienvenido a ${courseName}! - Instrucciones de acceso`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>¡Inscripción confirmada!</h2>
                    <p>¡Hola! Gracias por sumarte a <strong>${courseName}</strong>.</p>
                    
                    <h3>Paso 1: Únete a la comunidad</h3>
                    <p>Por favor, únete al grupo oficial de WhatsApp del curso haciendo clic en el enlace de abajo. Allí enviaremos avisos importantes:</p>
                    <a href="${whatsappUrl}" style="display:inline-block; padding:10px 20px; background-color:#25D366; color:white; text-decoration:none; border-radius:5px;">Unirme al Grupo de WhatsApp</a>
                    
                    <h3>Paso 2: Acceso a la Plataforma</h3>
                    <p>Tu profesor está creando tu usuario para la plataforma de E-learning. En un plazo máximo de 24 a 48 horas, recibirás un nuevo correo con tu usuario, contraseña y el enlace directo para ingresar.</p>
                    
                    <p>¡Nos vemos en clase!</p>
                </div>
            `
        });
        console.log("Email de bienvenida enviado:", data);
    } catch (error) {
        console.error("Error enviando email de bienvenida:", error);
    }
}

export async function sendProfessorNotification(professorEmail: string, studentEmail: string, courseName: string) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.log(`[SIMULACIÓN EMAIL] A profesor ${professorEmail}: Nuevo alumno ${studentEmail} en ${courseName}`);
            return;
        }

        const data = await resend.emails.send({
            from: 'Bejuca Cursos <onboarding@resend.dev>', // Debe ser un dominio verificado
            to: professorEmail, // En prueba de Resend gratis, solo puedes enviar correos a tu propia dirección verificada
            subject: `🚨 NUEVA VENTA - ${courseName}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #3CB4D8;">Nueva inscripción confirmada</h2>
                    <p>Acabamos de registrar un pago aprobado exitosamente.</p>
                    <ul>
                        <li><strong>Curso:</strong> ${courseName}</li>
                        <li><strong>Email del alumno:</strong> ${studentEmail}</li>
                    </ul>
                    <p><strong>Acción requerida:</strong> Por favor, genera el usuario en Moodle para este alumno y envíale sus credenciales de acceso a la brevedad posible.</p>
                </div>
            `
        });
        console.log("Email al profesor enviado:", data);
    } catch (error) {
        console.error("Error enviando email al profesor:", error);
    }
}

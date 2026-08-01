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
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
                    <div style="background-color: #0d1b2a; padding: 30px 20px; text-align: center; border-bottom: 4px solid #3CB4D8;">
                        <img src="${process.env.NEXT_PUBLIC_APP_URL || 'https://bejuca.com'}/logo-oscuro.png" alt="Bejuca Consulting" style="height: 50px; width: auto;" />
                    </div>
                    <div style="padding: 40px 30px; color: #1f2937; line-height: 1.6;">
                        <h2 style="color: #0d1b2a; margin-top: 0; font-size: 24px;">¡Inscripción Confirmada! 🎉</h2>
                        <p style="font-size: 16px;">¡Hola! Muchas gracias por sumarte a <strong>${courseName}</strong>.</p>
                        
                        <div style="background-color: #f0f9ff; border-left: 4px solid #3CB4D8; padding: 15px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                            <h3 style="color: #0d1b2a; margin-top: 0; font-size: 18px;">Paso 1: Únete a la comunidad</h3>
                            <p style="margin-bottom: 15px;">Por favor, únete al grupo oficial de WhatsApp del curso haciendo clic en el enlace de abajo. Allí enviaremos avisos importantes:</p>
                            <a href="${whatsappUrl}" style="display: inline-block; padding: 12px 24px; background-color: #25D366; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; text-align: center;">Unirme al Grupo de WhatsApp</a>
                        </div>
                        
                        <div style="margin-top: 25px;">
                            <h3 style="color: #0d1b2a; font-size: 18px;">Paso 2: Acceso a la Plataforma</h3>
                            <p>Tu profesor está creando tu usuario para la plataforma de E-learning. En un plazo máximo de 24 a 48 horas, recibirás un nuevo correo con tu usuario, contraseña y el enlace directo para ingresar.</p>
                        </div>
                        
                        <p style="margin-top: 30px; font-size: 16px;">¡Nos vemos en clase!</p>
                    </div>
                    <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb;">
                        &copy; ${new Date().getFullYear()} Bejuca Consulting. Todos los derechos reservados.
                    </div>
                </div>
            `
        });
        console.log("Email de bienvenida enviado:", data);
    } catch (error) {
        console.error("Error enviando email de bienvenida:", error);
    }
}

export async function sendProfessorNotification(professorEmail: string, student: { email: string, fullName: string, phone: string, dni: string }, courseName: string) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.log(`[SIMULACIÓN EMAIL] A profesor ${professorEmail}: Nuevo alumno ${student.fullName} (${student.email}) en ${courseName}`);
            return;
        }

        const data = await resend.emails.send({
            from: 'Bejuca Cursos <onboarding@resend.dev>', // Debe ser un dominio verificado
            to: professorEmail, // En prueba de Resend gratis, solo puedes enviar correos a tu propia dirección verificada
            subject: `🚨 NUEVA VENTA - ${courseName}`,
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
                    <div style="background-color: #0d1b2a; padding: 30px 20px; text-align: center; border-bottom: 4px solid #3CB4D8;">
                        <img src="${process.env.NEXT_PUBLIC_APP_URL || 'https://bejuca.com'}/logo-oscuro.png" alt="Bejuca Consulting" style="height: 50px; width: auto;" />
                    </div>
                    <div style="padding: 40px 30px; color: #1f2937; line-height: 1.6;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <span style="display: inline-block; background-color: #10b981; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: bold; letter-spacing: 1px;">NUEVA VENTA</span>
                            <h2 style="color: #0d1b2a; margin-top: 15px; font-size: 24px;">Inscripción Confirmada</h2>
                            <p style="color: #6b7280; font-size: 16px;">Acabamos de registrar un pago aprobado exitosamente.</p>
                        </div>
                        
                        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                            <h3 style="color: #0d1b2a; margin-top: 0; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">Datos de la Inscripción</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b; width: 40%;"><strong>Curso:</strong></td>
                                    <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${courseName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b;"><strong>Alumno:</strong></td>
                                    <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${student.fullName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                                    <td style="padding: 8px 0; color: #3CB4D8; font-weight: 500;"><a href="mailto:${student.email}" style="color: #3CB4D8; text-decoration: none;">${student.email}</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b;"><strong>Tel / WhatsApp:</strong></td>
                                    <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${student.phone}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b;"><strong>DNI / Pasaporte:</strong></td>
                                    <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${student.dni}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px 20px; border-radius: 0 8px 8px 0;">
                            <p style="margin: 0; color: #92400e;"><strong>Acción requerida:</strong> Por favor, genera el usuario en Moodle para este alumno y envíale sus credenciales de acceso a la brevedad posible.</p>
                        </div>
                    </div>
                    <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb;">
                        &copy; ${new Date().getFullYear()} Bejuca Consulting. Panel de Administración.
                    </div>
                </div>
            `
        });
        console.log("Email al profesor enviado:", data);
    } catch (error) {
        console.error("Error enviando email al profesor:", error);
    }
}

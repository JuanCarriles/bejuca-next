# Bejuca

Plataforma institucional y de venta de cursos online para Bejuca, una consultora de tecnología y comunicación. Reemplaza un sitio WordPress heredado e incorpora cobro propio con MercadoPago para alumnos locales y PayPal para alumnos del exterior.


**[Ver sitio en producción](https://bejuca.com.ar/es)**

![Captura de la home](./public/BejucaHome.png)

---

## El problema

Bejuca es una consultora de tecnología y comunicación que necesitaba dos cosas de su web: presentar sus servicios de forma profesional y vender sus cursos online por cuenta propia.

El sitio anterior era un WordPress que ya no daba respuesta. Arrastraba los problemas habituales de una instalación con años encima —plugins acumulados, tiempos de carga altos y dependencia de mantenimiento constante—, y sobre todo no resolvía la venta: cobrar un curso implicaba coordinar el pago por fuera del sitio, uno por uno.

El requisito que definió toda la arquitectura fue el alcance de los alumnos. Bejuca vende dentro de Argentina y también al exterior, y esas dos audiencias no pagan con los mismos medios: forzar a un alumno extranjero a usar MercadoPago, o a uno local a abrir una cuenta de PayPal, es perder la venta. La plataforma tenía que ofrecer las dos vías sin que el usuario tuviera que entender por qué.

## Qué hace

- **Sitio institucional** con la presentación de la consultora y su catálogo de servicios.
- **Venta de cursos online** con checkout propio, sin depender de plataformas de terceros ni ceder comisión a un marketplace.
- **Doble pasarela de pago**: MercadoPago para cobros nacionales y PayPal para internacionales, resueltas dentro de un mismo flujo de compra.
- **Sitio multilenguaje** con `next-intl`, con rutas e interfaz traducidas y los textos centralizados en `/messages`: agregar un idioma es sumar un archivo, no tocar componentes.
- **Formularios de contacto e inscripción** validados en cliente y servidor con React Hook Form y esquemas de Zod compartidos.
- **Correos transaccionales** con Resend: confirmaciones de compra y consultas de contacto.
- **Modo claro / oscuro** persistente y diseño responsive.
- **Optimización de imágenes** con `sharp` y el pipeline de Next.js.

## Stack y por qué

| Tecnología | Rol | Por qué esta |
|---|---|---|
| Next.js 16 (App Router) | Framework | Rutas de servidor para manejar credenciales de pago y consultas a la base sin exponerlas al cliente, más renderizado en servidor para el contenido público. |
| React 19 + TypeScript | UI | Tipado estricto sobre el modelo de cursos y los payloads de pago, que es donde un error sale caro. |
| Tailwind CSS 4 + shadcn/ui (Radix) | Estilos y componentes | Componentes accesibles por defecto sin arrastrar una librería visual pesada. |
| MySQL (`mysql2`) | Persistencia | Catálogo de cursos, inscripciones y órdenes de compra. |
| MercadoPago SDK | Cobros nacionales | Es el medio de pago que el alumno argentino ya tiene y sabe usar. |
| PayPal Checkout Server SDK | Cobros internacionales | Cubre al alumno del exterior sin obligarlo a crear cuenta en una plataforma local. |
| `next-intl` | Internacionalización | Traducción con rutas localizadas, mejor para posicionamiento que traducir solo en el cliente. |
| Zod + React Hook Form | Validación | Un mismo esquema valida el formulario y el endpoint que lo recibe. |
| Resend | Email transaccional | Confirmaciones de compra y formularios de contacto. |
| Vercel | Deploy | Despliegue continuo desde `main`. |

## Estructura

```
src/          Código de la aplicación (App Router, componentes, lógica de negocio)
messages/     Archivos de traducción por idioma
public/       Estáticos e imágenes
```

## Correrlo localmente

```bash
git clone https://github.com/JuanCarriles/bejuca-next.git
cd bejuca-next
npm install
cp .env.example .env.local   # completar con credenciales propias
npm run dev
```

Abrir http://localhost:3000

### Variables de entorno

| Variable | Para qué |
|---|---|
| `DATABASE_URL` | Conexión a MySQL |
| `MERCADOPAGO_ACCESS_TOKEN` | Cobros con MercadoPago |
| `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` | Cobros con PayPal |
| `RESEND_API_KEY` | Envío de correos |

## Decisiones técnicas

### Next.js en lugar de una SPA

La decisión se apoyó en un requisito que no era negociable: hay secretos que no pueden salir del servidor. Los tokens de MercadoPago y PayPal, y la conexión a MySQL, necesitan un entorno que el cliente no vea. Con React + Vite hubiera tenido que levantar y mantener una API aparte, con su propio deploy y su propia configuración de CORS; el App Router permite tener las rutas de servidor y la interfaz en un mismo repositorio y un mismo despliegue, que para un proyecto de un solo desarrollador es menos superficie que mantener.

El segundo motivo es de captación (SEO). Bejuca vende servicios y cursos, así que sus páginas tienen que llegar a los buscadores con el contenido ya renderizado. Next resuelve el renderizado en servidor sin trabajo adicional y permite decidir página por página qué se genera en el build y qué se renderiza en cada request.


### Traducciones fuera del código

Los textos viven en `/messages` y no incrustados en los componentes. Sumar un idioma es agregar un archivo de traducción, no revisar la interfaz entera: importante para un negocio que vende a más de un país y que puede querer abrir un mercado nuevo sin rehacer el sitio.


## Estado

En producción. Mantenimiento y mejoras activas.

---

Desarrollado por [Juan M. Carriles](https://www.linkedin.com/in/juan-maria-carriles-8836512a2/) · juanmcarrile@gmail.com

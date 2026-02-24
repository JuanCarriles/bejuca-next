import { createClient } from "smtpexpress";

export const smtpexpressClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SMTP_PROJECT_ID!,
    projectSecret: process.env.NEXT_PUBLIC_SMTP_PROJECT_SECRET!,
});

export const SENDER_EMAIL = process.env.NEXT_PUBLIC_SMTP_SENDER_EMAIL!;

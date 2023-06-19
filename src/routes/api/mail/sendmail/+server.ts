import { SENDGRID_API_KEY } from "$env/static/private";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(SENDGRID_API_KEY);

export async function GET(): Promise<Response> {
    const msg = {
        to: "email@example.com",
        from: "taskmanager43@gmail.com",
        subject: "Example mail!",
        text: "This is an example mail!",
        html: "Sendgrid is working",
    };

    try {
        const output = await sgMail.send(msg);
        return new Response(JSON.stringify({ body: output }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
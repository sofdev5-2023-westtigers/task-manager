import { SENDGRID_API_KEY } from "$env/static/private";
import sgMail from "@sendgrid/mail";
import {getMsg} from "./AddMsg";
sgMail.setApiKey(SENDGRID_API_KEY);

export async function GET(): Promise<Response> {
    try {
        console.log(getMsg());
        const output = await sgMail.send(getMsg());
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
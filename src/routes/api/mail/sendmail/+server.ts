import { SENDGRID_API_KEY } from "$env/static/private";
import sgMail from "@sendgrid/mail";
import { json } from '@sveltejs/kit';
sgMail.setApiKey(SENDGRID_API_KEY);

export async function POST({request}): Promise<Response> {
    const msg = await request.json();
    console.log(msg);
    const output = await sgMail.send(msg);
    return json(output);
}
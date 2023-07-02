import { json, type RequestHandler } from "@sveltejs/kit";
import { getMailUsers } from "$lib/keycloak/getUserList";

export const PUT: RequestHandler = async ({ request, locals }) => {
  const users = await getMailUsers();
  return json(users);
};
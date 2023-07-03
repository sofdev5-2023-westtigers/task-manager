import { tasks } from "$db/tasks";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request }) => {
  const params = request.url.split("?")[1].split("&");
  const decodedURL = decodeURIComponent(params[1].split("=")[1]);
  const userId = params[0].split("=")[1];
  const listName = decodedURL;

  const taskList = await tasks.find({listName: listName}).toArray();

    return json(taskList);
};

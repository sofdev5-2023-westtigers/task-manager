import { tasks } from "$db/tasks";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const PUT: RequestHandler = async ({ request, locals }) => {
    const body = await request.formData();
    const list = {taskName: body.get('taskName'), listName: body.get('listName') };


    let taskAux = await tasks.findOne({ listName: list.listName, taskName: list.taskName });
    let membersList = taskAux.TaskMembers;
    
    return json(membersList);
};

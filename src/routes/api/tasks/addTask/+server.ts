import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST : RequestHandler = (async ({request,locals}) => {
    const body = await request.formData();
    const list = {taskName: body.get('taskName'), listName: body.get('listName'), isCompleted: body.get('isCompleted')};
    const result = await tasks.insertOne(list);
    const insertedList = await tasks.findOne({_id : result.insertedId});

    // log all fields
    console.log(insertedList,locals);

    return json(insertedList);
});
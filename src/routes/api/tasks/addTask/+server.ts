import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST : RequestHandler = (async ({request,locals}) => {
    const body = await request.formData();
    const list = {userId: body.get('userId'), taskName: body.get('taskName'), listName: body.get('listName'), isCompleted: body.get('isCompleted')};
    const result = await tasks.insertOne(list);
    const insertedList = await tasks.findOne({_id : result.insertedId});

    // log all fields
    console.log(insertedList,locals);

    return json(insertedList);
});

export const PUT: RequestHandler = async ({ request, locals }) => {
    const body = await request.formData();
    const list = {userId: body.get('userId'), taskNameOld: body.get('taskNameOld'), taskName: body.get('taskName'), listName: body.get('listName')};

    const result = await tasks.updateOne(
        { userId: body.get('userId'), taskName:  body.get('taskNameOld'), },
        { $set: { taskName: list.taskName} }
      );
    
    const updatedList = await tasks.findOne({ taskName: list.taskName});
    
    console.log(updatedList, locals);
    
    return json(updatedList);
  };
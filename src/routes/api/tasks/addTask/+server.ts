import { lists } from "$db/lists";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST : RequestHandler = (async ({request,locals}) => {
    const body = await request.formData();
    const list = {taskName: body.get('name')};
    const result = await lists.insertOne(list);
    const insertedList = await lists.findOne({_id : result.insertedId});

    // log all fields
    console.log(insertedList,locals);

    return json(insertedList);
});
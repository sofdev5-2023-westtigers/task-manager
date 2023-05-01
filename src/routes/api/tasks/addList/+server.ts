import { lists } from "$db/lists";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST : RequestHandler = (async ({request,locals}) => {
    const body = await request.formData();
    const list = {listName: body.get('listName')};
    const result = await lists.insertOne(list);
    const insertedList = await lists.findOne({_id : result.insertedId});

    // log all fields

    return json(insertedList);
});
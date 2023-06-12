import { lists } from "$db/lists";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = (async ({ request, locals }) => {
    const body = await request.formData();
    const listName = body.get('listName');

    const existingList = await lists.findOne({ listName: listName });

    if (existingList) {
        return json({ error: 'This list already exists' }, { status: 400 });
    } else {
        const list = { listName: listName };
        const result = await lists.insertOne(list);
        const insertedList = await lists.findOne({ _id: result.insertedId });
        return json(insertedList);
    }
});

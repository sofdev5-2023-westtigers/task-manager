import { lists } from "$db/lists";
import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST : RequestHandler = (async ({request,locals}) => {
    const body = await request.formData();
    const list = {listName: body.get('listName')};
    const result = await lists.insertOne(list);
    const insertedList = await lists.findOne({_id : result.insertedId});

    // log all fields

    return json(insertedList);
});

export const PUT: RequestHandler = async ({ request, locals }) => {
    const body = await request.formData();
    const list = {userId: body.get('userId'), listNameOld: body.get('listNameOld'), listName: body.get('listName')};
  
    const result = await tasks.updateOne(
        { listName:  body.get('listNameOld') },
        { $set: { listName: list.listName} }
      );
      const result2 = await lists.updateOne(
        { listName:  body.get('listNameOld') },
        { $set: { listName: list.listName} }
      );

    
    const updatedList = await tasks.findOne({ listName: list.listName});
    
    console.log(updatedList, locals);
    
    return json(updatedList);
  };
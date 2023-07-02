import { lists } from "$db/lists";
import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";

export const PUT: RequestHandler = async ({ request, locals }) => {
  const body = await request.formData();
  const list = { userId: body.get('userId'), listNameOld: body.get('listNameOld'), listName: body.get('listName') };

  const result = await tasks.updateMany(
    { listName: body.get('listNameOld') },
    { $set: { listName: list.listName } }
  );
  const result2 = await lists.updateOne(
    { listName: body.get('listNameOld') },
    { $set: { listName: list.listName } }
  );
  const result3 = await tasks.updateMany(
    { listName: list.listName },
    { $set: { listName: list.listName } }
  );

  const updatedList = await tasks.findOne({ listName: list.listName });
  console.log(updatedList, locals);
  return json(updatedList);
};
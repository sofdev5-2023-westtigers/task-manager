import { tasks } from "$db/tasks";
import { lists } from "$db/lists";
import { json, type RequestHandler } from "@sveltejs/kit";

export const PUT: RequestHandler = async ({ request }) => {
  const body = await request.formData();
  const req = { userID: body.get('userId') }

  const [groupedList] = await Promise.all([
    lists.aggregate([{ $group: { _id: { listName: "$listName", userId:'$userId' }, lists: { $push: "$listMembers" } } }]).toArray(),
  ]);

  const list = groupedList
    .filter(s => {
      try {
        const listAux = s.lists[0];
        return listAux && (listAux.find(objeto => objeto.id === req.userID) || s._id.userId === req.userID);
      } catch (error: TypeError) {}
    })
    .map(s => s._id.listName);

  const groupedDocument: Record<string,  [Document]> = {};

  await Promise.all(list.map(async (listName) => {
    const taskList = await tasks.find({ listName }).toArray();
    if(taskList .length > 0){groupedDocument[listName] = {listName, taskList };}
  }));
  

  const result: Document[] = Object.values(groupedDocument);
  
  return json(result);
};

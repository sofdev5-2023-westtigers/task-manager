import { tasks } from "$db/tasks";
import { lists } from "$db/lists";
import { json, type RequestHandler } from "@sveltejs/kit";

export const PUT: RequestHandler = async ({ request }) => {
  const body = await request.formData();
  const req = { userID: body.get('userId') }

  const [groupedTasks, groupedList] = await Promise.all([
    tasks.aggregate([{ $group: { _id: { userId: "$userId", listName: "$listName" }, tasks: { $push: "$$ROOT" } } }]).toArray(),
    lists.aggregate([{ $group: { _id: { listName: "$listName" }, lists: { $push: "$listMembers" } } }]).toArray()
  ]);

  const list = groupedList
    .filter(s => {
      try {
        const listAux = s.lists[0];
        return listAux && listAux.find(objeto => objeto.id === req.userID);
      } catch (error: TypeError) { }
    })
    .map(s => s._id.listName);

  const asw = groupedTasks.filter(obj => {
    try {
      return obj._id.userId && (obj._id.userId === req.userID || list.includes(obj._id.listName));
    } catch (err) { }
  });

  return json(asw);
};
